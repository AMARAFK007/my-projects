import React, { useState, useEffect } from 'react';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(5.99);
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  // Form states
  const [formData, setFormData] = useState({
    // Billing info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Payment info
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    
    // Shipping info
    sameAsBilling: true,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZipCode: '',
    shippingCountry: 'US',
  });
  
  // Load cart on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('medshopCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      
      // Calculate subtotal
      const calculatedSubtotal = parsedCart.reduce(
        (sum, item) => sum + item.price * item.quantity, 
        0
      );
      setSubtotal(calculatedSubtotal);
      setTotal(calculatedSubtotal + shipping);
    }
  }, [shipping]);
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle shipping method change
  const handleShippingChange = (e) => {
    const shippingCost = parseFloat(e.target.value);
    setShipping(shippingCost);
    setTotal(subtotal + shippingCost);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate billing info
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
        alert('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate shipping info
      if (!formData.sameAsBilling && 
          (!formData.shippingFirstName || !formData.shippingAddress)) {
        alert('Please fill in all required shipping fields');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Validate payment info
      if (paymentMethod === 'credit-card' && 
          (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv)) {
        alert('Please fill in all payment details');
        return;
      }
      
      // Process the order
      processOrder();
    }
  };
  
  // Process the order (simulate API call)
  const processOrder = () => {
    // In a real app, this would be an API call to create the order
    setTimeout(() => {
      // Clear the cart
      localStorage.removeItem('medshopCart');
      
      // Redirect to order confirmation
      window.location.href = '/order-confirmation?id=' + generateOrderId();
    }, 1500);
  };
  
  // Generate a fake order ID
  const generateOrderId = () => {
    return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };
  
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Billing</div>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Shipping</div>
          </div>
          <div className="step-divider"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Payment</div>
          </div>
        </div>
      </div>
      
      <div className="checkout-content">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Step 1: Billing Information */}
            {step === 1 && (
              <div className="billing-info">
                <h2>Billing Information</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State/Province *</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip/Postal Code *</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button type="submit" className="btn-primary">
                    Continue to Shipping
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Shipping Information */}
            {step === 2 && (
              <div className="shipping-info">
                <h2>Shipping Information</h2>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    name="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sameAsBilling">
                    Same as billing address
                  </label>
                </div>
                
                {!formData.sameAsBilling && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="shippingFirstName">First Name *</label>
                        <input
                          type="text"
                          id="shippingFirstName"
                          name="shippingFirstName"
                          value={formData.shippingFirstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingLastName">Last Name *</label>
                        <input
                          type="text"
                          id="shippingLastName"
                          name="shippingLastName"
                          value={formData.shippingLastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="shippingAddress">Address *</label>
                      <input
                        type="text"
                        id="shippingAddress"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="shippingCity">City *</label>
                        <input
                          type="text"
                          id="shippingCity"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingState">State/Province *</label>
                        <input
                          type="text"
                          id="shippingState"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="shippingZipCode">Zip/Postal Code *</label>
                        <input
                          type="text"
                          id="shippingZipCode"
                          name="shippingZipCode"
                          value={formData.shippingZipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="shippingCountry">Country *</label>
                        <select
                          id="shippingCountry"
                          name="shippingCountry"
                          value={formData.shippingCountry}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="shipping-methods">
                  <h3>Shipping Method</h3>
                  
                  <div className="shipping-options">
                    <div className="shipping-option">
                      <input
                        type="radio"
                        id="standard"
                        name="shipping"
                        value="5.99"
                        checked={shipping === 5.99}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="standard">
                        <div className="option-info">
                          <span className="option-name">Standard Shipping</span>
                          <span className="option-description">Delivery in 3-5 business days</span>
                        </div>
                        <span className="option-price">$5.99</span>
                      </label>
                    </div>
                    
                    <div className="shipping-option">
                      <input
                        type="radio"
                        id="express"
                        name="shipping"
                        value="12.99"
                        checked={shipping === 12.99}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="express">
                        <div className="option-info">
                          <span className="option-name">Express Shipping</span>
                          <span className="option-description">Delivery in 1-2 business days</span>
                        </div>
                        <span className="option-price">$12.99</span>
                      </label>
                    </div>
                    
                    <div className="shipping-option">
                      <input
                        type="radio"
                        id="free"
                        name="shipping"
                        value="0"
                        checked={shipping === 0}
                        onChange={handleShippingChange}
                      />
                      <label htmlFor="free">
                        <div className="option-info">
                          <span className="option-name">Free Shipping</span>
                          <span className="option-description">Delivery in 5-7 business days (orders over $50)</span>
                        </div>
                        <span className="option-price">$0.00</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Payment Information */}
            {step === 3 && (
              <div className="payment-info">
                <h2>Payment Information</h2>
                
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                    />
                    <label htmlFor="credit-card">
                      <i className="far fa-credit-card"></i>
                      <span>Credit Card</span>
                    </label>
                  </div>
                  
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment-method"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                    />
                    <label htmlFor="paypal">
                      <i className="fab fa-paypal"></i>
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="credit-card-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number *</label>
                      <div className="card-input">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                        <div className="card-icons">
                          <i className="fab fa-cc-visa"></i>
                          <i className="fab fa-cc-mastercard"></i>
                          <i className="fab fa-cc-amex"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="cardHolder">Card Holder Name *</label>
                      <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="Name as it appears on card"
                        required
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiryDate">Expiry Date *</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM / YY"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV *</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {paymentMethod === 'paypal' && (
                  <div className="paypal-info">
                    <p>You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}
                
                <div className="order-summary-review">
                  <h3>Order Summary</h3>
                  
                  <div className="summary-items">
                    {cart.map((item) => (
                      <div className="summary-item" key={item.id}>
                        <div className="item-details">
                          <span className="item-quantity">{item.quantity}x</span>
                          <span className="item-name">{item.name}</span>
                        </div>
                        <span className="item-total">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="summary-totals">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="form-buttons">
                  <button 
                    type="button" 
                    className="btn-secondary"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-image">
                  <i className="fas fa-prescription-bottle-alt"></i>
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-meta">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <span className="item-quantity">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="coupon-code">
            <input type="text" placeholder="Coupon Code" />
            <button className="apply-coupon">Apply</button>
          </div>
          
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 