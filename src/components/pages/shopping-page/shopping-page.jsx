import { useContext, useState } from 'react';
import { ProductsContext } from '../../../context/products-context';
import Layout from "../../layout/layout";
import ProductCard from './product-card';
import { WINE_NAMES } from "../../../db/data.js";
import Modal from './modal/modal';
import ProductFilter from './product-filter';
import './shopping-page.css';

/*================= SHOPPING PAGE=====================
 * 
 * This page displays bottles of wine.
 * Left side: filter bar.  
 * Right side: product grid. 
 * 
 * The filtering state is held in this component (at least, for now).
 * To separate into a lower level component would require more advanced state management. 
 * There are two levels of filtering.
 * Broad filter is based on wine type and is used to calculate the filter counts. 
 * Narrow filter is the product grid. 
*******************************************************/

const ShoppingPage = (props) => {
  
    const { name } = props.match.params;
    const displayName = WINE_NAMES[0][name.replaceAll("-", "")];

    // for the filter modal
    const [show, setShow] = useState(false);

    // states and handlers for controlled components
    const [pickupLocal, setPickupLocal] = useState(true);
    const [pickupAll, setPickupAll] = useState(false);
    const [deliver, setDeliver] = useState(false);
    const [shipTo, setShipTo] = useState(false);
    const [inStoreOnly, setInStoreOnly] = useState(true);
    const [outOfStock, setOutOfStock] = useState(true);
    const [p0, setPrice0to10] = useState(false);
    const [p10, setPrice10to20] = useState(false);
    const [p20, setPrice20to30] = useState(false);
    const [p30, setPrice30to50] = useState(false);
    const [p50, setPriceOver50] = useState(false);
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [size375, setSize375] = useState(false);
    const [size750, setSize750] = useState(false);
    const [size1500, setSize1500] = useState(false);
    const [size3000, setSize3000] = useState(false);
    // const [count, setCount] = useState(0);  // force re-render

    function clearPriceCheckboxes() {
      setPrice0to10(false);
      setPrice10to20(false);
      setPrice20to30(false);
      setPrice30to50(false);
      setPriceOver50(false);
    }

    function clearRange() {
      setPriceMin("");
      setPriceMax("");
    }

    const handlePickupLocal = () => { setPickupLocal(!pickupLocal); setPickupAll(false); }
    const handlePickupAll = () => { setPickupAll(!pickupAll); setPickupLocal(false); }
    const handleDeliver = () => setDeliver(!deliver);
    const handleShipTo = () => setShipTo(!shipTo);
    const handleInStoreOnly = () => setInStoreOnly(!inStoreOnly);
    const handleOutOfStock = () => setOutOfStock(!outOfStock);
    const handlePrice0to10 = () => {setPrice0to10(!p0); clearRange();}
    const handlePrice10to20 = () => {setPrice10to20(!p10);  clearRange();}
    const handlePrice20to30 = () => {setPrice20to30(!p20);  clearRange();}
    const handlePrice30to50 = () => {setPrice30to50(!p30); clearRange();}
    const handlePriceOver50 = () => {setPriceOver50(!p50); clearRange();}
    const handlePriceMin = (e) => {setPriceMin(e.target.value); clearPriceCheckboxes();}
    const handlePriceMax = (e) => {setPriceMax(e.target.value); clearPriceCheckboxes();}   
    const handleSize375 = () => setSize375(!size375);
    const handleSize750 = () => setSize750(!size750);
    const handleSize1500 = () => setSize1500(!size1500);
    const handleSize3000 = () => setSize3000(!size3000);

    // states and handlers for bigregion (state/country) and regional filters.   
    //   - if we store these lists as strings rather than arrays, React can easily detect the state change, 
    //     so we avoid the need to either spread the array or hack a re-render. 
    const [bigregionActiveFilters, setBigregionActiveFilters] = useState("");
    const [regionActiveFilters, setRegionActiveFilters] = useState("");
    
    // helper function
    const modifyFilterString = (str, target) => {
      if (target.checked) 
        return str.concat(target.name);
      return str.replace(target.name, "");
    }

    const handleBigregionActiveFilters = (e) => {
      let newValue = modifyFilterString(bigregionActiveFilters, e.target);
      setBigregionActiveFilters(newValue);

      // when clearing a bigregion filter, it probably makes sense to clear all of the subregion filters.
      if (!e.target.checked) 
        setRegionActiveFilters("");
    }

    const handleRegionActiveFilters = (e) => {
      let newValue = modifyFilterString(regionActiveFilters, e.target);
      setRegionActiveFilters(newValue);
    }

    /* bundle the values for passing to the filter component */
    const values = {  pickupLocal, pickupAll, deliver, shipTo, 
      inStoreOnly, outOfStock,
      p0, p10, p20, p30, p50,
      priceMin, priceMax,
      size375, size750, size1500, size3000,
      regionActiveFilters, bigregionActiveFilters,
    }
    
    /* bundle the handlers */
    const handlers = {  handlePickupLocal, handlePickupAll, handleDeliver, handleShipTo, 
      handleInStoreOnly, handleOutOfStock,
      handlePrice0to10, handlePrice10to20, handlePrice20to30, handlePrice30to50, handlePriceOver50,
      handlePriceMin, handlePriceMax,
      handleSize375, handleSize750, handleSize1500, handleSize3000,
      handleRegionActiveFilters, handleBigregionActiveFilters,
    }


    // for now, hard-code the user's state
    const userState = 'AZ';

    // ========= category filter (varietal) =========
    const { products } = useContext(ProductsContext);
    let broadResult = products.filter( (product) => (product.varietal === name));

    // copy the broad result to a new array so that we can continue filtering without losing 
    // access to the broad result, which we will use for filter counting. 
    let result = [...broadResult];

    // ========== apply price filter checkboxes ==========================
    // if no filters or all filters are selected, there is no need to filter. 
    // otherwise, combine results of all filters. 

    function byPrice(prod) {  //callback fn() for filter
      if (prod.price < 10 && p0) return true;
      if (prod.price >= 10 && prod.price < 20 && p10) return true;
      if (prod.price >= 20 && prod.price < 30 && p20) return true;
      if (prod.price >= 30 && prod.price < 50 && p30) return true;
      if (prod.price >= 50 && p50) return true;
      return false;
    }

    // if the custom price filter is not being used, use the price checkboxes
    if (priceMin === "" && priceMax === "") {
      const noneSelected = !p0 && !p10 && !p20 && !p30 && !p50;
      const allSelected = p0 && p10 && p20 && p30 && p50;
      const someSelected = !noneSelected && !allSelected;

      if (someSelected)
        result = result.filter(byPrice);
    }
    else {
      const [min, max] = [Number(priceMin), Number(priceMax)]; 
      if (min < max) {
        // console.log("before filter: result count", result.length);
        result = result.filter(p => (p.price >= min && p.price <= max));
      }
    }
    
    // ========= pickup/deliver/ship filters =========
    // Pickup options seem to have two effects:  whether the product appears on the grid,
    // and the text on the product card.
    // Delivery & ShipTo only affect the text on the product card. 
    // for the product card, these options are passed as props to the FeaturedProduct component. 
    if (pickupLocal)
      result = result.filter( (product) => (product.inventoryLocal > 0));
    if (pickupAll)
      result = result.filter( (product) => (product.inventoryAll > 0));
    

    // ========= product availability filters =========
    if (!inStoreOnly)
      result = result.filter( (product) => (product.inStoreOnly === false));
    if (!outOfStock)
      result = result.filter( (product) => (product.inventoryAll !== 0));

    // ============ apply bigregion (state/country) filters ============
    if (bigregionActiveFilters.length > 0) {
      result = result.filter(prod => bigregionActiveFilters.includes(prod.bigregion));
    }

    // ============= apply regional filters ========================
    if (regionActiveFilters.length > 0) {
      result = result.filter(prod => regionActiveFilters.includes(prod.region));
    }

    // ============= apply bottle size filters ============
    function byBottleSize(prod) {
      if (prod.size === "375ml" && size375) return true;
      if (prod.size === "750ml" && size750) return true;
      if (prod.size === "1.5L" && size1500) return true;
      if (prod.size === "3L" && size3000) return true;
      return false;
    }
    if (size375 || size750 || size1500 || size3000)
      result = result.filter(byBottleSize);
    
    
    // =========== sort, then display =====================
    result.sort( (p1, p2) => p1.price - p2.price);

    const productsToDisplay = result.map(product => 
                              (<ProductCard     product={product}
                                                pickupLocal={pickupLocal}
                                                pickupAll={pickupAll}
                                                deliver={deliver}
                                                shipTo={shipTo}
                                                userState={userState}
                                                key={product.id}
                                                />));


    // this is merely for the purpose of DRY, since we use this component twice
    const filterToDisplay = <ProductFilter  values={values} 
                                            handlers = {handlers}
                                            numResults = {result.length}
                                            broadResult={broadResult}/>


    const modalClose = "Show " + result.length + " results";

    return (
      <Layout>

        <div className="shopping-title-wrapper">
          <div className="shopping-title">
            {displayName}
          </div>
          <div className="num-results">
            Displaying all {result.length} results
          </div>
          <div className="filter-btn-wrapper">
            <button className='filter-btn' onClick={() => setShow(true)}>
              Filters
            </button>
          </div>
          <Modal  title="Filters"
                  closeButtonText= {modalClose}
                  onClose={() => setShow(false)} 
                  show={show}>
            {filterToDisplay}
          </Modal>
        </div>

        <div className="shopping-page-container"> 
          <nav className="filter-box">
          <ProductFilter  values={values} 
                                            handlers = {handlers}
                                            numResults = {-1}
                                            broadResult={broadResult}/>
                                                   </nav>

          <div className="product-grid">
            { (result.length === 0)? "NO PRODUCTS": productsToDisplay}
          </div>
        
        </div>
      </Layout>
    );
}

export default ShoppingPage;