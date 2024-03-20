import {createSlice} from '@reduxjs/toolkit'

const initialeStateValue = {value : "primary"}

const colorSlice = createSlice({
    name: "color",
    initialState: initialeStateValue,
    reducers:{
        change: (state,action)=>{state.value=action.payload},
    }
})

export default colorSlice.reducer;
export const {change} = colorSlice.actions;