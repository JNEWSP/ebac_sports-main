import React from 'react';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

const App: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <header>
        <h1>EBAC Sports</h1>
      </header>

      <main style={{ display: 'flex', gap: 32 }}>
        <section style={{ flex: 2 }}>
          <ProductList />
        </section>
        <aside style={{ flex: 1 }}>
          <Cart />
        </aside>
      </main>
    </div>
  );
};

export default App;