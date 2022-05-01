import axios from "axios";


 const gameAPI = axios.create({
   baseURL: "https://blooming-garden-12683.herokuapp.com/",
    withCredentials: true,
});


gameAPI.defaults.withCredentials = true;


export default gameAPI;