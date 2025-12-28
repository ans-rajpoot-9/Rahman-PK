import React, { useState, useRef, useEffect } from "react";
import "./Productpage.css";
import { useNavigate } from 'react-router-dom';

// Import your product images
import product250 from "../../Assets/1.webp";
import product120 from "../../Assets/2.webp";
import thumb1 from "../../Assets/1.webp";
import thumb2 from "../../Assets/2.webp";
import thumb3 from "../../Assets/1.webp";

const ProductPage = () => {
  const [selectedWeight, setSelectedWeight] = useState("250");
  const [mainImage, setMainImage] = useState(product250);
  const [quantity, setQuantity] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const mainImageRef = useRef(null);
  const navigate = useNavigate();
 
  const images = [product250, product120, product250];
  const thumbnails = [thumb1, thumb2, thumb3];    

  const prices = {
    "250": { real: 4000, sale: 2500 },
    "120": { real: 3000, sale: 2000 },
  };

  // When weight changes, also change main image
  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    setMainImage(weight === "250" ? product250 : product120);
    setCurrentSlide(weight === "250" ? 0 : 1);
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  // Handle COD button click - NAVIGATES TO ORDER PAGE
  const handleCODPurchase = () => {
    const orderData = {
      product: 'Majoon-e-Khass',
      weight: selectedWeight,
      quantity: quantity,
      price: prices[selectedWeight].sale,
      total: prices[selectedWeight].sale * quantity
    };
    
    navigate('/order', { state: orderData });
  };

  // Touch swipe functions
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      const nextSlide = (currentSlide + 1) % images.length;
      setCurrentSlide(nextSlide);
      setMainImage(images[nextSlide]);
      if (nextSlide === 0 || nextSlide === 2) {
        setSelectedWeight("250");
      } else if (nextSlide === 1) {
        setSelectedWeight("120");
      }
    }
    
    if (isRightSwipe) {
      const prevSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
      setCurrentSlide(prevSlide);
      setMainImage(images[prevSlide]);
      if (prevSlide === 0 || prevSlide === 2) {
        setSelectedWeight("250");
      } else if (prevSlide === 1) {
        setSelectedWeight("120");
      }
    }
   
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        const prevSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
        setCurrentSlide(prevSlide);
        setMainImage(images[prevSlide]);
      } else if (e.key === 'ArrowRight') {
        const nextSlide = (currentSlide + 1) % images.length;
        setCurrentSlide(nextSlide);
        setMainImage(images[nextSlide]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, images]);

  return (
    <div className="product-page-container">
      <div className="left-column">
        {/* Main Image with Touch Events */}
        <div 
          className="main-image-container"
          ref={mainImageRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img 
            src={mainImage} 
            alt="Majoon e Khass" 
            className="main-image" 
            draggable="false"
          />
          
          {/* Slide Indicators */}
          <div className="slide-indicators">
            {images.map((_, index) => (
              <div 
                key={index}
                className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSlide(index);
                  setMainImage(images[index]);
                  if (index === 0 || index === 2) {
                    setSelectedWeight("250");
                  } else if (index === 1) {
                    setSelectedWeight("120");
                  }
                }}
              ></div>
            ))}
          </div>
          
          {/* Swipe Instructions (only visible on mobile) */}
          <div className="swipe-instruction">
            <span className="swipe-arrow">←</span> Swipe to view more <span className="swipe-arrow">→</span>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="thumbnails">
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`thumb${index + 1}`}
              className={`thumb ${images.indexOf(mainImage) === index ? 'active-thumb' : ''}`}
              onClick={() => {
                setMainImage(images[index]);
                setCurrentSlide(index);
                if (index === 0 || index === 2) {
                  setSelectedWeight("250");
                } else if (index === 1) {
                  setSelectedWeight("120");
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="right-column">
        <h1 className="brand-title">REHMANPK</h1>
        <h2 className="product-title">Special Deal Offer ✅</h2>
        {/* <h1>Majoon-E-Khas</h1> */}

        {/* Price */}
        <div className="price-section">
          <span className="real-price">Rs.{prices[selectedWeight].real} </span>
          <span className="sale-price"> Rs.{prices[selectedWeight].sale}</span>
        </div>
        <p className="shipping-info">Shipping calculated at checkout.</p>

        {/* Weight Selector */}
        <div className="weight-selection">
          <span
            className={selectedWeight === "250" ? "active" : ""}
            onClick={() => handleWeightChange("250")}
          >
            250 Gram
          </span>
          <span
            className={selectedWeight === "120" ? "active" : ""}
            onClick={() => handleWeightChange("120")}
          >
            120 Gram
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="quantity-section">
          <button className="qty-btn" onClick={handleDecrease}>-</button>
          <span className="qty">{quantity}</span>
          <button className="qty-btn" onClick={handleIncrease}>+</button>
        </div>

        {/* Order Buttons */}
        <div className="buttons">
          {/* UPDATED BUTTON - NOW IT NAVIGATES TO ORDER PAGE */}
          <button className="buy-btn" onClick={handleCODPurchase}>
            Buy with Cash on Delivery
          </button>
          <a
            href={`https://wa.me/923124936717?text=I want to order ${quantity} x Majoon-e-Khass ${selectedWeight}g at Rs. ${prices[selectedWeight].sale * quantity}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-order-btn"
          >
            Order On WhatsApp
          </a>
        </div>

        {/* Product Info */}
        {/* <ul className="product-info">
          <li>🌱 Herbal Product</li>
          <li>🌟 Satisfaction Guarantee</li>
          <li>🧪 Chemical Free - No Side Effect</li>
          <li>🚚 Free Home Delivery All Over Pakistan</li>
        </ul> */}

        {/* Description */}
        {/* <div className="description">
          <h3>Product Description</h3>
          <p>
            Majoon Khass is a traditional herbal preparation for men, used for centuries in Unani medicine to promote strength, energy, and vitality.
          </p>

          <h3>Why Choose Majoon e Khass?</h3>
          <p>100% natural, chemical-free blend to enhance men's strength and stamina.</p>

          <h3>Key Benefits</h3>
          <ul>
            <li>Enhances Strength & Stamina</li>
            <li>Boosts Energy & Reduces Fatigue</li>
            <li>Supports Reproductive Health</li>
            <li>Aids in Stress Relief & Mental Clarity</li>
            <li>Strengthens Immunity & Overall Health</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default ProductPage;