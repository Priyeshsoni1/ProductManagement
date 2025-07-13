import { useContext } from "react";
import { ProductContext } from "../productStore/productContext";

export const useProducts = () => useContext(ProductContext);
