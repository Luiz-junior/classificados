import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

import Routes from './routes';
import { Template } from './components/MainComponentes';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

const App = props => {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
      
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(mapStateToProps)(App);
