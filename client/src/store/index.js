import { createHistogram, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; 
import thunk from 'redux-thunk';
import rootReducer from "../reducer";

//me gusta más esta alternativa que la constante con "windows....."
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))