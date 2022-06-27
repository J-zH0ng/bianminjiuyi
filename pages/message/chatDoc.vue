<template>
	<view>
		<cola
			:userId="openid"
			:dataKeys="dataKeys"
			:messageData="msgData"
			:isUseRead="true"
			:IDType="msgId"
			:moreFunction="moreFunction"
			:inputDisabled="this.order.solved"
			@sendMsg="send"
			@moreClick="clickMore"
		></cola>
	</view>
</template>

<script>
	import cola from "@/components/cola-u-chat/cola-u-chat.vue"
	import add_message from "@/utils/remote_data_service/add_message.js"
	export default {
		data() {
			return {
				openid: '',
				dataKeys: {
				    userId:'userId',
				    msgId:'msgId',
				    name:'name',
				    message:'message',
				    img:'img',
				    avator:'avator'
				},
				msgId: 'msgId',
				moreFunction: [
					{
						name:'照片',
						icon:'photo',
						img:'',
						iconsize: 60
					}
				]
			}
		},
		methods: {
			send(e) {
				if(this.order.solved){
					uni.showToast({
						title:"问诊已经结束",
						icon:"none"
					})
					return
				}
				console.log("--------------send--------------");
				var message = {
					userId: this.openid,
					msgId: `${Math.random().toFixed(4)*10000}`.slice(0,4),
					name: this.$store.state.login.realname,
					message: e,
					img: '',
					avator: this.$store.state.login.photo
				}
				var id = this.$store.state.orders.idToBeSearch
				add_message(message, id, this.openid, this.order.userinfo.openid, 'doctor')
				.then(res => {
					console.log(res);
				})
				.catch(res => {
					console.log(res);
				})
			},
			clickMore(e) {
				if(this.order.solved){
					uni.showToast({
						title:"问诊已经结束",
						icon:"none"
					})
					return
				}
				var _this = this
				if(e===0 && !this.order.solved){
					console.log('--------------clickMore-0-------------');
					wx.chooseImage({
						count: 1,
						sourceType: ['album', 'camera'],
						success (res) {
						// tempFilePath可以作为 img 标签的 src 属性显示图片
							console.log("success");
							var picture = res.tempFilePaths[0]
							console.log(picture);
							var now = new Date()
							var pictureid = ""
							new Promise((reso, reje) => {
								if(picture !== '' && picture !== undefined && picture !== null){
									wx.cloud.uploadFile({
										cloudPath: `chat/picture/${now.getTime()}-${_this.openid}`,
										filePath: picture,
										success(res) {
											console.log(res);
											pictureid = res.fileID
											reso()
										},
										fail(res) {
											console.log(res);
											reject(res)
										}
									})
								}else{
									reso()
								}
							})
							.then(res => {
								var message = {
									userId: _this.openid,
									msgId: `${Math.random().toFixed(4)*10000}`.slice(0,4),
									name: _this.$store.state.login.realname,
									message: '',
									img: pictureid,
									avator: _this.$store.state.login.photo
								}
								var id = _this.$store.state.orders.idToBeSearch
								return add_message(message, id, _this.openid, _this.order.userinfo.openid, 'doctor')
							})
							.then(res => {
								console.log(res);
							})
							.catch(res => {
								console.log(res);
							})
						},
						fail(res) {
							console.log(res);
						}
					})
				}
			}
		},
		computed: {
			order(){
				console.log("----------------order------------");
				console.log(this.$store.getters['orders/getOrder']);
				return this.$store.getters['orders/getOrder']
			},
			msgData(){
				var hismsgs = []
				for(var prop in this.order.info){
					if(prop === 'picture'){
						if(this.order.info.picture){
							hismsgs.push({
								userId: this.order.userinfo.openid,
								msgId: prop,
								name: this.order.userinfo.name,
								img: this.order.info.picture,
								avator: this.order.userinfo.avatar,
								message: ''
							})
						}
						
					}else{
						hismsgs.push({
							userId: this.order.userinfo.openid,
							msgId: prop,
							name: this.order.userinfo.name,
							message: this.order.info[prop],
							avator: this.order.userinfo.avatar
						})
					}
				}
				if(this.order.records!==undefined){
					for(var message of this.order.records){
						hismsgs.push(message)
					}
				}
				
				console.log("-------------msgData------------");
				console.log(hismsgs);
				return hismsgs
			}
		},
		beforeMount() {
			this.openid = this.$store.state.login.openid
		},
		components: {
			cola
		},
		beforeDestroy() {
			this.$store.commit('orders/setReaded', this.$store.state.orders.idToBeSearch)
		}
	}
</script>

<style>

</style>
