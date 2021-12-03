import { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import shoppingCartIcon from './cart1.png';
import { CartContext } from '../../../context/cart-context';
import './cart-icon.css';

const CartIcon = ({history}) => {
    const {cartCount} = useContext(CartContext);
    
    return (
        <div className='cart-container' onClick={() => history.push('/cart')}>
            <img className='cart-img' src={shoppingCartIcon} alt='shopping-cart-icon' />
            <span className='cart-count'> {cartCount} </span>
        </div>
    )
}

export default withRouter(CartIcon);