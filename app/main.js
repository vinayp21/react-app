import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Login from '../components/login';
import Post from '../components/post';
import { Router, Route, Redirect,  hashHistory} from 'react-router';
window.React=React
ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/home" component={App} />
		<Route path="/" component={Login} />
	</Router>, document.getElementById('app'));
//ReactDOM.render(<Post />, document.getElementById('post'));