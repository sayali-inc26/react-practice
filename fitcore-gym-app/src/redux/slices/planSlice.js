import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    plans:[]
};

const planSlice = createSlice({
    name:"plan",
    initialState,
    reducers:{

        setPlans: (state, action) => {
            state.plans = action.payload;
        },
        addPlan:(state,action)=>{
            state.plans.push(action.payload);
        },

        removePlan:(state, action)=>{
            state.plans = state.plans.filter(
                (plan)=> plan.id !== action.payload
            )

        }
    }
});

export const {setPlans, addPlan, removePlan} = planSlice.actions;

export default planSlice.reducer;