import {createSlice} from '@reduxjs/toolkit';

const initialeStateValue = {value : {userName:"Username"}};

const UserSlice = createSlice({
    name: "User",
    initialState: initialeStateValue,
    reducers:{
        login: (state,action)=>{state.value=action.payload},
        logout: (state)=>{state.value=initialeStateValue.value},
    }
})

export default UserSlice.reducer;
export const {login,logout} = UserSlice.actions;