import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// connection to BE service
import authService from "./authService";


// Once data transferred get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = {
    user: user ? user : null,
    profile: null,
    users: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    userImg: '',
    usersImgs: [],
    friends: []
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


// Add user avatar
export const uploadAvatar = createAsyncThunk('auth/upload', async(data, thunkAPI) => {
    try {
    return await authService.upload(data);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
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


// Fetch images for users
export const fetchImages = createAsyncThunk('auth/images', async(user, thunkAPI) => {
    try {
        return await authService.getImage(user);
        } catch(error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
});

// Get User, user's info and user's image
export const fetchUser = createAsyncThunk('auth/user', async(id, thunkAPI) => {
    try {
        const token = (thunkAPI.getState().authReducer.user.token);
        return await authService.getUser(id,token);

    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get friends of user
export const fetchUserFriends = createAsyncThunk('auth/friends', async(id, thunkAPI) => {
    try {
        const token = (thunkAPI.getState().authReducer.user.token);
        return await authService.getFriends(id,token);

    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all users
export const fetchUsers = createAsyncThunk('auth/users', async(_, thunkAPI) => {
    try {
        const token = (thunkAPI.getState().authReducer.user.token);
        return await authService.getUsers(token);

    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});


// Log out user
export const logoutAction = createAsyncThunk('auth/logout', async(_, thunkAPI) => {
    try {
        const token = (thunkAPI.getState().authReducer.user.token);
        return await authService.logout(token);
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
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
    .addCase(fetchUserFriends.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(fetchUserFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
    })
    .addCase(fetchUserFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.friends = [];
        state.message = action.payload;
    })
    .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.profile = null;
        state.message = action.payload;
    })
    .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.users = [];
        state.message = action.payload;
    })
    .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userImg = action.payload;
    })
    .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userImg = null;
        state.message = action.payload;
    })
    .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
    });
}
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;