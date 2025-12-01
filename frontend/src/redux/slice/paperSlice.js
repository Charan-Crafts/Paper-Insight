import {createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api"
import { act } from "react";
const initialState ={
    papers:[],
    loading:false,
    error:null,
    totalResults:0,
    limit:0,
    page:1,
    savedPapers:[]
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

export const savePaper = createAsyncThunk("papers/savePaper",async(paperData,{rejectWithValue})=>{

    try {

        const response = await api.post("/papers/save",paperData,{withCredentials:true});
        
        return response.data;
        
    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message || error.message;
        return rejectWithValue(message);
    }
})

export const getSavedPapers = createAsyncThunk("papers/getSaved",async(userId,{rejectWithValue})=>{

    try {
        
        const response = await api.get(`/papers/savedpapersByUserId/${id}`,{withCredentials:true})

        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message;
        return rejectWithValue(message)
    }
})

const paperSlice = createSlice ({
    name:"papers",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder 
            // Fetch the papers
            .addCase(fetchPapers.pending,(state)=>{
                state.loading=true;
            })
            .addCase(fetchPapers.fulfilled,(state,action)=>{
                state.loading=false;
                // console.log("Fetched papers:", action.payload);
                state.papers=action.payload.data;
                state.totalResults=action.payload.totalResults;
                state.limit=action.payload.limit;
                state.page=action.payload.page;  
            })
            .addCase(fetchPapers.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            })

            // Save the papers
            .addCase(savePaper.pending,(state)=>{
                state.loading=true;
                
            })
            .addCase(savePaper.fulfilled,(state,action)=>{
                state.loading = false;
                console.log(action.payload)
                state.savedPapers = state.savedPapers.push(action.payload.data)
            })
            .addCase(savePaper.rejected,(state,action)=>{   
                state.loading = false;
                state.error = action.payload;
            })

            // Get the saved papers
            

    }
})

export default paperSlice.reducer;