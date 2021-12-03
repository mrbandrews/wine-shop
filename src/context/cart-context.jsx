import { createContext, useReducer } from 'react';
import cartReducer, { getCartCount, getCartTotal } from './cart-reducer';

const cartFromStorage = localStorage.getItem('cart');
const cart = cartFromStorage ? JSON.parse(cartFromStorage) : [];

const initialState = { 
  cartItems: cart, 
  cartCount: getCartCount(cart),
  cartTotal: getCartTotal(cart),
};

export const CartContext = createContext(initialState);

const CartContextProvider = (props) =>  {

  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const increase = (product) => dispatch({ type: 'INCREASE', payload: product });
  const decrease = (product) => dispatch({ type: 'DECREASE', payload: product });
  const remove = (product) => dispatch({ type: 'REMOVE', payload: product });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const contextValues = {
    ...state,
    addProduct,
    increase,
    decrease,
    remove,
    clearCart
};

  return (
    <CartContext.Provider value= { contextValues }>
      {props.children}
    </CartContext.Provider>
  )

}
export default CartContextProvider;
