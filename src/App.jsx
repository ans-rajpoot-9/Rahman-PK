import React from "react";
import Header from "./Components/Header/Header";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

import WhatsappButton from "./Components/Whatsappbtn/Whatsappbutton"; // Fixed folder name
import ProductPage from "./Components/Productpage/Productpage";
import HealthSection from "./Components/Section/HealthSection";
import ImgSection from "./Components/Imgsection/Img-section";
import Footer from "./Components/Footer/Footer";
import OrderPage from "./Components/Orderpage/Orderpage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <WhatsappButton />
        <Navbar />
        <Routes>
          {/* Home page route */}
          <Route
            path="/"
            element={
              <>
                <ProductPage />
                <HealthSection />
                <ImgSection />
                <Footer />
              </>
            }
          />

          {/* Order page route */}
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
