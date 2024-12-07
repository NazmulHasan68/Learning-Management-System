import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./routeReducer.js";
import { authApi } from "@/features/api/authApi.js";
import { courseApi } from "@/features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js"

export const appStore = configureStore({
  reducer: {
    auth: rootReducer, 
    [authApi.reducerPath]: authApi.reducer, // authApi state
    [courseApi.reducerPath]: courseApi.reducer, // Add courseApi state
    [purchaseApi.reducerPath] : purchaseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware), // Include middlewares for both APIs
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};

initializeApp();
