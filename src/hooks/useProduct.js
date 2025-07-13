import { useContext } from "react";
import { ProductContext } from "../productStore/ProductContext";

export const useProducts = () => useContext(ProductContext);
