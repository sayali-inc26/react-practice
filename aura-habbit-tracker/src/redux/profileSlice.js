import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "Alex Rivera",
    email: "alex.rivera@aura.io",

    premium: true,

    notifications: {
        dailyReminders: true,
        streakMilestones: true,
        weeklySummary: false
    },

    reminders: {
        sound: "Aura Bloom (Default)",
        style: "Gentle Nudge"
    },

    appearance: {
        theme: "AURA DARK"
    }
};


const profileSlice = createSlice({

    name: "profile",

    initialState,

    reducers: {

        changeNotification: (state, action) => {

            const { name, value } = action.payload;

            state.notifications[name] = value;
        },


        changeReminderStyle: (state, action) => {

            state.reminders.style = action.payload;
        },


        changeSound: (state, action) => {

            state.reminders.sound = action.payload;
        },


        updateProfile: (state, action) => {

            state.name = action.payload.name;
            state.email = action.payload.email;
        },


        logout: (state) => {

            console.log("User logged out");
        }

    }

});


export const {
    changeNotification,
    changeReminderStyle,
    changeSound,
    updateProfile,
    logout

} = profileSlice.actions;


export default profileSlice.reducer;