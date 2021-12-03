import { useContext } from 'react';
import { CartContext } from '../../../context/cart-context'; 
import { withRouter } from 'react-router-dom';
import { getBottleImage } from '../../../images/index';
import './product-card.css';

const ProductCard = (props) => {
  
  const { product, history, pickupLocal, userState } = props;
  const { addProduct, cartItems, increase } = useContext(CartContext);

  const itemInCart = cartItems.find(p => p.id === product.id);

  const [local, all] = [product.inventoryLocal, product.inventoryAll];

  let pickupDisplay = "Limited Quantity";
  let deliverDisplay = "Out of Stock";
  let shipDisplay = "Unavailable";

  if (pickupLocal) {  
    if (local > 10) 
      pickupDisplay = "In Stock";
  }
  else if (all > 10 ) {
      pickupDisplay = "In Stock";
  }

  if (product.canDeliver && local > 0) {
    deliverDisplay = "Available";
  }

  if (product.shipStates.includes(userState) && all > 0) {
    shipDisplay = "Available";
  }
  
  const bottleImage = getBottleImage(product.title);
  

  return (
    <div className='product-card'>

      {/* <div className='product-image' onClick={() => history.push(`/product/${product.id}`)}>
        <img src={product.imageUrl}  alt='product' />         
      </div> */}

      <div className='product-image' onClick={() => history.push(`/product/${product.id}`)}>
        <img src={bottleImage}  alt='product' />         
      </div>

      <div className="product-info">
        <div className="product-name">{product.title}</div>
        <div className="product-size">{product.size}</div>
        <div className="product-price">$ {product.price}</div>
        <div className="product-pickup">Pick-up: <span className="green">{pickupDisplay}</span></div>
        <div className="product-delivery">Local Delivery: <span className="green">{deliverDisplay}</span></div>
        <div className="product-shipping">Shipping: <span className="green">{shipDisplay}</span></div>

        { !itemInCart && <button className='add-cart-button' onClick={() => addProduct(product)}>Add to Cart</button> }
        {  itemInCart && <button className='add-cart-button' onClick={()=> increase(product)}>Add More</button> }
      </div>
    </div>
  );
}

export default withRouter(ProductCard);