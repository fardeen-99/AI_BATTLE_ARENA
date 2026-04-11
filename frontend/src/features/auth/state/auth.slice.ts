import { createSlice ,type PayloadAction} from "@reduxjs/toolkit";

interface authtype{
    user:any|null,
    loading:boolean,
    error:any|null
}

const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:true,
        error:null
    }as authtype,
    reducers:{
        setuser:(state,action:PayloadAction<any>)=>{
            state.user=action.payload
        },
        setloading:(state,action:PayloadAction<boolean>)=>{
            state.loading=action.payload
        },
        seterror:(state,action:PayloadAction<string|null>)=>{
            state.error=action.payload
        }
    }
})

export const {setuser,setloading,seterror}=authSlice.actions
export default authSlice.reducer