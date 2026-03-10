import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/product.css";
import Header from "../Componet/Header";
import Footer from "../Componet/Footer";
import {addToCartToLoacalStroage} from '../utils/CartUtils'

export default function Products() {

  const [product, setProduct] = useState([]);
  const location = useLocation();
  

  useEffect(() => {
    
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("categoryId");

    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/product/list?categoryId=${categoryId}`, {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response=>{
      setProduct(response.data.products);
      console.log(response.data.products);
    })
    .catch(error=>{
      console.log("error in product",error);
    })

  },[location.search])

  return (

   <div>
    <Header/>
     <div className="products-container">


      {product.map((data) => (

        <div key={data._id} className="product-card">

          <div className="product-image">
            <img src={data.image[0]} alt={data.title}/>
          </div>

          <div className="product-info">

            <h3 className="product-title">{data.title}</h3>

            <p className="product-desc">
              {data.description.substring(0,60)}...
            </p>

            <div className="rating">
              ⭐ {data.rating} ({data.numOfReviews} reviews)
            </div>

            <div className="price-section">

              <span className="discount-price">
                ₹{data.discountedPrice}
              </span>

              <span className="mrp-price">
                ₹{data.mrpPrice}
              </span>

            </div>

            <button className="add-cart-btn" onClick={() => addToCartToLoacalStroage(data)}>
              Add To Cart
            </button>

          </div>
        

        </div>

      ))}
    

    </div>
    <Footer/>
   </div>
  )
}