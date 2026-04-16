import { createSlice,type PayloadAction } from "@reduxjs/toolkit"


type ChatState = {
  chats: any[]
  messages: any[]
  loading: boolean
  error: any
  currentChat: any
}

const initialState: ChatState = {
  chats: [],
  messages: [],
  loading: false,
  error: null,
  currentChat: null,
}

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<any[]>) => {
      state.chats = action.payload
    },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<any>) => {
      state.error = action.payload
    },
    setCurrentChat: (state, action: PayloadAction<any>) => {
      state.currentChat = action.payload
      if (!action.payload) {
        state.messages = []
      }
    },
    addchat: (state, action: PayloadAction<any>) => {
      state.chats = [action.payload, ...state.chats]
    },
    addmessage: (state, action: PayloadAction<any>) => {
      state.messages = [...state.messages, action.payload]
    },
    updateLastMessage: (state, action: PayloadAction<any>) => {
      if (state.messages.length > 0) {
        state.messages[state.messages.length - 1] = action.payload
      }
    },
  },
})

export const {
  setChats,
  setMessages,
  setLoading,
  setError,
  setCurrentChat,
  addchat,
  addmessage,
  updateLastMessage,
} = chatSlice.actions

export default chatSlice.reducer