import {createSlice} from "@reduxjs/toolkit";

export  const authSlice=createSlice({
    name:"auth",
    initialState:()=>{
        const token=localStorage.getItem('token');
        if(!token){
            return{
                isLogged:false,
                token:null,
                user:null,
                expirationTime:0
            }
        }
        return{
            isLogged:true,
            token,
            user:JSON.stringify(localStorage.getItem('user')),
            expirationTime:+localStorage.getItem('expirationTime')
        }

    },
    reducers:{
        login(state,action){
            state.isLogged=true;
            state.token=action.payload.token;
            state.user=action.payload.user;

            const curretTime=Date.now();
            const timeout=1000*60*60*24*7;
           // const timeout=10000;

            state.expirationTime=curretTime+timeout;
            localStorage.setItem('token',state.token);
            localStorage.setItem('user',JSON.stringify(state.user));
            localStorage.setItem('expirationTime',state.expirationTime+"");
        },
        logout(state,action){
            state.isLogged=false;
            state.token=null;
            state.user=null;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }
})

export const {login,logout}=authSlice.actions;
