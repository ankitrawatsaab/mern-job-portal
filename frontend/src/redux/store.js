  import { configureStore, combineReducers } from "@reduxjs/toolkit";
  import authSlice from "./authSlice";
  import jobSlice from "./jobSlice";   
  import companySlice from "./companySlice";
  import applicationSlice from "./applicationSlice";
  import { motion } from "framer-motion";

  import storage from "redux-persist/lib/storage";
  import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

  const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company: companySlice,
    application : applicationSlice,
  });

  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "job", "company", "application"],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        
      }),
  });

  export const persistor = persistStore(store);

  export default store;
