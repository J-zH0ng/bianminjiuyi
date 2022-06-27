<template>
	<view class="container">
		<view class="margin-lr-sm">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item uni-column">
					<view class="title text-lg">性别</view>
					<radio-group name="gender">
						<label class="align-center">
							<radio value="男" /><text>男</text>
						</label>
						<label class="margin-left-sm align-center">
							<radio value="女" /><text>女</text>
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title text-lg">姓名</view>
					<input class="uni-input margin-tb-xs" name="realname" placeholder="请输入姓名" />
				</view>
				<view class="uni-btn-v">
					<button form-type="submit">提交</button>
					<button type="default" form-type="reset">重置</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				realname: "",
				gender: ""
			};
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				wx.cloud.callFunction({
					name: "login_user",
					data: {
						name: formdata.realname,
						gender: formdata.gender
					}
				})
				.then(res => {
					uni.showModal({
						content: res.result.info,
						showCancel: false
					});
					function ss(){
						wx.setStorageSync("realname", formdata.realname)
						wx.setStorageSync("gender", formdata.gender)
						uni.navigateBack()
					}
					setTimeout(ss, 2000)
				})
				.catch(res => {
					console.log(res);
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		}
	}
</script>

<style lang="scss">
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>