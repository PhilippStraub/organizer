import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Login from './Login';
import {NavItemsHome, Template, ContentHome} from './home';
import {NavItemsDozenten, ContentSmallDozenten, ContentDozenten} from './dozenten';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

// Login
// ReactDOM.render(<Login />, document.getElementById('root'));

// Home
ReactDOM.render(<Template />, document.getElementById('root'));
ReactDOM.render(<NavItemsHome />, document.getElementById('navbarNav'));
ReactDOM.render(<ContentHome />, document.getElementById('anchor'));

// Dozenten
// ReactDOM.render(<Template />, document.getElementById('root'));
// ReactDOM.render(<NavItemsDozenten />, document.getElementById('navbarNav'));
// ReactDOM.render(<ContentDozenten />, document.getElementById('anchor'));








// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
