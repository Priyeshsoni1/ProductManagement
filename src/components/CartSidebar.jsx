import React from "react";
import { useCart } from "../hooks/useCart";

const CartSidebar = ({ isOpen, onClose }) => {
  const {
    cart: items,

    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} className="text-gray-500 hover:text-black mb-4">
        ✖ Close
      </button>
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="border p-2 rounded">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center mt-2 gap-2">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t pt-4 text-right">
        <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartSidebar;
