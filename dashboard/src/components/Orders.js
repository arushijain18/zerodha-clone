
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      const token = localStorage.getItem("token");
      axios.get("https://zerodha-clone-vr52.onrender.com/allOrders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAllOrders(res.data));
    };

    fetchOrders();
    window.addEventListener("orderPlaced", fetchOrders);
    return () => window.removeEventListener("orderPlaced", fetchOrders);
  }, []);

  return (
    <div className="orders">
      {allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
              </tr>
              {allOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;