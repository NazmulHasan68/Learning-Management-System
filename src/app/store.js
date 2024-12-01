
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./routeReducer.js";
import { authApi } from "@/features/api/authApi.js";

export const appStore = configureStore({
  reducer: {
    auth: rootReducer, 
    [authApi.reducerPath]: authApi.reducer, 
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware), 
});


const insitalizeApp = async() =>{
  await appStore.dispatch(authApi.endpoints.loadUser.initiate({}, {forceRefetch:true}))
}
insitalizeApp()