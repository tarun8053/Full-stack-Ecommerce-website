import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Componet/Footer";
import "../styles/adminDashboard.css";
import AdminHeader from "../Componet/AdminHeader";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminDashBoard() {

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const getAllOrders = async (currentPage = page) => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/order/admin/order?page=${currentPage}&limit=5`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOrders(res.data.order);

    } catch (error) {
      console.log("error occured in admin panel", error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {

      await axios.put(
        `${import.meta.env.VITE_BACKEND_API_URL}/order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      getAllOrders(page);

    } catch (error) {
      console.log("status update error", error);
    }
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    getAllOrders(newPage);
  };

  const prevPage = () => {

    if(page === 1) return;

    const newPage = page - 1;
    setPage(newPage);
    getAllOrders(newPage);
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(!token){
      alert("Please login first");
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);

    if(!decoded.isAdmin){
      alert("You are not admin");
      navigate("/");
      return;
    }

    getAllOrders(page);

  }, []);

  return (
   <div>

    <AdminHeader/>

     <div className="admin-container">

      <h2 className="admin-title">Admin Order Dashboard</h2>

      <table className="order-table">

        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total Amount</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (
            <tr key={order._id}>

              <td>{order._id.slice(0,8)}</td>
              <td>{order.userId}</td>
              <td>₹ {order.totalAmount}</td>
              <td>{order.paymentMethod}</td>

              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>

              <td>
                <select
                  value={order.status}
                  onChange={(e)=>
                    updateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {/* Pagination */}

      <div className="pagination">

        <button onClick={prevPage}>
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={nextPage}>
          Next
        </button>

      </div>

    </div>

    <Footer/>

   </div>
  );
}