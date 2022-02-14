import axios from "axios";

const API_URL = '/api/tasks/';

//Get all notes
const getNotes = async(taskId, token) => {
    const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  };
  const response = await axios.get(API_URL + taskId + '/notes',config);  
  return response.data;
  };

// Create Note  
  const createNote = async(taskId, noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }  
  };
  const response = await axios.post(API_URL + taskId + '/notes',noteData, config);
  return response.data;  
};

 const noteService = {
     createNote,
     getNotes
 }
 
 export default noteService;