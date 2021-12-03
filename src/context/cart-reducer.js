export const getCartCount = cart => cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotal = cart => {
  const temp = cart.reduce((total, x) => total + (x.quantity * x.price), 0);
  return Math.round(temp*100) / 100;
}


const storeCart = (cartItems) => {
  if (cartItems.length === 0)
    cartItems = [];
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

const updatedState = (oldState, updatedItems) => {
  storeCart(updatedItems);
  return {
    ...oldState,
    cartItems: [...updatedItems],
    cartCount: getCartCount(updatedItems),
    cartTotal: getCartTotal(updatedItems),
  }
}

const cartReducer = (state, action) => {

  switch (action.type) {

    case 'ADD_ITEM': 

       // if already in cart, do nothing
       if (state.cartItems.find(item => item.id === action.payload.id)) 
         return state;

       state.cartItems.push({ ...action.payload, quantity: 1});
       return updatedState(state, state.cartItems);

    case 'INCREASE': 

      const increaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      state.cartItems[increaseIndex].quantity++;
      return updatedState(state, state.cartItems);
 
    case 'DECREASE': 

      const decreaseIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      // if quantity is 1, remove the item
      if (state.cartItems[decreaseIndex].quantity <= 1) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
        return updatedState(state, state.cartItems);
      }

      state.cartItems[decreaseIndex].quantity--;
      return updatedState(state, state.cartItems);

    //  case 'REMOVE': 
    //     state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
    //     return updatedState(state, state.cartItems);
     
      case 'CLEAR':
          localStorage.removeItem('cart');
          return { cartItems: [], cartCount: 0, cartTotal: 0 };
        
    default: 
      return state; 

  }
}

export default cartReducer;
