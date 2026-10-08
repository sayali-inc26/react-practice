import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goal: "",
    targetHabitCount: "",
    preferredReminderTime: "08:00"
};

const onboardingSlice = createSlice({
    name: "onboarding",

    initialState,

    reducers: {

        setGoal: (state, action) => {
            state.goal = action.payload;
        },

        setTargetHabitCount: (state, action) => {
            state.targetHabitCount = action.payload;
        },

        setPreferredReminderTime: (state, action) => {
            state.preferredReminderTime = action.payload;
        },

        clearOnboarding: (state) => {
            state.goal = "";
            state.targetHabitCount = "";
            state.preferredReminderTime = "08:00";
        }
    }
});

export const {
    setGoal,
    setTargetHabitCount,
    setPreferredReminderTime,
    clearOnboarding
} = onboardingSlice.actions;

export default onboardingSlice.reducer;