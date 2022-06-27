import Vue from 'vue'

export default {
	namespaced: true,
	state() {
		return {
			
			nickname: '', //用户端
			avatar: '',   //用户端
			openid: '',   //用户端&医生端
			
			realname: '', //用户端&医生端
			gender: '',   //用户端
			photo: '',    //医生端
			
			type: '' // doctor 或 user
		}
	},
	mutations: {
		setNickName(state, nickname){
			state.nickname = nickname
		},
		setAvatar(state, avatar){
			state.avatar = avatar
		},
		setRealName(state, realname){
			state.realname = realname
		},
		setGender(state, gender){
			state.gender = gender
		},
		setOpenid(state, openid){
			state.openid = openid
		},
		setPhoto(state, photo){
			state.photo = photo
		},
		setType(state, type){
			state.type = type
		}
	},
	getters: {},
	actions: {}
}