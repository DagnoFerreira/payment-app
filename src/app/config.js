import Vue from 'vue'
import Axios from 'axios'
import mitt from 'mitt'


/* HTTP Configs */
Vue.prototype.$http = Axios
Axios.defaults.baseURL = process.env.API_URL


/* Event Handler */
Vue.prototype.$events = mitt()
