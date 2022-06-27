<template>
	<view class="container margin-lr-sm">
		<view class="u-demo-block">
			<view class="text-lg text-bold align-center">填写问诊信息</view>
			<view class="u-demo-block__content">
				<u--form labelPosition="left" :model="model1" ref="form1">
					<u-form-item label="症状" prop="intro" borderBottom>
						<u--textarea placeholder="不低于12个字" v-model="model1.intro" count></u--textarea>
					</u-form-item>
					<u-form-item label="症状发生时间" prop="howlong" borderBottom>
						<u--textarea placeholder="请描述症状出现了多久了" v-model="model1.howlong" count></u--textarea>
					</u-form-item>
					<u-form-item label="问诊照片" prop="fileList1" borderBottom>
						<u-upload :fileList="model1.fileList1" @afterRead="afterRead" @delete="deletePic" name="1"
							:maxCount="1"></u-upload>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		onLoad(option) {
			this.doctorinfo.department = option.doctorDepartment
			this.doctorinfo.name = option.doctorName
			this.doctorinfo.openid = option.doctorOpenid
			this.doctorinfo.photo = option.doctorPhoto
			
			this.userinfo.avatar = this.$store.state.login.avatar
			this.userinfo.name = this.$store.state.login.realname
			this.userinfo.gender = this.$store.state.login.gender
			this.userinfo.openid = this.$store.state.login.openid
		},
		data() {
			return {
				model1: {
					intro: '',
					howlong: '',
					fileList1: []
				},
				rules: {
					intro: {
						type: 'string',
						min: 12,
						required: true,
						message: '不低于12个字',
						trigger: ['change', 'blur']
					},
					howlong: {
						type: 'string',
						min: 2,
						required: true,
						message: '请选择症状发生时间',
						trigger: ['change', 'blur']
					},
					fileList1: {
						type: 'array',
						required: false,
						message: '请上传一张照片',
						trigger: ['change', 'blur']
					},
				},
				doctorinfo: {
					openid: '',
					photo: '',
					name: '',
					department: ''
				},
				info: {
					symptom: '',
					symptom_time: '',
					picture: ''
				},
				userinfo: {
					openid: '',
					name: '',
					gender: '',
					avatar: ''
				}
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			submit() {
				this.$refs.form1.validate()
				.then(res => {
					// uni.$u.toast('校验通过')
					this.info.symptom = this.model1.intro
					this.info.symptom_time = this.model1.howlong
					this.$store.commit("orders/setNewOrder", {
						doctorinfo: this.doctorinfo,
						userinfo: this.userinfo,
						info: this.info
					})
					console.log(this.$store.state.orders.neworder);
					uni.navigateTo({
						url: './pay'
					})
				})
				.catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				this.model1.fileList1 = []
				this.model1.howlong = ''
				this.model1.intro = ''
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
			},
			// 删除图片
			deletePic(event) {
				
				this.model1.fileList1.splice(event.index, 1)
				this.info.picture = ''
				console.log('deletePic called');
				console.log(this.model1);
				console.log(this.info);
			},
			// 新增图片
			afterRead(event) {
				// console.log(event.file);
				this.model1.fileList1.push(event.file)
				this.info.picture = event.file.url
				
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				// let lists = [].concat(event.file)
				// let fileListLen = this[`fileList${event.name}`].length
				// lists.map((item) => {
				// 	this[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				// for (let i = 0; i < lists.length; i++) {
				// 	const result = await this.uploadFilePromise(lists[i].url)
				// 	let item = this[`fileList${event.name}`][fileListLen]
				// 	this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
				// 		status: 'success',
				// 		message: '',
				// 		url: result
				// 	}))
				// 	fileListLen++
				// }
			},
			// uploadFilePromise(url) {
			// 	return new Promise((resolve, reject) => {
					// let a = uni.uploadFile({
					// 	url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
					// 	filePath: url,
					// 	name: 'file',
					// 	formData: {
					// 		user: 'test'
					// 	},
					// 	success: (res) => {
					// 		setTimeout(() => {
					// 			resolve(res.data.data)
					// 		}, 1000)
					// 	}
					// });
					
			// 	})
			// },
		},
	}
</script>

<style lang="scss">

</style>
