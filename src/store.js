import { configureStore,createSlice } from '@reduxjs/toolkit'

const movieData = createSlice({
    name : 'movieData',
    initialState : {}
})

export default configureStore({
  reducer: {movieData : movieData.reducer }
}) 