
import { useEffect } from 'react';
import axios from 'axios'
import React, { useState } from 'react'
import "../styles/category.css";
import Header from '../Componet/Header';
import Footer from '../Componet/Footer';


export default function Category() {
    const [categories, setCategories] = useState([]);
     const fetchCategories = () => {
         axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/categories/list`, {
           headers:{
             Authorization:`Bearer ${localStorage.getItem("token")}`
           }
        })
            .then(response => {
                setCategories(response.data.categories);
                //console.log(response.data.categories);
            })
            .catch(error => {
                console.log("errorn in category fectch", error);
            })
     }
    
     useEffect(()=>{
        fetchCategories();
     },[])
  return (
    <div>
        <Header/>
      <section className="categories" id="categories">
    <div className="section-header">
        <h2>Shop by Category</h2>
        <p>Explore our wide range of products across various categories</p>
    </div>

  <div className="categories-grid">
    {categories.map((category) => (
      <div className="category-card" key={category._id} onClick={() => window.location.href = `/product?category=${category.title}&categoryId=${category._id}`}>
        <div className="category-overlay">
          <h3>{category.title}</h3>
          <p>{category.description}</p>
          <span className={category.isActive ? "status active" : "status inactive"}>
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    ))}
  </div>
    </section>

    <Footer/>

    </div>
  )
}
