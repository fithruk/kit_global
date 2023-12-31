import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../RootReducer/RootReducer";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;

export { store };
