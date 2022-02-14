import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// connection to BE service
import authService from "./authService";


// Once data transferred get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = {
user: user ? user : null,
isError: false,
isSuccess: false,
isLoading: false,
message: ''
};

// asynchronous actions

// Register new user
export const registerAction = createAsyncThunk('auth/register', async(userData, thunkAPI) => {
try {
return await authService.register(userData);
} catch(error) {
const message = (error.response && 
    error.response.data && 
    error.response.data.message) ||
    error.message ||
    error.toString();
    return thunkAPI.rejectWithValue(message);
}
});

// Log in user
export const loginAction = createAsyncThunk('auth/login', async(user, thunkAPI) => {
try {
return await authService.login(user);
} catch(error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
}
});


// Log out user
export const logoutAction = createAsyncThunk('auth/logout', async() => {
await authService.logout();
});

export const authSlice = createSlice({
name: 'authSlice',
initialState: initialAuthState,
reducers: {
    reset: (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = '';

    }
},
extraReducers: (builder) => {
builder
.addCase(registerAction.pending, (state) => {
state.isLoading = true;
})
.addCase(registerAction.fulfilled, (state, action) => {
state.isLoading = false;
state.isSuccess = true;
state.user = action.payload;    
})
.addCase(registerAction.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.user = null;
    state.message = action.payload;
})
.addCase(loginAction.pending, (state) => {
    state.isLoading = true;
})
.addCase(loginAction.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isSuccess = true;
    state.user = action.payload;
})
.addCase(loginAction.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.user = null;
    state.message = action.payload;
})
.addCase(logoutAction.fulfilled, (state) => {
    state.user = null;
});
}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;