import axios from 'axios';

const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    if(response.data)
    {

    localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};


// Log in user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data)
    {
        let imageUrl = await getImage(response.data.avatar);
        response.data.imageUrl = imageUrl;
    
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
    };  

// Logout user
const logout = async(token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + 'logout',config);  
  localStorage.removeItem('user');
  return response.data;
  };


  const upload = async(data) => {
    await axios.post(API_URL + "upload", data);
    return 'Image Uploaded!';
  };

  const getImage = async(data) => {
    const res = await axios.get('/images/' + data, {responseType: 'blob'})
        
        let imageUrl = URL.createObjectURL(res.data);
        return imageUrl;
  };

  const getUser = async(id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + id,config);  
    if(response.data)
    {
        let imageUrl = await getImage(response.data.avatar);
        response.data.imageUrl = imageUrl;
        return response.data;
    }
  };


  const getFriends = async(id, token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + 'friends/' + id,config);  
    if(response.data)
    {
        let responses = response.data;
        for(let i=0; i<responses.length; i++) {
            responses[i].imageUrl = await getImage(responses[i].profilePicture);
        }    
    }
    return response.data;
  };

  const getUsers = async(token) => {
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL,config);
    if(response.data)
    {
        return response.data;
    } 
  };



const authService = {
    register,
    login,
    logout,
    upload,
    getImage,
    getUser,
    getUsers,
    getFriends
}

export default authService;