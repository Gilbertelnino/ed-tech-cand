import _ from "lodash";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import { fetchSessionIgnoreList, REDUX_STORE_NAME } from "../utils/appConstants";
import { fetchSessionDataRequest } from "../reducers/auth/session.reducer";
import { useHistory } from "react-router";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: REDUX_STORE_NAME,
  storage,
  whitelist: ["session"]
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types for serializer
      ignoredActions: ["persist/PERSIST"]
    }
  }).concat([
    sagaMiddleware,
  ]),
  devTools: true,
});

export const persistor = persistStore(store, null, () => {

  // Fetch session user data
  const storeData = store.getState();

  // Fetch session data on load when ignore path failed
  if ((_.get(storeData, "session.token", null)) && (!fetchSessionIgnoreList.includes(window.location.pathname))) {
    store.dispatch(fetchSessionDataRequest())
  }

});

sagaMiddleware.run(rootSaga);

export default store;
