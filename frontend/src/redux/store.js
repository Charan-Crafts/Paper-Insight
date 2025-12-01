import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";
import paperReducer from "./slice/paperSlice.js"
const store =configureStore({
    reducer:{
        auth:authReducer,
        papers:paperReducer
    },
    
})

export default store;