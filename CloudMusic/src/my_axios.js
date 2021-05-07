import axios from 'axios'
let instance = axios.create({
  baseURL:'/api',
  timeout:1000
})
export default instance
