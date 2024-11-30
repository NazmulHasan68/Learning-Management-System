
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./routeReducer.js";
import { authApi } from "@/features/api/authApi.js";

export const appStore = configureStore({
  reducer: {
    auth: rootReducer, // Combines your reducers
    [authApi.reducerPath]: authApi.reducer, // Adds the API slice reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware), // Includes RTK Query middleware
});
