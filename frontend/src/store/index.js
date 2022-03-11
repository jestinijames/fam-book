import { configureStore } from "@reduxjs/toolkit";


import authSliceReducer from "./auth/authSlice";



const store = configureStore({
reducer: {
authReducer: authSliceReducer,
},


});

export default store;