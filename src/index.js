import React from 'react';
import ReactDOM from 'react-dom';
import './index.less'
import Router from './router';
import {createBrowserHistory} from "history";
import ServiceWorker from './registerServiceWorker'
const customHistory = createBrowserHistory();


ReactDOM.render(
  <Router history={customHistory}/>,
  document.getElementById('root')
);
