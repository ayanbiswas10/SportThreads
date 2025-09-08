import React, { useState, useEffect } from 'react';
import Header from './Home/Header';
import Body from './Home/Body';
import Footer from './Home/Footer';
import Cart from './Cart';

const Home = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Fetch cart items on component mount and when user logs in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, quantity: 1 }),
      });

      if (response.ok) {
        await fetchCartItems(); // Refresh cart items
        alert('Item added to cart');
      } else {
        const errorData = await response.json();
        alert(`Failed to add to cart: ${errorData.message}`);
      }
    } catch (error) {
      alert('Error adding item to cart');
    }
  };

  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${userId}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        await fetchCartItems(); // Refresh cart items
      } else {
        const errorData = await response.json();
        alert(`Failed to remove item: ${errorData.message}`);
      }
    } catch (error) {
      alert('Error removing item from cart');
    }
  };

  const updateCartItemQuantity = async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        await removeFromCart(itemId);
        return;
      }

      // For quantity updates, we need to remove and re-add with new quantity
      // First remove
      await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${userId}/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
      });

      // Then add with new quantity
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/cart/${userId}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, quantity }),
      });

      if (response.ok) {
        await fetchCartItems(); // Refresh cart items
      } else {
        const errorData = await response.json();
        alert(`Failed to update quantity: ${errorData.message}`);
      }
    } catch (error) {
      alert('Error updating item quantity');
    }
  };

  useEffect(() => {
    const handleToggleCart = () => {
      setCartVisible((visible) => !visible);
    };
    window.addEventListener('toggleCart', handleToggleCart);
    return () => {
      window.removeEventListener('toggleCart', handleToggleCart);
    };
  }, []);

  return (
    <>
      <Header />
      <Body
        onAddToCart={addToCart}
        cartCount={cartItems.length}
        onCartClick={() => {
          setCartVisible(true);
          setTimeout(() => {
            const cartSection = document.querySelector('.cart-container');
            if (cartSection) {
              cartSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
      />
      {cartVisible && (
        <Cart
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={updateCartItemQuantity}
          onClose={() => setCartVisible(false)}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;
