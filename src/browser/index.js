import React from 'react';
import ReactDOM from  'react-dom';
//import Root from  './components/root';
import  './styles/report.css';
import Report from  './components/report';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers';
import {BrowserRouter as Router, Route,Link,Switch } from 'react-router-dom';
const store= createStore(allReducers);
ReactDOM.render(
        <Provider store={store}>
                <Router >
                        
                       
                     <Switch>
                        <Route exact={true}  path="/"  component={Report} />
                     </Switch>
                             
                </Router> 
        </Provider> ,
document.getElementById('wrapper')
);

