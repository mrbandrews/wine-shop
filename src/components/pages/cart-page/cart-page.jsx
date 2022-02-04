import { useContext } from 'react';
import { CartContext } from '../../../context/cart-context';
import { getBottleImage } from '../../../images';
import Layout from '../../layout/layout';
import './cart-page.css';

const CartPage = () => {
  const { cartItems, cartCount, cartTotal, increase, decrease, remove } = useContext(CartContext);
  const funcs = { increase, decrease, remove };

  const subtotal = cartTotal;
  const servicefee = 0;
  const tax = (subtotal * 0.07);
  const total = subtotal + servicefee + tax;

  const cartItemsToDisplay = cartItems.map(item => 
                              <CartItem { ...item } key={item.id} { ...funcs }/>);

  return (
    <Layout>
      <div className="cp-container">

        <section className="cp-your-cart">
          <div>
            <span className="cp-section-title">Your Shopping Cart</span> 
            <span className="cp-small">({cartCount} items)</span>
          </div>
          { cartItems.length === 0 && 
            <div className='empty-cart'>Your Cart is empty</div>
          }
          { cartItems.length > 0 && 
            <div className='cart-list'>
              {cartItemsToDisplay}
            </div>
          }
        </section>

        <section className="cp-order-summary">
          <div className="cp-section-title">
            Order Summary
          </div>

          <div className='cp-total-container'>
            <div className="subtotalLabel left-col">Subtotal: </div>
            <div className="subtotal right-col">${subtotal.toFixed(2)} </div>
            <div className="left-col">Service Fee: </div>
            <div className="right-col">${servicefee.toFixed(2)} </div>
            <div className="salestaxLabel left-col">Estimated Tax: </div>
            <div className="salestax right-col">${tax.toFixed(2)} </div>
            <div className="totalLabel left-col">Estimated Total: </div>
            <div className="total right-col">${total.toFixed(2)} </div>
          </div>

          <div className='checkout-container'>
            <button className='checkout-btn'>Secure Checkout</button>
          </div> 

        </section>
      </div>
    </Layout>
  );
}


const CartItem = (props) => {
  const { title, price, quantity, size, id, description, increase, decrease } = props;
  const product = { title, price, quantity, id, description };

  const bottleImage = getBottleImage(title);

  return (
    <div className='ci-container'>
      <div className='ci-image-name-container'>
        <div className='ci-image-container'>
          <img className='ci-image' src={bottleImage} alt='product' />
        </div>
        <div className="ci-name-size-container">
          <div className='ci-name'>{title}</div>
          <div className='ci-size'>{size}</div>
        </div>
      </div>

      <fieldset className='ci-qty-fieldset'>
        <legend className='ci-qty-legend'>Quantity</legend>
        <div className='ci-qty-container'>
          <button className='ci-btn decrease' onClick={() => decrease(product)}>-</button>
          <div className='ci-qty-text'>{quantity}</div>
          <button className='ci-btn increase' onClick={() => increase(product)}>+</button>
        </div>
      </fieldset>

      <div className='ci-price-container'>
        <div className='ci-total'>${(price*quantity).toFixed(2)}</div>
        <div className='ci-price'>${price.toFixed(2)} each</div>
      </div>
    </div>
  );
}


export default CartPage;