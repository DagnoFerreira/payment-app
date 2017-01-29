import Vue from 'vue'
import Axios from 'axios'
import mitt from 'mitt'


/* HTTP Configs */
Vue.prototype.$http = Axios
Axios.defaults.baseURL = process.env.API_URL
Axios.defaults.headers.common['Content-Type'] = 'application/json';


/* Event Handler */
Vue.prototype.$events = mitt()
