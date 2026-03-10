import React from 'react'
import '../styles/home.css';
function Banner() {
  return (
    <div>
        <section className="banner">
        <div className="banner-content">
          <div className="banner-text">
            <h2>Summer Sale is Here!</h2>
            <p>Get up to 50% off on selected items. Limited time offer - don't miss out!</p>
            <a href="/Allproduct" className="btn-secondary">Shop the Sale</a>
          </div>
          <div className="banner-image">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600" 
              alt="Sale" 
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Banner;