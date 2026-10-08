import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    habits: [],
    loading: false,
    error: null
};

const habitSlice = createSlice({
    name: "habits",

    initialState,

    reducers: {
        setHabits: (state, action) => {
            state.habits = action.payload;
        },

        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },

        removeHabit: (state, action) => {
            state.habits = state.habits.filter(
                (habit) => habit.id !== action.payload
            );
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {
    setHabits,
    addHabit,
    removeHabit,
    setLoading,
    setError
} = habitSlice.actions;

export default habitSlice.reducer;