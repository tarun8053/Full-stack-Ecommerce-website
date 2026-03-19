import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import Header from '../Componet/Header';
import Footer from '../Componet/Footer';
import {addToCartToLoacalStroage} from '../utils/CartUtils'
import "../styles/product.css";
import { useLoader } from "../LoaderContext";
export default function AllProduct() {

    const { showLoader, hideLoader } = useLoader();
    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");
   
  const fetchProducts = async () => {
    try {
      showLoader();

      const res = await axios(
        `${import.meta.env.VITE_BACKEND_API_URL}/product/list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProduct(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      hideLoader(); // ✅ always run (success + error)
    }
  };



    useEffect(()=>{
        fetchProducts();
    },[])

   const filterProducts = product.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div>
      <Header/>
      <div className="search-wrapper">
  <span className="search-icon">🔍</span>
  <input
    type="text"
    value={search}
    className="search-bar"
    onChange={(e)=> setSearch(e.target.value)}
    placeholder="Search products..."
  />
</div>
           <div className="products-container">
      
      
            {filterProducts.map((data) => (
      
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
