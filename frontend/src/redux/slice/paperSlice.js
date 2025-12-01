import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api"
import { act } from "react";
// Safely read recent papers from localStorage (browser only)
const loadRecentPapers = () => {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem("recentPapers");
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const initialState = {
    papers: [],
    loading: false,
    error: null,
    totalResults: 0,
    limit: 0,
    page: 1,
    savedPapers: [],
    recentPapers: loadRecentPapers()
}

export const fetchPapers = createAsyncThunk("papers/fetchPapers", async (params, { rejectWithValue }) => {

    try {

        const response = await api.get("/papers/", { params }, { withCredentials: true });

        return response.data;
    } catch (error) {
        let message = error.response.data.message || error.message;

        console.log(message);
        return rejectWithValue(message);
    }
})

export const savePaper = createAsyncThunk("papers/savePaper", async (paperData, { rejectWithValue }) => {

    try {

        const response = await api.post("/papers/save", paperData, { withCredentials: true });

        return response.data;

    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message || error.message;
        return rejectWithValue(message);
    }
})

export const getSavedPapers = createAsyncThunk("papers/getSaved", async (id, { rejectWithValue }) => {

    try {

        const response = await api.get(`/papers/savedpapersByUserId/${id}`, { withCredentials: true })

        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message;
        return rejectWithValue(message)
    }
})

export const removeSavedPaper = createAsyncThunk("papers/removeSaved", async (paperId, { rejectWithValue }) => {

    try {

        const response = await api.delete("/papers/remove", {
            data: { paperId },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        let message = error.response.data.message || error.message;
        return rejectWithValue(message)
    }
})

const paperSlice = createSlice({
    name: "papers",
    initialState,
    reducers: {
        addRecentPaper: (state, action) => {
            const paper = action.payload;
            if (!paper) return;

            // Use a stable identifier for comparison
            const id =
                paper.id ||
                paper.paperId ||
                paper._id;

            if (!id) return;

            const existing = state.recentPapers || [];

            // Remove any existing entry with the same id
            const filtered = existing.filter(
                (p) =>
                    p.id !== id &&
                    p.paperId !== id &&
                    p._id !== id
            );

            // Put this paper at the front and keep only the latest 10
            const updated = [{ ...paper }, ...filtered].slice(0, 10);

            state.recentPapers = updated;

            // Persist to localStorage (ignore errors)
            try {
                if (typeof window !== "undefined") {
                    window.localStorage.setItem("recentPapers", JSON.stringify(updated));
                }
            } catch {
                // ignore localStorage errors
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch the papers
            .addCase(fetchPapers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPapers.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("Fetched papers:", action.payload);
                state.papers = action.payload.data;
                state.totalResults = action.payload.totalResults;
                state.limit = action.payload.limit;
                state.page = action.payload.page;
            })
            .addCase(fetchPapers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Save the papers
            .addCase(savePaper.pending, (state) => {
                state.loading = true;

            })
            .addCase(savePaper.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                // Push the newly saved paper into the array without overwriting it
                state.savedPapers.push(action.payload.data);
            })
            .addCase(savePaper.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get the saved papers

            .addCase(getSavedPapers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSavedPapers.fulfilled, (state, action) => {
                state.loading = false;
                // console.log("Saved papers fetched in slice:", action.payload);
                state.savedPapers = action.payload.data;

            })
            .addCase(getSavedPapers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove saved paper
            .addCase(removeSavedPaper.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeSavedPaper.fulfilled, (state, action) => {
                state.loading = false;
                const deleted = action.payload?.data;
                if (!deleted?._id) return;
                state.savedPapers = (state.savedPapers || []).filter(
                    (p) => p._id !== deleted._id
                );
            })
            .addCase(removeSavedPaper.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
})

export const { addRecentPaper } = paperSlice.actions;

export default paperSlice.reducer;