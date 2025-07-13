// context/ProductContext.js
import React, { createContext, useContext, useReducer, useEffect } from "react";

// Actions
export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PAGE = "SET_PAGE";
export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export const SET_VIEW_MODE = "SET_VIEW_MODE";
export const SET_CURRENT_VIEW = "SET_CURRENT_VIEW";

export const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.payload };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        selectedProduct:
          state.selectedProduct?.id === action.payload
            ? null
            : state.selectedProduct,
      };

    case SET_PAGE:
      return { ...state, currentPage: action.payload };

    case SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    case SET_VIEW_MODE:
      return { ...state, viewMode: action.payload };

    case SET_CURRENT_VIEW:
      return { ...state, currentView: action.payload };

    default:
      return state;
  }
};

// Hook to use product context
