import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import App from './App';
import rootReducer from "./reducers/index"
import * as serviceWorker from './serviceWorker';

const middlewares=[thunk];

function saveToLocalStorage(state){
    try{
        const serializedState=JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage(){
    try{
        const serializedState=localStorage.getItem('state')
        if(serializedState===null) return undefined
        return JSON.parse(serializedState)
    }catch(e){
        console.log(e);
        return undefined
    }
}

const persistedState=loadFromLocalStorage()
const store = createStore(
  rootReducer,
  persistedState,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(()=>saveToLocalStorage(store.getState()))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,document.getElementById('root') );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
