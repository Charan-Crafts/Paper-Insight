import {createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api"
const initialState ={
    papers:[],
    loading:false,
    error:null,
    totalResults:0,
    limit:0,
    page:1
}

export const fetchPapers = createAsyncThunk("papers/fetchPapers",async(params,{rejectWithValue})=>{

    try {
        
        const response = await api.get("/papers/",{params},{withCredentials:true});

        return response.data;
    } catch (error) {
        let message= error.response.data.message || error.message;

        console.log(message);
        return rejectWithValue(message);
    }
})

const paperSlice = createSlice ({
    name:"papers",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder 
            .addCase(fetchPapers.pending,(state)=>{
                state.loading=true;
            })
            .addCase(fetchPapers.fulfilled,(state,action)=>{
                state.loading=false;
                console.log("Fetched papers:", action.payload);
                state.papers=action.payload.data;
                state.totalResults=action.payload.totalResults;
                state.limit=action.payload.limit;
                state.page=action.payload.page;  
            })
            .addCase(fetchPapers.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })
    }
})

export default paperSlice.reducer;