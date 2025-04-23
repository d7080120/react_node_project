import { createSlice } from '@reduxjs/toolkit'
const i={
token:null,
userInfo:{}
}
const tokenSlice = createSlice({
    name: 'token',
    initialState: i,
    reducers: {
        setToken(state, action) {
            console.log(action.payload);
            state.token = action.payload
            
            console.log(state.token);
        },
        setUser(state, action) {
            console.log(action.payload);
            state.userInfo = action.payload
            
            console.log(state.token);
        },
        logOut(state, action) {
            state.token = null;
        }
    }
})

export const { setToken, logOut ,setUser} = tokenSlice.actions
export default tokenSlice.reducer