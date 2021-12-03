import { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ProductsContext } from "../../../context/products-context";
import { CartContext } from '../../../context/cart-context';
import Layout from "../../layout/layout";
import './detail-page.css';
import { getBottleImage } from '../../../images';


/*********  PRODUCT DETAIL PAGE  *******************************************
 * 
 * This page shows a bottle of wine and invites the user to add it to the cart. 
 * Designed to be mobile-first and responsive. 
 ***************************************************************************/
const DetailPage = (props) => {

    const { products } = useContext(ProductsContext);
    const { addProduct, cartItems, increase } = useContext(CartContext);
    const { id } = props.match.params;

    const [product, setProduct] = useState(null);

    // check for product id
    useEffect(() => {
        const prod = products.find(item => Number(item.id) === Number(id));
        if (!prod)
            return props.history.push('/shop');
        setProduct(prod);
    }, [products, id, props.history]);

    // if no product, return null; we will soon find the product in useEffect
    if (!product) { return null; }

    //pull a few things off the product
    const { title, size, price } = product;
    const itemInCart = cartItems.find(p => p.id === product.id);

    // handle the radio button change
    function onChangeValue(e) {
      console.log(e.target.value);
    }

    const radioPickup = {
      "buttonValue": "pickup",
      "line1": "Pick Up",
      "line2": "In Stock",
      "line3": "Tucson (Park Place Mall)",
      "line4": "Aisle 11, Right",
      "rightButtonText": "Nearby Stores",      
    }

    const radioDelivery = {
      "buttonValue": "deliver",
      "line1": "Delivery",
      "line2": "Available",
      "line3": "Confirm your address to check availability",
      "line4": "",
      "rightButtonText": "Confirm Address",      
    }

    const radioShipTo = {
      "buttonValue": "shipTo",
      "line1": "Ship to Arizona",
      "line2": "In Stock",
      "line3": "",
      "line4": "",
      "rightButtonText": "Change Location",      
    }

    const bottleImage = getBottleImage(product.title);

     return (

       <Layout>

        <main className="dp-main">
          <article className="dp-card">
              <div className='dp-card-image'>
                <img src={bottleImage}  alt='wine bottle' />         
              </div>

              <TitleSizePrice className="dp-card-title-size-price" title={title} size={size} price={price} />
          </article>

          <aside className="dp-details-container">  {/* product details */}

            <div className="dp-details-container-title-size">
              <div className="dp-title">{title}</div>
              <div className="dp-size">{size}</div>
            </div>
            <details open>
              <summary className="dp-details-summary">Details</summary>
              <div className="dp-description">{product.description}</div>
              <div className="dp-table">
                <SPTableRow label="Brand" text={product.brand} />
                <SPTableRow label="State/Country" text={product.bigregion} />
                <SPTableRow label="Wine Type" text={product.type} />
                <SPTableRow label="Varietal" text={product.varietal} />
                <SPTableRow label="Style" text={product.style} />
                <SPTableRow label="ABV" text={product.abv} />
                <SPTableRow label="Taste" text={product.taste} />
                <SPTableRow label="Body" text={product.body} />
                <SPTableRow label="SKU" text={product.sku} />
              </div>
            </details>

            <details open>
              <summary>Producer Story</summary>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, earum?
            </details>

            <details open>
              <summary>Geography</summary>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem.
            </details>

          </aside>


          <aside className="dp-ship-container"> {/* shipping info and add to cart */}

            <div onChange={onChangeValue}>

                { /* whether to display this depends on screen size, so we give control to CSS through the class */}
                <div className = "dp-ship-container-title-size-price"> 
                  <div className="dp-title">{title}</div>
                  <div className="dp-size">{size}</div>
                  <div className="dp-price">$ {price}</div>
                </div>

                <div className = "dp-ship-container-price-only"> 
                  <div className="dp-price">$ {price}</div>
                </div>

              <RadioButtonArea props={radioPickup} />
              <RadioButtonArea props={radioDelivery} />
              <RadioButtonArea props={radioShipTo} />

            </div>

            {/* cart button in the ship info area  */}
            { !itemInCart && <button className='dp-cart-btn dp-cart-btn-ship-container' onClick={()=> addProduct(product)}>Add to Cart</button> }
            {  itemInCart && <button className='dp-cart-btn dp-cart-btn-ship-container' onClick={()=> increase(product)}>Add More</button> }

          </aside>

             {/* must put cart button in the main section for a fixed button */}
            { !itemInCart && <button className='dp-cart-btn dp-cart-btn-fixed' onClick={() => addProduct(product)}>Add to Cart</button> }
            {  itemInCart && <button className='dp-cart-btn dp-cart-btn-fixed' onClick={()=> increase(product)}>Add More</button> }

        </main>

        {/* <nav className="dp-nav">
          <a href="/">Red Wine</a>
          <a href="/">White Wine</a>
          <a href="/spirits">Spirits</a>
          <a href="/beer">Beer</a>
        </nav> */}

      </Layout> 

    );
}


const TitleSizePrice = ({className, title, size, price, displayPrice=true}) => {
  return (
    <div className = {className}> 
      <div className="dp-title">{title}</div>
      <div className="dp-size">{size}</div>
      {displayPrice && <div className="dp-price">$ {price}</div>}
    </div>
  );
}

const SPTableRow = ({ label, text }) => {
  return (
      <div className="dp-row">
        <div className="dp-col dp-col-label">{label}</div>
        <div className="dp-col">{text}</div>
      </div>
  );
};

const RadioButtonArea = ( { props} ) => {
  return (
    <div className="dp-radio-container">
    <div className="dp-radio-btn-container">
        <input className="dp-radio-btn" type="radio" value={props.buttonValue} name="pickupOrDelivery" />
    </div>
    <div className="dp-radio-label">
      <div className="dp-radio-label-line dp-radio-label-line-1">{props.line1}</div>
      <div className="dp-radio-label-line dp-radio-label-line-2">{props.line2}</div>
      <div className="dp-radio-label-line">{props.line3}</div>
      <div className="dp-radio-label-line">{props.line4}</div>
    </div>
    <div className="dp-radio-right">
      <button className="dp-radio-box-btn">
        {props.rightButtonText}
      </button>
    </div>
  </div> 
  );
}


export default withRouter(DetailPage);
