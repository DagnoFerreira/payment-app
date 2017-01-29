/* Third Party */
import Vue from 'vue'

/* App */
import './components'
import './config.js'
import App from './App'

/* eslint-disable no-new */
new Vue({
  name: 'root',
  el: '#app',
  render: mount => mount(App)
})
