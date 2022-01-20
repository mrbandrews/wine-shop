import "./shopping-page.css";
/*
 * Filter component.
*/

const ProductFilter = ({values, handlers, broadResult}) => {
     
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
                                    value={values.bigregionActiveFilters.includes(item.name)} 
                                    onChange={handlers.handleBigregionActiveFilters}
                                    count={item.count} 
                                    key={item.name} />);
    }

    // filter products by bigregion (eg, California) to decide which regions (eg, Napa, Sonoma) to display
    if (values.bigregionActiveFilters.length > 0)
      broadResult = broadResult.filter(prod => values.bigregionActiveFilters.includes(prod.bigregion));
    
    checkboxes = generateCheckboxes("region");
    const regionsToDisplay = [];
    for (const item of checkboxes) {
        regionsToDisplay.push(<CheckboxWithCount  
                                  label={item.name} 
                                  name={item.name}
                                  value={values.regionActiveFilters.includes(item.name)} 
                                  onChange={handlers.handleRegionActiveFilters}
                                  count={item.count} 
                                  key={item.name} />);
      }

  return (
    <div>

      <div className="filter-section top2_filters">

        <h3 className="filter-title">Shopping Method</h3>
        <div>
          <Checkbox label="Pickup at: (Local Store)" value={values.pickupLocal} onChange={handlers.handlePickupLocal} />
          <Checkbox label="Pickup at: (All Stores)" value={values.pickupAll} onChange={handlers.handlePickupAll} />
          <Checkbox label="Deliver to: (Zip)" value={values.deliver} onChange={handlers.handleDeliver} /> 
          <Checkbox label="Ship to: (State)" value={values.shipTo} onChange={handlers.handleShipTo} />
        </div>

        <h3 className="filter-title">Product Availability</h3>
        <div>
          <Checkbox label="Include In-Store Purchases" value={values.inStoreOnly} onChange={handlers.handleInStoreOnly} />
          <Checkbox label="Include Out of Stock Items" value={values.outOfStock} onChange={handlers.handleOutOfStock} />              
        </div>
    </div>  {/* top 2 filters */}

    <div className="filter-section">


      <details>
        <summary>
          Price Range
        </summary>

        <div className="price-range-wrapper">
          <form className="price-range-form">
                <input className="price-input" value={values.priceMin} onChange={handlers.handlePriceMin}></input>
                <span className="price-input-to">to</span>
                <input className="price-input" value={values.priceMax} onChange={handlers.handlePriceMax}></input>
          </form>
        </div>

        <div>
          <Checkbox label="Up to $10" value={values.p0} onChange={handlers.handlePrice0to10} />
          <Checkbox label="$10 to $20" value={values.p10} onChange={handlers.handlePrice10to20} />
          <Checkbox label="$20 to $30" value={values.p20} onChange={handlers.handlePrice20to30} />
          <Checkbox label="$30 to $50" value={values.p30} onChange={handlers.handlePrice30to50} />
          <Checkbox label="Over $50" value={values.p50} onChange={handlers.handlePriceOver50} />
        </div>
      </details>

      <details>
        <summary>
          Country / State
        </summary>
          {bigregionsToDisplay}
      </details>

      <details>
        <summary>
          Regions
        </summary>
          {regionsToDisplay}
      </details>

      <details>
        <summary>
          Size
        </summary>
        <Checkbox label="Standard 750 ml" value={values.size750} onChange={handlers.handleSize750} />
        <Checkbox label="Half Bottle 375 ml" value={values.size375} onChange={handlers.handleSize375} />
        <Checkbox label="Magnum 1.5 L" value={values.size1500} onChange={handlers.handleSize1500} />
        <Checkbox label="Large Format 3+ L" value={values.size3000} onChange={handlers.handleSize3000} />
      </details>
    
     </div>

    </div>

    )
  };

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
  

export default ProductFilter;
