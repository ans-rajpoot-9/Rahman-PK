import React from 'react';
import './Footer.css';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTruck, FaShieldAlt, FaLeaf } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            {/* Top Section */}
            <div className="footer-top">
                <div className="footer-features">
                    <div className="feature">
                        <FaTruck className="feature-icon" />
                        <h3>Free Delivery</h3>
                        <p>All over Pakistan</p>
                    </div>
                    <div className="feature">
                        <FaShieldAlt className="feature-icon" />
                        <h3>100% Secure</h3>
                        <p>Safe & Secure Payment</p>
                    </div>
                    <div className="feature">
                        <FaLeaf className="feature-icon" />
                        <h3>100% Natural</h3>
                        <p>Pure Herbal Products</p>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="footer-main">
                <div className="footer-container">
                    {/* Company Info */}
                    <div className="footer-section">
                        <h3 className="footer-logo">REHMANPK 🌿</h3>
                        <p className="footer-description">
                            Your trusted source for premium herbal products. 
                            100% natural, chemical-free remedies for better health and wellness.
                        </p>
                        <div className="social-icons">
                            <a href="#" className="social-icon"><FaFacebook /></a>
                            <a href="#" className="social-icon"><FaInstagram /></a>
                            <a href="https://wa.me/923124936717" className="social-icon whatsapp"><FaWhatsapp /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Products */}
                    <div className="footer-section">
                        <h3>Our Products</h3>
                        <ul className="footer-links">
                            <li><a href="/product/majoon-khass">Majoon-E-Khass</a></li>
                            <li><a href="/products">All Herbal Products</a></li>
                            <li><a href="/products">Men's Health</a></li>
                            <li><a href="/products">Women's Health</a></li>
                            <li><a href="/products">Immunity Boosters</a></li>
                            <li><a href="/products">Energy & Stamina</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <FaPhone className="contact-icon" />
                                <span>+92 312 4936717</span>
                            </div>
                            <div className="contact-item">
                                <FaWhatsapp className="contact-icon whatsapp" />
                                <span>+92 312 4936717</span>
                            </div>
                            <div className="contact-item">
                                <FaEnvelope className="contact-icon" />
                                <span>rpkorder@gmail.com</span>
                            </div>
                            <div className="contact-item">
                                <FaMapMarkerAlt className="contact-icon" />
                                <span>SKP, Pakistan</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="copyright">
                        © {new Date().getFullYear()} REHMANPK. All rights reserved. | 
                        Herbal Products | Natural Remedies | Traditional Medicine
                    </p>
                    <p className="disclaimer">
                        *These statements have not been evaluated by the Drug Regulatory Authority of Pakistan. 
                        Products are not intended to diagnose, treat, cure, or prevent any disease.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;