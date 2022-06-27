import Vue from 'vue'
import tabBar from '@/utils/tabBar.js'
let userInfo = '1'
let type = 'patient'

if (userInfo != null) {
	switch(userInfo) {
		case '1':
			type = 'patient'
			break;
		case '2':
			type = 'doctor'
			break;
		default:
			break;
	}
}
export default {
	namespaced: true,
	state() {
		return {
			tabarList: tabBar[type]
		}
	},
	mutations: {
		setTabarList(state, list) {
			state.tabarList = list
		}
	},
	getters: {},
	actions: {}
}