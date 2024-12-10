import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { messageSlice } from "./slice/msgSlice"

export const store = configureStore({
  reducer: {
    message: messageSlice.reducer
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
