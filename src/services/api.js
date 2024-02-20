import axios from 'axios'

export const api = axios.create({
    baseURL:'https://contactapp-fbcl.onrender.com',
    timeout:8*1000,
})