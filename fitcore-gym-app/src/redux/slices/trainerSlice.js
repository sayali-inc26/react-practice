import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    trainers: []
};

const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {

        setTrainers: (state, action) => {
            state.trainers = action.payload;
        },

        addTrainer: (state, action) => {
            state.trainers.push(action.payload);
        },

        removeTrainer: (state, action) => {
            state.trainers = state.trainers.filter(
                (trainer) => trainer.id !== action.payload
            );
        }
    }
});

export const {setTrainers, addTrainer,removeTrainer} = trainerSlice.actions;

export default trainerSlice.reducer;
