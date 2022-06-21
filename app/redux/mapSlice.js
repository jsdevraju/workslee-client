import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobId:"",
}

export const mapSlice = createSlice({
    name:"map",
    initialState,
    reducers:{
        onHover:(state, {payload}) =>{
            return { ...state, jobId:payload}
        }
    }
})

export const { onHover } = mapSlice.actions;
export default mapSlice.reducer;