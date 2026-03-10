import React, { useState } from 'react';
import axios from 'axios';
import '../styles/home.css';
import Footer from '../Componet/Footer';
import Banner from '../Componet/Banner';
import Header from '../Componet/Header';
import { NavLink } from 'react-router-dom';


function Home() {
 


  return (
    <div className="home-page">
      {/* Header */}
      <Header/>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Amazing Products at Unbeatable Prices</h1>
            <p>Shop the latest trends in electronics, fashion, and more. 
               Enjoy free shipping on orders over $50 and 30-day easy returns.</p>
            <div className="hero-buttons">
            
               <NavLink to="/category" className="btn-secondary">Shop Now</NavLink>
              <NavLink to="/category" className="btn-outline">Explore Categories</NavLink>
              
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600" 
              alt="Shopping" 
            />
          </div>
        </div>
      </section>
      {/* Banner Section */}
          <Banner/>
      {/* Footer */}
        <Footer/>
     
    </div>
  );
}

export default Home;

