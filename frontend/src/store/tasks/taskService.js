import axios from "axios";

const API_URL = '/api/tasks';


const createTask = async(taskData, token) => {
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

const response = await axios.post(API_URL, taskData, config); 
return response.data;
};

// Get all tickets
const getTasks = async(token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
const response = await axios.get(API_URL,config);  
return response.data;
};


// Get single task
const getTask = async(taskId, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
const response = await axios.get(API_URL + '/' + taskId,config);  
return response.data;
};

// Delete Task
const deleteTask = async(taskId, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
const response = await axios.delete(API_URL + '/' + taskId,config);  
return response.data;
};


// Close single task
const closeTask = async(taskId, token) => {
  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};
const response = await axios.put(API_URL + '/' + taskId, {status: 'Done' }, config);  
return response.data;
};

const taskService = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  closeTask 
}

export default taskService;