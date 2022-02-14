import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// connection to BE servive
import taskService from "./taskService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialTaskState = {
tasks: [], // Multiple Tasks
task: {},  // Single
isError: false,
isSuccess: false,
isLoading: false,
message: ''
};


// Create Task for user
export const createTaskAction = createAsyncThunk('tasks/create',async(taskData, thunkAPI) =>{
    try {
        const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.
       return await taskService.createTask(taskData, token);
        } catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});

// Get all Tasks
export const getTasksAction = createAsyncThunk('tasks/getAll', async(_, thunkAPI) => { //we put an '_' because we still need access to thunkAPI
try {
    const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.
       return await taskService.getTasks(token);
} catch(error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});




// Get single Task
export const getTaskAction = createAsyncThunk('task/getOne', async(taskId, thunkAPI) => { //we put an '_' because we still need access to thunkAPI
    try {
        const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.
           return await taskService.getTask(taskId,token);
    } catch(error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
            }
    }); 



    // Complete Task
export const closeTaskAction = createAsyncThunk('task/close', async(taskId, thunkAPI) => { //we put an '_' because we still need access to thunkAPI
    try {
        const token = (thunkAPI.getState().authReducer.user.token);  //This comes from user returned in authreducer.
           return await taskService.closeTask(taskId,token);
    } catch(error) {
            const message = (error.response && 
                error.response.data && 
                error.response.data.message) ||
                error.message ||
                error.toString();
                return thunkAPI.rejectWithValue(message);
            }
    }); 

export const taskSlice = createSlice({
name: 'taskSlice',
initialState: initialTaskState,
reducers: {
    reset: (state) => initialTaskState
},
extraReducers: (builder) => {
builder
.addCase(createTaskAction.pending, (state) => {
state.isLoading = true;    
})
.addCase(createTaskAction.fulfilled, (state) => {
state.isLoading = false;
state.isSuccess = true;
})
.addCase(createTaskAction.rejected, (state,action) => {
    state.isLoading = false;
    state.isSuccess = false;
    state.isError = true;
    state.message = action.payload; 
})
.addCase(getTasksAction.pending, (state) => {
    state.isLoading = true;    
})
.addCase(getTasksAction.fulfilled, (state,action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.tasks = action.payload;
})
.addCase(getTasksAction.rejected, (state,action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload; 
})
.addCase(getTaskAction.pending, (state) => {
    state.isLoading = true;    
})
.addCase(getTaskAction.fulfilled, (state,action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.task = action.payload;
})
.addCase(getTaskAction.rejected, (state,action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload; 
})
.addCase(closeTaskAction.fulfilled, (state,action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.tasks.map((task) => {
      return  task._id === action.payload._id 
        ? (task.status = 'Done') 
        : task
    });
})
}
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;

