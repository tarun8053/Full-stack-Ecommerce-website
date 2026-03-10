import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/order.css";
import Header from "../Componet/Header";
import Footer from "../Componet/Footer";

export default function Order() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios(`${import.meta.env.VITE_BACKEND_API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setOrders(res.data.order);
        console.log(res.data.order);
        
      })
      .catch((error) => {
        console.log("Error in order fetching...!", error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
        <Header/>
        <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-top">
              <span className="order-id">Order #{order._id.slice(-6)}</span>
              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>

            <div className="order-body">
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>

              <p>
                <strong>Payment:</strong> {order.paymentMethod}
              </p>

              <p>
                <strong>Products:</strong> {order.products.length}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
        <Footer/>
    </div>
  );
}
