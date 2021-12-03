import { createContext, useState } from 'react';
import SHOP_DATA from '../db/data';

export const ProductsContext = createContext();


// initialize the products list with the JSON data.  
const ProductsContextProvider = (props) => {    
  const [products] = useState(SHOP_DATA);
  return (
    <ProductsContext.Provider value={{ products }}>
      {
        props.children
      }
    </ProductsContext.Provider>
  );
}

export default ProductsContextProvider;