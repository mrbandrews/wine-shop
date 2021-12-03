import ReactDOM from 'react-dom';
import App from './App';
import ProductsContextProvider from './context/products-context';
import CartContextProvider from './context/cart-context';
import './index.css';


ReactDOM.render(
    <ProductsContextProvider>
      <CartContextProvider>
        <App basename="/wine-shop" />
      </CartContextProvider>
    </ProductsContextProvider>,
  document.getElementById('root')
);

