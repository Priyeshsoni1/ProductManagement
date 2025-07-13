import { useContext } from "react";
import { CartContext } from "../cartStore/CartContext";

// Custom hook to use cart
export const useCart = () => useContext(CartContext);
