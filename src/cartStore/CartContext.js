import { createContext } from "react";

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const initialState = [];
export const CartContext = createContext();
export function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, 10), // Max 10
              }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload);

    case INCREMENT_QUANTITY:
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
          : item
      );

    case DECREMENT_QUANTITY:
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove if quantity becomes 0

    default:
      return state;
  }
}
