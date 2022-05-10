import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import user from "./modules/user";
import main from "./modules/main";
import tracker from "./modules/tracker";
import feed from "./modules/feed";
import party from "./modules/party";
import mountain from "./modules/mountain";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: user,
  tracker: tracker,
  main: main,
  feed: feed,
  party: party,
  mountain: mountain,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
