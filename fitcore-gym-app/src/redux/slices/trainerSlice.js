import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    trainers:[]
}

const trainerSlice = createSlice({
    name:"trainer",
    initialState,
    reducers:{
        addTrainer:(state,action)=>{
            state.trainers.push(action.payload);
        },

        removeTrainer:(state,action)=>{
            state.trainers =state.trainers.filter(
                (trainer) => trainer.id !==action.payload
            );
        }
    }
});

export const {addTrainer,removeTrainer} = trainerSlice.actions;
export default trainerSlice.reducer;