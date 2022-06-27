<template>
	<view class="container flex justify-around align-center">
		<view class="content margin-top padding bg-gradual-green">
			<image src="cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/imgs/医生.png" mode="widthFix" @click="toIndexDc"></image>
			<view class="text">我是医生</view>
		</view>
		<view class="content margin-top padding bg-gradual-green">
			<image src="cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/imgs/男职员.png" mode="widthFix" @click="toIndex"></image>
			<view class="text">我是用户</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.$store.commit("orders/setLoaded", false)
			console.log(this.$store.state.orders.loaded);
		},
		data() {
			return {
				
			};
		},
		methods: {
			identify(e) {
				uni.setStorage({
					key: "identity",
					data: e,
				})
			},
			toIndex() {
				var NEWORDER = "zyv5zY3MU2ct6czFzPOqhrRCmp_Xo5cj7QXSCRJYSvs"
				var RECEIVEREPLY = "kpErHNlaT3ihEhO0_cwNiXyGLzbC023rT0S0wy0gyrw"
				
				var requestSubMessage = wx.requestSubscribeMessage({
					tmplIds: [NEWORDER, RECEIVEREPLY]
				})
				.then(res => {
					for(var prop in res){
						if(res[prop] === 'reject'){
							return Promise.reject("auth fail")
						}
					}
					return Promise.resolve("auth success")
				})
				.catch(res => {
					return Promise.reject('auth fail')
				})
				
				
				
				//缓存里有注册信息
				var realname = wx.getStorageSync("realname")
				var gender = wx.getStorageSync('gender')
				var openid = ""
				
				var login = new Promise((resolve, reject) => {
					if(Boolean(gender)) { //用户端注册了
						console.log("用户端注册了");
						
						wx.getUserProfile({
							desc: "获取用户昵称头像"
						}).then(res => {
							var nickname = res.userInfo.nickName
							var avatar = res.userInfo.avatarUrl
							
							//设置vuex状态保存用户信息
							this.$store.commit('login/setNickName', nickname)
							this.$store.commit('login/setAvatar', avatar)
							this.$store.commit('login/setRealName', realname)
							this.$store.commit('login/setGender', gender)
							this.$store.commit('login/setType', 'user')
							wx.cloud.callFunction({
								name: "get_openid",
							}).then(res => {
								openid = res.result.openid
								this.$store.commit('login/setOpenid', openid)
								resolve("已注册并登录")
							})
						})
					}else{ //没有注册或缓存被清除
						console.log("没有注册或缓存被清除");
						uni.navigateTo({
							url: '../my/zhuce'
						})
						reject("没有注册或缓存被清除")
					}
				})
				
				Promise.all([requestSubMessage, login])
				.then(res => {
					console.log(res);
					uni.navigateTo({
						url: "/pages/index/index"
					})
				})
				.catch(res => {
					console.log(res);
				})
			},
			toIndexDc() {
				
				
				
				var NEWORDER = "zyv5zY3MU2ct6czFzPOqhrRCmp_Xo5cj7QXSCRJYSvs"
				var PATIENTINQUIRY = "RHaGJ_thvG46RQ1L6nMqnjJOFCyd-MXqd1mXv7rwkgQ"
				
				var requestSubMessage = wx.requestSubscribeMessage({
					tmplIds: [NEWORDER, PATIENTINQUIRY]
				})
				.then(res => {
					for(var prop in res){
						if(res[prop] === 'reject'){
							return Promise.reject("auth fail")
						}
					}
					return Promise.resolve("auth success")
				})
				.catch(res => {
					return Promise.reject("auth fail")
				})
				
				var realname = wx.getStorageSync("realname")
				var photo = wx.getStorageSync('photo')
				var openid = ""
				var login = new Promise((resolve, reject) => {
					
					if(Boolean(photo)) { //医生端注册了
						console.log("医生端注册了");
						//设置vuex状态保存医生信息
						this.$store.commit('login/setRealName', realname)
						this.$store.commit('login/setPhoto', photo)
						this.$store.commit('login/setType', 'doctor')
						wx.cloud.callFunction({
							name: "get_openid",
						}).then(res => {
							openid = res.result.openid
							this.$store.commit('login/setOpenid', openid)
							resolve("已注册并登录")
						})
					}else{ //没有注册或缓存被清除
						console.log("没有注册或缓存被清除");
						uni.navigateTo({
							url: '../my/zhuceDc'
						})
						reject("没有注册或缓存被清除")
					}
				})
				
				Promise.all([requestSubMessage, login])
				.then(res => {
					console.log(res);
					uni.navigateTo({
						url: "/pages/index/indexDc"
					})
				})
				.catch(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
	.content {
		width: 350rpx;
		border: 1rpx solid #7f7f7f;
		box-shadow: 0rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.4);
		.text {
			font-size: 40rpx;
			text-align: center;
		}
	}
}
</style>
