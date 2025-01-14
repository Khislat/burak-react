import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './app/screens/homePage';
import ProductsPage from './app/screens/productsPage';
import OrdersPage from './app/screens/ordersPage';
import UserPage from './app/screens/userPage';
import HomeNavbar  from './app/components/headers/HomeNavbar';
import OtherNavbar from './app/components/headers/OtherNavbar';
import Footer from './app/components/footer';
import HelpPage from './app/screens/helpPage';
import './css/app.css';
import "./css/navbar.css"
import "./css/footer.css"

function App() {
  const location = useLocation();
  console.log("location:", location)
  return <>

  {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
  <Switch>
    <Route path="/products">
      <ProductsPage />
    </Route>
    <Route path="/orders">
      <OrdersPage />
    </Route>
    <Route path="/member-page">
      <UserPage />
    </Route>
    <Route path="/help">
      <HelpPage />
    </Route>
    <Route path="/">
      <HomePage />
    </Route>  
  </Switch>
  <Footer />
</>
}



export default App;
