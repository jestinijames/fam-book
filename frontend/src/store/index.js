import { configureStore } from "@reduxjs/toolkit";


import authSliceReducer from "./auth/authSlice";
import taskSliceReducer from "./tasks/taskSlice";
import noteSliceReducer from "./notes/noteSlice";


const store = configureStore({
reducer: {
authReducer: authSliceReducer,
taskReducer: taskSliceReducer,
noteReducer: noteSliceReducer
},


});

export default store;