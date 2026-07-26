require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { Schema, model } = require("mongoose");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const UserModel = model("user", new Schema({ mobile: { type: String, unique: true } }));

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.mobile = jwt.verify(token, process.env.JWT_SECRET).mobile;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/login", async (req, res) => {
  const { mobile } = req.body;
  if (!mobile || mobile.length !== 10) return res.status(400).json({ error: "Invalid number" });

  let user = await UserModel.findOne({ mobile });
  if (!user) user = await new UserModel({ mobile }).save();

  const token = jwt.sign({ mobile }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

app.get("/livePrice/:symbol", async (req, res) => {
  try {
    const symbol = `${req.params.symbol}.NS`;
    const response = await axios.get(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    );
    const result = response.data.chart.result[0];
    const price = result.meta.regularMarketPrice;
    const prevClose = result.meta.previousClose;
    const percent = (((price - prevClose) / prevClose) * 100).toFixed(2);
    res.json({ price, percent });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch live price" });
  }
});

app.get("/allHoldings", auth, async (req, res) => {
  res.json(await HoldingsModel.find({ mobile: req.mobile }));
});

app.get("/allPositions", auth, async (req, res) => {
  res.json(await PositionsModel.find({ mobile: req.mobile }));
});

app.get("/allOrders", auth, async (req, res) => {
  res.json(await OrdersModel.find({ mobile: req.mobile }));
});

app.post("/newOrder", auth, async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const mobile = req.mobile;
  const quantity = Number(qty);
  const orderPrice = Number(price);

  let holding = await HoldingsModel.findOne({ name, mobile });
  let position = await PositionsModel.findOne({ name, mobile });

  if (mode === "SELL") {
    const ownedQty = holding ? holding.qty : 0;
    if (quantity > ownedQty) {
      return res.status(400).json({
        error: `Cannot sell ${quantity} shares of ${name}. You only own ${ownedQty}.`,
      });
    }
  }

  await new OrdersModel({ name, qty: quantity, price: orderPrice, mode, mobile }).save();

  if (mode === "BUY") {
    if (holding) {
      holding.avg = ((holding.avg * holding.qty) + (orderPrice * quantity)) / (holding.qty + quantity);
      holding.qty += quantity;
      holding.price = orderPrice;
    } else {
      holding = new HoldingsModel({ name, qty: quantity, avg: orderPrice, price: orderPrice, net: "0.00%", day: "0.00%", mobile });
    }
    await holding.save();

    if (position) {
      position.qty += quantity;
      position.price = orderPrice;
    } else {
      position = new PositionsModel({ product: "MIS", name, qty: quantity, avg: orderPrice, price: orderPrice, net: "0.00%", day: "0.00%", isLoss: false, mobile });
    }
    await position.save();
  }

  if (mode === "SELL") {
    holding.qty -= quantity;
    holding.qty <= 0 ? await HoldingsModel.deleteOne({ _id: holding._id }) : await holding.save();

    if (position) {
      position.qty -= quantity;
      position.qty <= 0 ? await PositionsModel.deleteOne({ _id: position._id }) : await position.save();
    }
  }

  res.send("Order saved!");
});

mongoose.connect(uri).then(() => console.log("DB started!")).catch((err) => console.log("DB error:", err));
app.listen(PORT, () => console.log("App started!"));

module.exports = app;