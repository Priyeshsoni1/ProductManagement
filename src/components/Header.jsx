import React from "react";
import { useCart } from "../hooks/useCart";

const Header = ({ onCartClick }) => {
  const {
    cart,
    addToCart: setItems,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const cartCount = cart.length;
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-semibold">🛍️ Product Dashboard</div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCartClick}
          className="relative bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
        <img
          src="https://i.pravatar.cc/30"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
