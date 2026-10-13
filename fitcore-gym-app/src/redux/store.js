import { configureStore } from "@reduxjs/toolkit";

import memberReducer from "./slices/memberSlice";
import planReducer from "./slices/planSlice"

const store = configureStore({
    reducer:{
        member:memberReducer,
        plan: planReducer
    }
});

export default store;