import { useContext, useState, useRef } from 'react';
import { ProductsContext } from '../../../context/products-context';
import Layout from "../../layout/layout";
import ProductCard from './product-card';
import { WINE_NAMES } from "../../../db/data.js";
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

    // refs for uncontrolled components (min and max price should not cause a re-render)
    const refMin = useRef(null);
    const refMax = useRef(null);

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
    const [priceSubmit, setPriceSubmit] = useState(false);
    const [size375, setSize375] = useState(false);
    const [size750, setSize750] = useState(false);
    const [size1500, setSize1500] = useState(false);
    const [size3000, setSize3000] = useState(false);
    const [count, setCount] = useState(0);  // force re-render

    function clearPriceCheckboxes() {
      setPrice0to10(false);
      setPrice10to20(false);
      setPrice20to30(false);
      setPrice30to50(false);
      setPriceOver50(false);
    }

    function clearRange() {
      refMin.current.value=0;
      refMax.current.value=0;
      setPriceSubmit(false);
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
    const handleSize375 = () => setSize375(!size375);
    const handleSize750 = () => setSize750(!size750);
    const handleSize1500 = () => setSize1500(!size1500);
    const handleSize3000 = () => setSize3000(!size3000);

    const handlePriceSubmit = (e) => {
      setPriceSubmit(true);
      clearPriceCheckboxes();
      e.preventDefault();
      setCount(count + 1);  // re-render
    }

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

      // when we clear a bigregion filter, it probably makes sense to clear all of the subregion filters.
      if (!e.target.checked) 
        setRegionActiveFilters("");
    }

    const handleRegionActiveFilters = (e) => {
      let newValue = modifyFilterString(regionActiveFilters, e.target);
      setRegionActiveFilters(newValue);
    }

    // for now, hard-code the user's zip code
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
    
    if (!priceSubmit) {
      const noneSelected = !p0 && !p10 && !p20 && !p30 && !p50;
      const allSelected = p0 && p10 && p20 && p30 && p50;
      const someSelected = !noneSelected && !allSelected;

      if (someSelected)
        result = result.filter(byPrice);
    }

    // ========== custom price filter ==========================
    if (priceSubmit) {
      const [min, max] = [Number(refMin.current.value), Number(refMax.current.value)]; 
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
      //console.log("region active filters: ", regionActiveFilters)
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


                                                
    // ============ ***** DISPLAY LOGIC ****** ===========================
    
    // ========= use broad result to display region filters & counts ====================


    // helper function
    function generateCheckboxes(attribute) {
      let array = [];
      for (const elem of broadResult) {
        const item = array.find(x => x.name === elem[attribute]);
        if (!item)  
          array.push({name: elem[attribute], count: 1});
        else 
          item.count++;
      }
      return array;
    }
  
    // "checkboxes" is an array of objects of form {name: "bigregion", count: X}
    let checkboxes = generateCheckboxes("bigregion");
    const bigregionsToDisplay = [];  // array of JSX elements
    for (const item of checkboxes) {
      bigregionsToDisplay.push(<CheckboxWithCount  
                                    label={item.name} 
                                    name={item.name} 
                                    value={bigregionActiveFilters.includes(item.name)} 
                                    onChange={handleBigregionActiveFilters}
                                    count={item.count} 
                                    key={item.name} />);
    }

    // filter products by bigregion (eg, California) to decide which regions (eg, Napa, Sonoma) to display
    if (bigregionActiveFilters.length > 0)
      broadResult = broadResult.filter(prod => bigregionActiveFilters.includes(prod.bigregion));
    
    checkboxes = generateCheckboxes("region");
    const regionsToDisplay = [];
    for (const item of checkboxes) {
        regionsToDisplay.push(<CheckboxWithCount  
                                  label={item.name} 
                                  name={item.name}
                                  value={regionActiveFilters.includes(item.name)} 
                                  onChange={handleRegionActiveFilters}
                                  count={item.count} 
                                  key={item.name} />);
      }
  


    return (
      <Layout>     

        <div className="shopping-title">
          {displayName}
        </div>

        <div className="shopping-page-container"> 
          <nav className="filter-box">
           <div className="filter-section top2_filters">

              <h3 className="filter-title">Shopping Method</h3>
              <div>
                <Checkbox label="Pickup at: (Local Store)" value={pickupLocal} onChange={handlePickupLocal} />
                <Checkbox label="Pickup at: (All Stores)" value={pickupAll} onChange={handlePickupAll} />
                <Checkbox label="Deliver to: (Zip)" value={deliver} onChange={handleDeliver} />
                <Checkbox label="Ship to: (State)" value={shipTo} onChange={handleShipTo} />
              </div>

              <h3 className="filter-title">Product Availability</h3>
              <div>
                <Checkbox label="Include In-Store Purchases" value={inStoreOnly} onChange={handleInStoreOnly} />
                <Checkbox label="Include Out of Stock Items" value={outOfStock} onChange={handleOutOfStock} />              
              </div>
           </div>  {/* top 2 filters */}

           <div className="filter-section">
             <h3 className="filter-title">Price Range</h3>
             <div className="price-range-wrapper">
              <form className="price-range-form" onSubmit={handlePriceSubmit}>
                    <input className="price-input" ref={refMin}></input>
                    <span className="price-input-to">to</span>
                    <input className="price-input" ref={refMax}></input>
                    <button className="price-button" type='submit'>Go</button>
              </form>
            </div>

            <div>
              <Checkbox label="Up to $10" value={p0} onChange={handlePrice0to10} />
              <Checkbox label="$10 to $20" value={p10} onChange={handlePrice10to20} />
              <Checkbox label="$20 to $30" value={p20} onChange={handlePrice20to30} />
              <Checkbox label="$30 to $50" value={p30} onChange={handlePrice30to50} />
              <Checkbox label="Over $50" value={p50} onChange={handlePriceOver50} />
            </div>
            
            <details open>
              <summary>
                Country / State
              </summary>
                {bigregionsToDisplay}
            </details>

            <details open>
              <summary>
                Regions
              </summary>
                {regionsToDisplay}
            </details>

            <details open>
              <summary>
                Size
              </summary>
              <Checkbox label="Standard 750 ml" value={size750} onChange={handleSize750} />
              <Checkbox label="Half Bottle 375 ml" value={size375} onChange={handleSize375} />
              <Checkbox label="Magnum 1.5 L" value={size1500} onChange={handleSize1500} />
              <Checkbox label="Large Format 3+ L" value={size3000} onChange={handleSize3000} />
            </details>

         </div>
        </nav>


          <div className="product-grid">
            { (result.length === 0)? "NO PRODUCTS": productsToDisplay}
          </div>
        
        </div>
      </Layout>
    );
}

const Checkbox = ({ label, value, onChange }) => {
  return (
    <div>
    <label className="lbl">
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
    </div>
  );
};

const CheckboxWithCount = ({ label, value, name, onChange, count }) => {
  return (
    <div>
    <label className="lbl">
      <input type="checkbox" checked={value} onChange={onChange} name={name} />
      {label} ({count})
    </label>
    </div>
  );
};


export default ShoppingPage;
