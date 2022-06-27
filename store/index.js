import Vue from 'vue'
import Vuex from 'vuex'
import tabbar from './tab.js'
import orders from './orders.js'
import login from './login.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		tabbar,
		orders,
		login
	}
})
export default store