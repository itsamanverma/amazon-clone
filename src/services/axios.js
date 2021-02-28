import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-9b0b1/us-central1/api'
})

export default instance;