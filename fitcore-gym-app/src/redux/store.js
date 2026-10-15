import { configureStore } from "@reduxjs/toolkit";

import memberReducer from "./slices/memberSlice";
import planReducer from "./slices/planSlice"
import trainerReducer from "./slices/trainerSlice"

const store = configureStore({
    reducer:{
        member:memberReducer,
        plan: planReducer,
        trainer: trainerReducer

    }
});

export default store;