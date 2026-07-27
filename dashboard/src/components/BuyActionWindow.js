import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode, initialPrice }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(initialPrice || 0.0);
  const generalContext = useContext(GeneralContext);

  const totalAmount = (Number(stockQuantity) * Number(stockPrice)).toFixed(2);

  const handleOrderClick = () => {
    const token = localStorage.getItem("token");

    axios.post(
  "https://zerodha-clone-vr52.onrender.com/newOrder",
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: mode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        window.dispatchEvent(new Event("orderPlaced"));
        generalContext.closeBuyWindow();
      })
      .catch((err) => {
        alert(err.response?.data?.error || "Order failed. Try again.");
      });
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>{mode === "SELL" ? "Total value" : "Margin required"} ₹{totalAmount}</span>
        <div>
          <Link className="btn btn-blue" onClick={handleOrderClick}>
            {mode === "SELL" ? "Sell" : "Buy"}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;