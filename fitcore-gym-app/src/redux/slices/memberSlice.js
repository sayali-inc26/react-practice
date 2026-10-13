import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    members: []
};

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.members.push(action.payload);
        },

        removeMember: (state, action) => {
            state.members = state.members.filter(
                (member) => member.id !== action.payload
            );
        }
    }
});

export const {addMember, removeMember} = memberSlice.actions;

export default memberSlice.reducer;