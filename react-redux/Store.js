import {configureStore} from "@reduxjs/toolkit"
import BookReducer from "./BookReducer";

export const myStore = configureStore({
    reducer: {
        book: BookReducer
    }
});
  