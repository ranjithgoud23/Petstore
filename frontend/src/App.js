import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import {useEffect} from 'react'
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home"
import ProductDetails from './components/product/ProductDetails'
// import { useParams } from 'react-router-dom';
import Login from './components/user/Login';
import Register from './components/user/register';
import store from './store'
import {loadUser} from './actions/userActions'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Products from './components/Products.js';
import Cart from './components/cart/Cart';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Shipping from './components/cart/Shipping';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrdersList';
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
// import ListReviews from './components/review/ListReviews';
import ProductReviews from './components/admin/ProductReviews';
import Support from './components/Support'
function App() {
  
  useEffect(() => {
    store.dispatch(loadUser())

  }, [])

  return (
    
    <Router>
      
      <div className="App">
        <Header/>
        <div className="container container-fluid">
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/products" element={<Products />}  />
          <Route path="/product/:id" element={<ProductDetails/>}  exact/>
          <Route path="/search/:keyword" element={<Products/>}  exact/>
          <Route path = "/login" element={<Login/>}/>
          <Route path = "/cart" element={<Cart/>}/>
          <Route path = "/shipping" element={<Shipping/>}/>
          <Route path = "/confirm" element={<ConfirmOrder/>}/>
          <Route path = "/success" element={<OrderSuccess/>}/>
          <Route path = "/register" element={<Register/>}/>
          <Route path = "/me" element={<Profile/>}/>
          <Route path = "/me/update" element={<UpdateProfile/>}/>
          <Route path = "/password/update" element={<UpdatePassword/>}/>
          <Route path = "/orders/me" element={<ListOrders/>}/>
          <Route path = "/order/:id" element={<OrderDetails/>}/>
          <Route path = "/support" element={<Support/>}/>
          
        </Routes>
        </div>
        <div>
          <Routes>
          <Route path = "/dashboard" element={<Dashboard/>}/>
          <Route path = "/admin/products" element={<ProductsList/>}/>
          <Route path = "/admin/product" element={<NewProduct/>}/>
          <Route path = "/admin/product/:id" element={<UpdateProduct/>}/>
             
          <Route path = "/admin/orders" element={<OrdersList/>}/>
          <Route path = "/admin/order/:id" element={<ProcessOrder/>}/>
          <Route path = "/admin/users" element={<UsersList/>}/>
          <Route path = "/admin/user/:id" element={<UpdateUser/>}/>
          <Route path = "/admin/reviews" element={<ProductReviews/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App; 
