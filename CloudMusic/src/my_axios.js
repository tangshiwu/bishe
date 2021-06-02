import axios from 'axios'
let instance = axios.create({
  baseURL:'',
  timeout:2000
})
export default instance
