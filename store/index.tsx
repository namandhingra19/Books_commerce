import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productsstore'
const store=configureStore({
    reducer:{products:productReducer}
})

export default store;
export type RootState = ReturnType<typeof store.getState>