import './App.css';
import Header from './component/layout/Header/Header.js';
import {useState} from "react"
import {BrowserRouter as Router,Switch, Route} from "react-router-dom"
import WebFont from "webfontloader"
//import Route from "react-router-dom";
import React from "react";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js"; 
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js" ;
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import UserDashboard from "./component/User/Dashboard.js"
import UserNewProduct from"./component/User/NewProduct.js"
import UserProductList from"./component/User/ProductList.js"

function App() {
  const {isAuthenticated, user}= useSelector((state)=> state.user);

  //for getting stripe Api key 
  const [stripeApiKey, setStripeApiKey]= useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{

    WebFont.load({
      google:{
        families:["Roboto","Droid Sans", "Chilanka"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  
  }, [])



  return (

    <div className="App">
      <Router>
        <Header />

        {isAuthenticated && <UserOptions user={user}/>}
        {stripeApiKey && (
           <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute exact path="/process/payment" component={Payment}/>
 
            </Elements>

        )}

        
        {/* switch helps to render each page in one time */}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/product/:id" component={ProductDetails}/>
          <Route exact path="/products" component={Products}/>
          <Route  path="/products/:keyword" component={Products}/>
          <Route exact path="/search" component={Search}/>
          <ProtectedRoute exact path="/account" component={Profile}/>
          <ProtectedRoute exact path="/me/update" component={UpdateProfile}/>
          <ProtectedRoute exact path="/password/update" component={UpdatePassword}/>
          <Route exact path="/password/forgot" component={ForgotPassword}/>
          <Route exact path="/password/reset/:token" component={ResetPassword}/>

          <Route exact path="/login" component={LoginSignUp}/>
          <Route exact path="/cart" component={Cart}/>
          <ProtectedRoute exact path="/shipping" component={Shipping}/>
        

        
          <ProtectedRoute exact path="/success" component={OrderSuccess}/>
          <ProtectedRoute exact path="/orders" component={MyOrders}/>
            <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder}/>
            <ProtectedRoute exact path="/order/:id" component={OrderDetails}/>
            <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard}/>
          <ProtectedRoute  exact path="/admin/products" component={ProductList}/>
          <ProtectedRoute  exact path="/admin/product" component={NewProduct}/>
          <ProtectedRoute  exact path="/admin/product/:id" component={UpdateProduct}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/orders" component={OrderList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/order/:id" component={ProcessOrder}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/users" component={UsersList}/>
          <ProtectedRoute isAdmin={true} exact path="/admin/user/:id" component={UpdateUser}/>
  
          <ProtectedRoute isAdmin={true} exact path="/admin/reviews" component={ProductReviews}/>
          

          <ProtectedRoute  exact path="/user/dash" component={UserDashboard}/>
          <ProtectedRoute  exact path="/user/product" component={UserNewProduct}/>
          <ProtectedRoute  exact path="/user/products" component={UserProductList}/>
       

        </Switch>
       

        {/* <Footer/> */}


      </Router>

       
      <main>
         {/* Giving path to pages */}
         
            {/* <Route path="*" element={<Navigate to="/"/>}/> */}
            
            {/* <Route path="product/:id" element={<ProductDetails/>}/> */}
                

            {/* <Route path="/"  element={<ProductDetails/>}/> */}
            
           
         
          

      </main>
       
  
     
   
        
    </div>

   
    
    
    
  );
  
}

export default App;
