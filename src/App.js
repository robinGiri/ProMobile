import './App.css';
import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import Default from './components/Default'
import Details from './components/Details'
import ProductList from './components/ProductList'


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/" component={ProductList} />
        <Route path="/cart" component={Cart} />
        <Route path="/details" component={Details} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
