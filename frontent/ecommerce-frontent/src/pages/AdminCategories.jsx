import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminCategories.css";
import AdminHeader from "../Componet/AdminHeader";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"


export default function AdminCategories() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  
  // Create Category
 
  const createCategory = async (e) => {
    e.preventDefault();

    if(!title || !description){
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/categories/create`,
        { title, description },
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setTitle("");
      setDescription("");

      getCategories();

    } catch (error) {

      if(error.response?.status === 403){
        alert("You are not admin");
      }

      console.log("Category create error", error);
    }
  };


  
  // Get Categories
  

  const getCategories = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/categories/list`,
        {
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setCategories(res.data.categories);

      setLoading(false);

    } catch (error) {

      setLoading(false);

      if(error.response?.status === 401){
        alert("Please login first");
        navigate("/login");
      }

      if(error.response?.status === 403){
        alert("You are not admin");
        navigate("/");
      }

      console.log("error fetching categories", error);
    }
  };


  
  // Check login
  

  useEffect(() => {
 
   const token = localStorage.getItem("token");
   const decoded = jwtDecode(token);
 
   // not logged in
   if(!token){
     alert("Please login first");
     navigate("/login");
     return;
   }
 
   // not admin
   if(!decoded.isAdmin){
     alert("You are not admin");
     navigate("/");
     return;
   }
 
  getCategories();
 
 }, []);



  return (
    <div>

      <AdminHeader/>

      <div className="admin-category-page">

        <div className="admin-category-container">

          <h1 className="admin-category-heading">
            Admin Categories
          </h1>


          {/* ===============================
              Create Category Form
          =============================== */}

          <form onSubmit={createCategory} className="category-form">

            <input
              type="text"
              placeholder="Category Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <textarea
              placeholder="Category Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <button type="submit">
              Create Category
            </button>

          </form>



          {/* ===============================
              Categories Table
          =============================== */}

          <h2 className="category-list-heading">
            All Categories
          </h2>


          {loading ? (

            <p>Loading categories...</p>

          ) : (

            <table className="category-table">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="3">
                      No categories found
                    </td>
                  </tr>
                ) : (

                  categories.map((cat)=>(
                    <tr key={cat._id}>

                      <td>{cat.title}</td>

                      <td>{cat.description}</td>

                      <td>
                        {cat.isActive ? "Active" : "Inactive"}
                      </td>

                    </tr>
                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}