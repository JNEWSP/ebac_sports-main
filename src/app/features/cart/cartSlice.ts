import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from './types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const findIndex = (items: CartItem[], productId: number) =>
  items.findIndex((i) => i.id === productId);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const idx = findIndex(state.items, product.id);
      if (idx >= 0) {
        state.items[idx].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    incrementQuantity(state, action: PayloadAction<number>) {
      const idx = findIndex(state.items, action.payload);
      if (idx >= 0) state.items[idx].quantity += 1;
    },
    decrementQuantity(state, action: PayloadAction<number>) {
      const idx = findIndex(state.items, action.payload);
      if (idx >= 0) {
        state.items[idx].quantity -= 1;
        if (state.items[idx].quantity <= 0) {
          state.items.splice(idx, 1);
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
    // caso queira setar quantidade diretamente:
    setQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const idx = findIndex(state.items, action.payload.id);
      if (idx >= 0) {
        state.items[idx].quantity = action.payload.quantity;
        if (state.items[idx].quantity <= 0) {
          state.items.splice(idx, 1);
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, it) => sum + it.quantity * it.price, 0);