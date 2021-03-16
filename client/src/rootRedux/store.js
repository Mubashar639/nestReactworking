import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Reducers } from "./combineReducer/CombineReducer";
import logger from "redux-logger";
let store = createStore(Reducers, compose(applyMiddleware(thunk, logger)));
export { store };
