import React from 'react';
import './Cart.css';

const getImageSource = (imageUrl) => {
  const imageMap = {
    '/images/fcb2526.webp': require('../components/images/fcb2526.webp'),
    '/images/rm_2024a.avif': require('../components/images/rm_2024a.avif'),
    '/images/spain2526.jpeg': require('../components/images/spain2526.jpeg'),
    '/images/ars2526.jpeg': require('../components/images/ars2526.jpeg'),
    '/images/indc.jpeg': require('../components/images/indc.jpeg'),
    '/images/ausc.jpeg': require('../components/images/ausc.jpeg'),
    '/images/laknba.jpeg': require('../components/images/laknba.jpeg'),
    '/images/gsnba.jpeg': require('../components/images/gsnba.jpeg'),
    '/images/mutd2425.jpeg': require('../components/images/mutd2425.jpeg'),
    '/images/clsa2425.jpeg': require('../components/images/clsa2425.jpeg'),
    '/images/engc.jpeg': require('../components/images/engc.jpeg'),
    '/images/sac.jpeg': require('../components/images/sac.jpeg'),
    '/images/cbnba.jpeg': require('../components/images/cbnba.jpeg'),
    '/images/mhnba.jpeg': require('../components/images/mhnba.jpeg'),
    '/images/liv2425.jpeg': require('../components/images/liv2425.jpeg'),
    '/images/nzc.jpeg': require('../components/images/nzc.jpeg'),
  };
  return imageMap[imageUrl] || imageMap['/images/fcb2526.webp']; // fallback image
};

const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onClose, onPlaceOrder }) => {
  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity)) {
      onUpdateQuantity(itemId, quantity);
    }
  };

  // Maintain the order of cartItems as is, without sorting
  const sortedCartItems = [...cartItems];

  // Calculate subtotal and total items
  const totalItems = sortedCartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = sortedCartItems.reduce((sum, item) => sum + ((item.quantity || 1) * (item.item.price || 0)), 0);

  return (
    <div className="cart-container">
      <button className="close-cart-btn" onClick={onClose}>Close</button>
      <h2>Shopping Cart</h2>
      {sortedCartItems.length === 0 ? (
        <div className="empty-cart">
          Your cart is empty
        </div>
      ) : (
        <>
          <div className="cart-items">
            {sortedCartItems.map(cartItem => (
              <div key={cartItem.item._id} className="cart-item">
                <img src={getImageSource(cartItem.item.imageUrl)} alt={cartItem.item.name} />
                <div className="item-details">
                  <h3>{cartItem.item.name}</h3>
                  <p>{cartItem.item.team}</p>
                  <p>Price: ₹{cartItem.item.price ? cartItem.item.price.toFixed(2) : '0.00'}</p>
                  <div className="quantity-control">
                    <label htmlFor={`quantity-${cartItem.item._id}`}>Quantity:</label>
                    <button className="quantity-btn minus-btn" onClick={() => handleQuantityChange(cartItem.item._id, (cartItem.quantity || 1) - 1)} disabled={(cartItem.quantity || 1) <= 1}>−</button>
                    <span className="quantity-number">{cartItem.quantity || 1}</span>
                    <button className="quantity-btn plus-btn" onClick={() => handleQuantityChange(cartItem.item._id, (cartItem.quantity || 1) + 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => onRemoveItem(cartItem.item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-subtotal">
            <strong>Subtotal ({totalItems} items): ₹{subtotal.toFixed(2)}</strong>
          </div>
          <button className="place-order-btn" onClick={onPlaceOrder}>Place Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
