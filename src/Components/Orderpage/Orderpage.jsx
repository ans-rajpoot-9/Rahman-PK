import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Orderpage.css';
import './TikTokPopup.css'

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const orderData = location.state || {
        product: 'Majoon-e-Khass',
        weight: '250',
        quantity: 1,
        price: 2500,
        total: 2500
    };

    const [orderForm, setOrderForm] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: ''
        // REMOVED: notes field
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreementChecked, setAgreementChecked] = useState(false);
    const [showTikTokPopup, setShowTikTokPopup] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const ACCESS_KEY = '8b75cd81-0f1c-483e-a04e-4091ac1091e0';
    const TIKTOK_URL = 'https://www.tiktok.com/@rehmanpk871';

    // Countdown timer for TikTok redirect
    useEffect(() => {
        let timer;
        if (showTikTokPopup && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);
        } else if (showTikTokPopup && countdown === 0) {
            handleTikTokRedirect();
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [showTikTokPopup, countdown]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for phone input
        if (name === 'phone') {
            handlePhoneChange(value);
        } else {
            setOrderForm({
                ...orderForm,
                [name]: value
            });
        }
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handlePhoneChange = (value) => {
        let cleanedValue = value.replace(/\D/g, '');
        if (cleanedValue.length > 10) {
            cleanedValue = cleanedValue.slice(0, 10);
        }
        
        setOrderForm({
            ...orderForm,
            phone: cleanedValue
        });
        
        if (errors.phone) {
            setErrors({
                ...errors,
                phone: ''
            });
        }
    };

    const handleCheckboxChange = (e) => {
        setAgreementChecked(e.target.checked);
        if (errors.agreement) {
            setErrors({
                ...errors,
                agreement: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!orderForm.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!orderForm.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(orderForm.phone)) {
            newErrors.phone = 'Please enter valid 10-digit number (like 3XXXXXXXXX)';
        } else if (!/^3\d{9}$/.test(orderForm.phone)) {
            newErrors.phone = 'Pakistani number must start with 3 (like 3XXXXXXXXX)';
        }
        
        if (!orderForm.address.trim()) {
            newErrors.address = 'Address is required';
        }
        
        if (!orderForm.city.trim()) {
            newErrors.city = 'City is required';
        }
        
        // REMOVED: agreement validation
        
        return newErrors;
    };

    const handleTikTokRedirect = () => {
        window.open(TIKTOK_URL, '_blank');
        setShowTikTokPopup(false);
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            
            const firstError = Object.keys(formErrors)[0];
            let element;
            
            if (firstError === 'agreement') {
                element = document.querySelector('.agreement-checkbox');
            } else {
                element = document.querySelector(`[name="${firstError}"]`);
            }
            
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // REMOVED: agreement check
        
        setIsSubmitting(true);

        const productName = `Majoon-e-Khass ${orderData.weight}g`;
        const fullPhoneNumber = `0${orderForm.phone}`;
        
        const formData = {
            access_key: ACCESS_KEY,
            subject: `🔥 NEW ORDER - ${productName} - ${orderForm.name}`,
            from_name: 'REHMANPK Website',
            name: orderForm.name,
            phone: `+92${orderForm.phone}`,
            formatted_phone: `+92${fullPhoneNumber}`,
            
            address: orderForm.address,
            city: orderForm.city,
           
            notes: 'No additional notes', // REMOVED: orderForm.notes reference
            product: productName,
            weight: `${orderData.weight}g`,
            quantity: orderData.quantity,
            unit_price: `Rs. ${orderData.price}`,
            total_amount: `Rs. ${orderData.total}`,
            payment_method: 'Cash on Delivery',
            delivery: 'Free Delivery All Over Pakistan',
            order_time: new Date().toLocaleString('en-PK'),
            order_id: `REHMAN-${Date.now().toString().slice(-6)}`,
            agreement_accepted: 'Yes',
            botcheck: false
        };

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json(); // FIXED: Changed "await.response.json()" to "await response.json()"
            
            if (result.success) {
                // Show beautiful success alert
                setShowSuccessAlert(true);
                
                setTimeout(() => {
                    setShowSuccessAlert(false);
                    // Show TikTok popup after success alert
                    setShowTikTokPopup(true);
                    setCountdown(10); // Reset countdown to 5 seconds
                }, 3000);
                
            } else {
                alert(`❌ Failed: ${result.message || 'Please try again.'}`);
                setIsSubmitting(false);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Network error. Please try again.');
            setIsSubmitting(false);
        }
    };

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowTikTokPopup(true);
        setCountdown(10);
    };

    const handleStayOnWebsite = () => {
        setShowTikTokPopup(false);
        setCountdown(10);
        navigate('/');
    };

    return (
        <div className="order-page">
            {/* Beautiful Success Alert */}
            {showSuccessAlert && (
                <div className="success-alert-overlay">
                    <div className="success-alert">
                        <div className="success-icon">✅</div>
                        
                        <h2>🎉 Order Successfully Placed!</h2>
                        <h2>Thank You So much For Order</h2>
                        <p>Your order has been submitted successfully!</p>
                        <p className="alert-subtext">Check your email for confirmation & tracking details</p>
                        <div className="alert-spinner">
                            <div className="spinner"></div>
                            <p>Preparing TikTok experience...</p>
                        </div>
                        <button 
                            className="alert-close-btn"
                            onClick={handleCloseAlert}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* TikTok Popup Animation */}
            {showTikTokPopup && (
                <div className="tiktok-popup-overlay">
                    <div className="tiktok-popup">
                        <div className="tiktok-icon">🎬</div>
                        <h2>Explore More Herbal Products!</h2>
                        <p>You are being redirected to our TikTok page</p>
                        <p className="popup-subtext">Discover health tips, herbal remedies & exclusive content</p>
                        
                        <div className="popup-countdown">
                            <div className="countdown-circle">
                                <span className="countdown-number">{countdown}</span>
                            </div>
                            <p>Redirecting in {countdown} seconds...</p>
                        </div>
                        
                        <div className="popup-buttons">
                            <button 
                                className="popup-cancel-btn"
                                onClick={handleStayOnWebsite}
                            >
                                Stay on Website
                            </button>
                            <button 
                                className="popup-tiktok-btn"
                                onClick={handleTikTokRedirect}
                            >
                                Visit TikTok Profile Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="order-container">
                <div className="order-header">
                    <h1>📦 Complete Your Order</h1>
                    <p>Fill details for Cash on Delivery</p>
                </div>

                <div className="order-summary-card">
                    <h2>Order Summary</h2>
                    <div className="summary-items">
                        <div className="summary-item">
                            <span>Product:</span>
                            <span>Majoon-e-Khass {orderData.weight}g</span>
                        </div>
                        <div className="summary-item">
                            <span>Quantity:</span>
                            <span>{orderData.quantity}</span>
                        </div>
                        <div className="summary-item">
                            <span>Unit Price:</span>
                            <span>Rs. {orderData.price}</span>
                        </div>
                        <div className="summary-item total">
                            <span>Total Amount:</span>
                            <span className="total-amount">Rs. {orderData.total}</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="order-form">
                    <h2>👤 Shipping Details</h2>
                    
                    <div className="form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={orderForm.name}
                            onChange={handleInputChange}
                            placeholder="Your full name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label>Phone Number *</label>
                        <div className="phone-input">
                            <span className="country-code">+92</span>
                            <input
                                type="tel"
                                name="phone"
                                value={orderForm.phone}
                                onChange={handleInputChange}
                                placeholder="3XXXXXXXXX"
                                className={errors.phone ? 'error' : ''}
                                maxLength="10"
                            />
                        </div>
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                        <small>Format: 3XXXXXXXXX (10 digits without 0)</small>
                        <small style={{ display: 'block', marginTop: '5px', color: '#FFD700' }}>
                            {orderForm.phone.length}/10 digits • Will be saved as: 0{orderForm.phone || 'XXXXXXXXX'}
                        </small>
                    </div>
                    
                    <div className="form-group">
                        <label>Email Address (Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={orderForm.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                        />
                        <small>For order updates (optional)</small>
                    </div>
                    
                    <div className="form-group">
                        <label>Full Address *</label>
                        <textarea
                            name="address"
                            value={orderForm.address}
                            onChange={handleInputChange}
                            placeholder="House #, Street, Area, City"
                            rows="3"
                            className={errors.address ? 'error' : ''}
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>City *</label>
                            <input
                                type="text"
                                name="city"
                                value={orderForm.city}
                                onChange={handleInputChange}
                                placeholder="Your city"
                                className={errors.city ? 'error' : ''}
                            />
                            {errors.city && <span className="error-message">{errors.city}</span>}
                        </div>
                        
                        <div className="form-group">
                            {/* Empty div for layout */}
                        </div>
                    </div>
                    
                    {/* REMOVED: Additional Notes field */}
                    {/* REMOVED: Agreement checkbox section */}
                    
                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="back-btn"
                            onClick={() => navigate(-1)}
                            disabled={isSubmitting}
                        >
                            ← Back
                        </button>
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={isSubmitting} // REMOVED: !agreementChecked condition
                        >
                            {isSubmitting ? 'Processing...' : 'Confirm Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderPage;