import { createSlice } from "@reduxjs/toolkit"

const BookReduser = createSlice({
    name: "Books",
    initialState: [],
    reducers: {
        booksStore( state , action ){
            state.push(action.payload);
        },
    }
})

export const { booksStore } = BookReduser.actions
export default BookReduser.reducer


  