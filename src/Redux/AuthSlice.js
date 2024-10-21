import { createSlice, createAsyncThunk } from 'reduxjs/toolkit'


const initialState = {
    msg: '',
    user: '',
    token: '',
    loading: false,
    error:'',
}

const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers:{
        
    }
})