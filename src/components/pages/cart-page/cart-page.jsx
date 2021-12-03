import { useContext } from 'react';
import { CartContext } from '../../../context/cart-context';
import Layout from '../../layout/layout';
import { getBottleImage } from '../../../images';
import './cart-page.css';

const CartPage = () => {
  const { cartItems, cartCount, cartTotal, increase, decrease, remove, clearCart } = useContext(CartContext);
  const funcs = { increase, decrease, remove };

  const cartItemsToDisplay = cartItems.map(item => 
                              <CartItem { ...item } key={item.id} { ...funcs }/>);

  return (
    <Layout>
      <>
        <h1 className="cart-page-title">Cart</h1>
        {
          cartItems.length === 0 && <div className='empty-cart'>Your Cart is empty</div>
        }
        { cartItems.length > 0 && 
          <div className='cart-page'>
            <div className='cart-item-container'>
              {
                cartItemsToDisplay
              }
            </div>
            <Total cartCount={cartCount} total={cartTotal} clearCart={clearCart} />
          </div>
        }
      </>
    </Layout>
  );
}


const CartItem = (props) => {
  const { title, price, quantity, id, description, increase, decrease } = props;
  const product = { title, price, quantity, id, description };

  const bottleImage = getBottleImage(title);

  return (
    <div className='cart-item'>
      <div>
        <img className='cart-item-image' src={bottleImage} alt='product' />
      </div>

      <div className='cart-name-price'>
        <h4>{title}</h4>
        ${price}
      </div>

      <div className='btns-container'>
        <button className='cp-button' onClick={() => increase(product)}>
            Add
        </button>
        <div className='quantity'>{`Qty: ${quantity}`}
        </div>
        <button className='cp-button' onClick={() => decrease(product)}>
            Decrease
        </button>
      </div>
    </div>
  );
}


const Total = ({ cartCount, total, history, clearCart }) => {

  return (
    <div className='total-container'>
      <div className='total'>
        <p>Total Items: {cartCount}</p>
        <p>{`Total: $${total.toFixed(2)}`}</p>
      </div>
      <div className='checkout-container'>
        <button className='checkout-btn'>CHECKOUT</button>
        <button className='clear-btn' onClick={() => clearCart()}>CLEAR</button>  
      </div>
    </div>
  );
}

export default CartPage;