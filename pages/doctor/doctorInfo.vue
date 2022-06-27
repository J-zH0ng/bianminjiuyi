<template>
	<view class="container">
		<u-toast ref="uToast"></u-toast>
		<view class="header flex justify-between align-center margin-top-xs margin-lr-sm">
			<view class="">
				<view class="fs-28 text-bold padding-tb-sm">
					{{name}}
				</view>
				<view class="flex align-center padding-bottom-sm">
					<view class="fs-24 color-7f7f7f text-cut" style="width: 200px;">{{title}}</view>
				</view>
				<view class="flex justify-start align-center fs-24">
					<u-icon name="star-fill" color="#5e8860"></u-icon>
					<view class="color-theme margin-right-sm">{{point}}</view>
					<view class="">{{hospital}}</view>
				</view>
			</view>
			<view class="flex flex-direction align-center padding-sm">
				<u-avatar size="120rpx" :src="photo"></u-avatar>
				<view class="margin-top-sm"></view>
			</view>
		</view>
		<view class="tag-box margin-lr-sm flex align-center margin-bottom-xs" style="width: fit-content;">
			<view class="text-cut text-gray" style="width: 250px;">{{goodat}}</view>
			<view class="fs-24 color-7f7f7f margin-left-sm">
				<text>共服务</text>
				<text class="text-bold margin-left-sm">{{accepts}}</text>
			</view>
		</view>
		<view class="solid shadow bg-white margin padding">
			{{history}}
		</view>
		<u-cell-group>
			<u-cell icon="play-right-fill" isLink @click="toShipin">
				<view class="color-theme margin-left-xs text-bold" slot="title">视频问诊</view>
			</u-cell>
			<u-cell icon="phone-fill" isLink @click="toDianhua">
				<view class="color-theme margin-left-xs text-bold" slot="title">电话问诊</view>
			</u-cell>
			<u-cell icon="photo-fill" isLink @click="toTuwen">
				<view class="color-theme margin-left-xs text-bold" slot="title">图文问诊</view>
			</u-cell>
		</u-cell-group>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				name: '',
				openid: '',
				photo: '',
				department: '',
				goodat: '',
				point: '',
				history: '',
				hospital: '',
				title: '',
				accepts: ''
			};
		},
		methods: {
			toTuwen() {
				uni.navigateTo({
					url: `./tuwen?doctorName=${this.name}&doctorOpenid=${this.openid}&doctorPhoto=${this.photo}&doctorDepartment=${this.department}`
				})
			},
			toShipin(){
				this.$refs.uToast.show({
					message: "开发中，敬请期待"
				})
			},
			toDianhua(){
				this.$refs.uToast.show({
					message: "开发中，敬请期待"
				})
			}
		},
		onLoad(option) {
			this.name = option.name
			this.openid = option.openid
			this.photo = option.photo
			this.department = option.department
			this.goodat = option.goodat
			this.point = option.point
			this.history = option.history
			this.hospital = option.hospital
			this.title = option.title
			this.accepts = option.accepts
		}
	}
</script>

<style lang="scss">
.container {
	
}
</style>
