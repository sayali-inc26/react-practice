import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    members: []
};

const memberSlice = createSlice({
    name: "member",
    initialState,
    reducers: {
        setMembers: (state, action) => {
            state.members = action.payload;
        },
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

export const {setMembers,addMember, removeMember} = memberSlice.actions;

export default memberSlice.reducer;