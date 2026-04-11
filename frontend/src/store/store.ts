import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/state/auth.slice.js"
import chatReducer from "../features/chats/state/chat.slice.js"

export const store=configureStore({
    reducer:{
        auth:authReducer,
        chats:chatReducer,  
    }
})

export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch