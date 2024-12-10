import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { combineReducers } from 'redux'
import transactionRecord from './transaction.record.reducer'
import { statsApi } from "@/app/api/staking/modulelist"

const rootReducer = combineReducers({
    stats: statsApi.reducer,
    transactionRecord: transactionRecord,
});

export const store = configureStore({
    reducer: rootReducer,
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
