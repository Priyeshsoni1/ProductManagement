import { useContext } from "react";
import { ProductContext } from "../ProductStore/ProductContext";

export const useProducts = () => useContext(ProductContext);
