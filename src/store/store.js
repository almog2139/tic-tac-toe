import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose ,combineReducers} from 'redux'



import {toyReducer} from './reducers/toyReducer.js';



const rootReducer = combineReducers({
    toyReducer,
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
