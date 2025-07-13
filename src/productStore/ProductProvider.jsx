import { useEffect, useReducer } from "react";
import {
  DELETE_PRODUCT,
  ProductContext,
  productReducer,
  SET_CURRENT_VIEW,
  SET_PAGE,
  SET_PRODUCTS,
  SET_SELECTED_PRODUCT,
  SET_VIEW_MODE,
} from "./productContext";
import { generateMockProducts } from "../utils/mockData";
const initialState = {
  products: [],
  selectedProduct: null,
  currentPage: 1,
  itemsPerPage: 10,

  viewMode: "table",
  currentView: "main",
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Initialize products on first load
  useEffect(() => {
    const mockProducts = generateMockProducts(1000);
    dispatch({ type: SET_PRODUCTS, payload: mockProducts });
  }, []);

  const deleteProduct = (id) => dispatch({ type: DELETE_PRODUCT, payload: id });
  const setPage = (page) => dispatch({ type: SET_PAGE, payload: page });
  const setSelectedProduct = (product) =>
    dispatch({ type: SET_SELECTED_PRODUCT, payload: product });
  const setViewMode = (mode) =>
    dispatch({ type: SET_VIEW_MODE, payload: mode });
  const setCurrentView = (view) =>
    dispatch({ type: SET_CURRENT_VIEW, payload: view });
  return (
    <ProductContext.Provider
      value={{
        ...state,
        deleteProduct,
        setPage,
        setSelectedProduct,
        setViewMode,
        setCurrentView,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
