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

        updateHabit: (state, action) => {

            const updatedHabit = action.payload;

            const index = state.habits.findIndex(
                (habit) => habit.id === updatedHabit.id
            );

            if (index !== -1) {
                state.habits[index] = updatedHabit;
            }
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
    updateHabit,
    setLoading,
    setError
} = habitSlice.actions;

export default habitSlice.reducer;