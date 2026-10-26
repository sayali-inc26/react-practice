import { configureStore } from "@reduxjs/toolkit";
import tripDetailsReducer from "./slices/tripDetails";

const store = configureStore({
    reducer: {
        tripDetails: tripDetailsReducer
    }
});

export default store;