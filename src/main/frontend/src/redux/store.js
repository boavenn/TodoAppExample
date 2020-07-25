import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import httpMiddleware from "./middleware/httpMiddleware";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, httpMiddleware)
)

export default store;