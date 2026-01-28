import React from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  selectCartTotal,
  clearCart,
} from '../features/cart/cartSlice';

export const Cart: React.FC = () => {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const dispatch = useAppDispatch();

  if (!items || items.length === 0) return <div><h2>Carrinho</h2><div>Carrinho vazio</div></div>;

  return (
    <div>
      <h2>Carrinho</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((it) => (
          <li key={it.id} style={{ marginBottom: 12, borderBottom: '1px solid #eee', paddingBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div>R$ {it.price} x {it.quantity}</div>
              </div>
              <div>
                <button onClick={() => dispatch(decrementQuantity(it.id))} style={{ marginRight: 8 }}>-</button>
                <button onClick={() => dispatch(incrementQuantity(it.id))} style={{ marginRight: 8 }}>+</button>
                <button onClick={() => dispatch(removeFromCart(it.id))}>Remover</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12 }}>
        <strong>Total: R$ {total.toFixed(2)}</strong>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => dispatch(clearCart())}>Esvaziar carrinho</button>
      </div>
    </div>
  );
};