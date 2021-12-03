import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/home-page/home-page';
import ShoppingPage from './components/pages/shopping-page/shopping-page';
import DetailPage from './components/pages/detail-page/detail-page';
import CartPage from './components/pages/cart-page/cart-page';
import NotFound from './components/shared/not-found';

function App() {
  return (
    <div className="app">
      <BrowserRouter basename="/wine-shop">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/product/:id' component={DetailPage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/wine/category/:name' component={ShoppingPage} />
          <Route path='*' component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
