import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import WhatsappButton from "./Components/Whatsappbtn/Whatsappbutton";
import ProductPage from "./Components/Productpage/Productpage";
import HealthSection from "./Components/Section/HealthSection";
import ImgSection from "./Components/Imgsection/Img-section";
import Footer from "./Components/Footer/Footer";
import OrderPage from "./Components/Orderpage/Orderpage";

function App() {
  // Scroll-to-top component inside App
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      // Scroll to top on every route change
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <Router>
      {/* Add ScrollToTop here - it will work for all routes */}
      <ScrollToTop />
      
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