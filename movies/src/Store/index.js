import {createSlice} from "@reduxjs/toolkit"

const userSclice = createSlice({
    name:"user",
    initialstate: {isLogegIn: true},
    reducers: {
        login(state){
            state.isLogegIn = true;
        },
        logout(state){
            state.isLogegIn = false;
        }

    }
});

const adminSlice = createSlice(
   {
      name:"auth",
      initialState : { isLogegIn : true},
      reducers : {
         login(state){
            state.isLogegIn = true;
         },
         logout(state){
            state.isLogegIn = false;
         }
      }
   } 
)
export const userActions = userSclice.actions;
export const adminActions = adminSlice.actions;
export const store = configureStore({
    reducer:{
       user: userSclice.reducer,
       admin: adminSlice.reducer,
    }
})