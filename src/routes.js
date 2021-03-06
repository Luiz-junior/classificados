import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';

export default () => {
  return (
    <Switch>
      <RouteHandler path="/" exact> <Home /> </RouteHandler>
      <RouteHandler path="/about"> <About /> </RouteHandler>
      <RouteHandler path="/login"> <Login /> </RouteHandler>
      <RouteHandler path="/signup"> <Signup /> </RouteHandler>
      <RouteHandler path="/ad/:id"> <AdPage /> </RouteHandler>
      <RouteHandler path="/post-an-ad" private> <AddAd /> </RouteHandler>
      <RouteHandler path="/ads"> <Ads /> </RouteHandler>
      <RouteHandler> <NotFound /> </RouteHandler>
    </Switch>
  )
};