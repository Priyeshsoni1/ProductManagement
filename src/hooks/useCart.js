import { useContext } from "react";
import { CartContext } from "../CartStore/CartContext";

// Custom hook to use cart
export const useCart = () => useContext(CartContext);
