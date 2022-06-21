import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token:"",
    user:""
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state, {payload}) =>{
            return { ...state, token:payload?.token, userInfo:payload?.userInfo}
        }
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;