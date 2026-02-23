import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CART_STORAGE_KEY = 'royalstroje_cart';

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if product already in cart
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev; // Don't add duplicates
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      // Use pricePerDay if available, otherwise extract from price string
      if (item.pricePerDay && !isNaN(item.pricePerDay)) {
        return sum + item.pricePerDay;
      }
      // Fallback: Extract number from price string like "25€/deň" or "od 150€"
      const priceMatch = item.price?.match(/(\d+)/);
      const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;
      return sum + price;
    }, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
