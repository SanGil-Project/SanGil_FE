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
import handle from "./modules/handle";
import chat from "./modules/chat";
import feedDetail from "./modules/feedDetail";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user,
  tracker,
  main,
  feed,
  party,
  mountain,
  handle,
  chat,
  feedDetail,
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
