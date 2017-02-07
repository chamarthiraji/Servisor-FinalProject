
// import React from 'react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import routes from './config/routes';
import Main from './Components/Main';

// Renders the contents according to the route page.
ReactDOM.render(routes, document.getElementById('app'));