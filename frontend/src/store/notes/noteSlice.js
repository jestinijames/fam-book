import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";



const initialNoteState = {
notes: [],  // All Task Notes
note: {},  // Single note
isError: false,
isSuccess: false,
isLoading: false,
message: ''
};

// Async functions

// Get task notes for user
export const getNotesAction = createAsyncThunk(
'notes/getAll', async(taskId, thunkAPI) => {
try {
    const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.   
    return await noteService.getNotes(taskId, token);
} catch(error) {
    const message = (error.response && 
        error.response.data && 
        error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});



// Create Task note for user
export const createNoteAction = createAsyncThunk('note/create',async(noteData, thunkAPI) =>{
    try {
        const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.
       return await noteService.createNote(noteData.taskId, noteData, token);
        } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});

export const noteSlice = createSlice({
name: 'noteSlice',
initialState: initialNoteState,
reducers: {
    reset: (state) => initialNoteState
},
extraReducers: (builder) => {
    builder.addCase(getNotesAction.pending, (state) => {
        state.isLoading = true;    
    })
    .addCase(getNotesAction.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
    })
    .addCase(getNotesAction.rejected, (state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload; 
    })
    .addCase(createNoteAction.pending, (state) => {
        state.isLoading = true;    
        })
        .addCase(createNoteAction.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
        })
        .addCase(createNoteAction.rejected, (state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload; 
        })
}
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;



