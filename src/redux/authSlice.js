import {createSlice} from '@reduxjs/toolkit'
const INIT_PROFILE = []
 
const authSlice = createSlice({
  name:'auths',
  initialState:INIT_PROFILE,
  reducers:{
    addProfile(state,action){
      state.push(action.payload)
    },
    clearProfile(state) {
        state.splice(0, state.length); // เคลียร์ค่าใน array ทั้งหมด
    },
  }
})

const {actions, reducer} = authSlice
export const {addProfile, clearProfile} = actions
export default reducer