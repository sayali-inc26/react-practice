import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "./profileSlice";
import onboardingReducer from "./onboardingSlice";
import habitReducer from "./habitSlice";



const store = configureStore({

    reducer: {

        profile: profileReducer,
        onboarding: onboardingReducer,
        habits: habitReducer

    }

});


export default store;