import { useReducer } from "react";
import {
  ADD_ITEM,
  CartContext,
  cartReducer,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  initialState,
  REMOVE_ITEM,
} from "./CartContext";

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  const incrementQuantity = (id) => {
    dispatch({ type: INCREMENT_QUANTITY, payload: id });
  };

  const decrementQuantity = (id) => {
    dispatch({ type: DECREMENT_QUANTITY, payload: id });
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
