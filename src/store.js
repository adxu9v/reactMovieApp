import {createSlice, configureStore} from '@reduxjs/toolkit'

const data =  createSlice({
    name: 'a',
    initialState: '1',
    reducers: {
        getData(state,action){
            
        }
    }
})
export default configureStore({
    reducer: {
        data: data.actions
    }
})