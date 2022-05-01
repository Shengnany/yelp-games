import axios from "axios";


 const gameAPI = axios.create({
   baseURL: "http://localhost:8000/",
    withCredentials: true,
});


gameAPI.defaults.withCredentials = true;


export default gameAPI;