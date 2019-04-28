import axios from 'axios'
import store from './store/store'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'bearer ' + localStorage.getItem('currentUser_token')
