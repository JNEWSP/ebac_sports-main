import React from 'react';
import { useGetProductsQuery } from '../features/api/apiSlice';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../features/cart/types';

export const ProductList: React.FC = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  if (isLoading) return <div>Carregando produtos...</div>;
  if (isError) return <div>Erro ao carregar produtos</div>;

  return (
    <div>
      <h2>Produtos</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products?.map((p: Product) => (
          <li key={p.id} style={{ marginBottom: 16, border: '1px solid #ddd', padding: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {p.image && <img src={p.image} alt={p.title} style={{ width: 72, height: 72, objectFit: 'cover' }} />}
              <div>
                <div style={{ fontWeight: 600 }}>{p.title}</div>
                <div>R$ {p.price}</div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => dispatch(addToCart({ product: p }))}>
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};