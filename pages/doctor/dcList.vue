<template>
	<view class="container">
		<view class="align-center padding text margin-lr-sm bg-white margin-top solids-bottom text-bold fs-32 margin-bottom-sm">
			{{depart}}
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item " v-for="(item, index) in doctorList" :key="index">
				<image class="cu-avatar lg" mode="scaleToFill" :src="item.photo" width="50px" height="50px" shape="circle"></image>
				<view class="content">
					<view class="fs-28 text-bold flex align-center justify-between">
						{{item.name}}
					</view>
					<view class="eval-box flex justify-between align-center fs-24">
						<view class="flex justify-between align-center" style="width: 100rpx;">
							<u-icon name="star-fill" color="#5e8860"></u-icon>
							<view class="color-theme" >{{item.point}}</view>
						</view>
						<view class="color-7f7f7f text-cut" style="width: 50px;">{{item.title}}</view>
						<view class="color-7f7f7f margin-left-lg">接诊量</view>
						<view class="color-7f7f7f margin-right-lg">{{item.accepts}}</view>
					</view>
					<view class="tag-box margin-top-xs">
						<!-- <u-tag :text="item.description.goodat" plain size="mini" style="width: 100px;" color="#5e8860" borderColor="#5e8860" class="text-cut"></u-tag> -->
						<view class="text-bold text-cut" style="width: 200px;"> {{item.description.goodat}}</view>
					</view>
				</view>
				<view class="action" @click="toDoctorInfo(item)">
					<tag content-text="咨询"></tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				depart: "",
				doctorList: []
			};
		},
		methods: {
			toDoctorInfo(doctor) {
				uni.navigateTo({
					url: `./doctorInfo?openid=${doctor.openid}&goodat=${doctor.description.goodat}&point=${doctor.point}&history=${doctor.description.history}&photo=${doctor.photo}&hospital=${doctor.hospital}&name=${doctor.name}&title=${doctor.title}&accepts=${doctor.accepts}&department=${this.depart}`
				})
			}
		},
		onLoad(option) {
			this.depart = option.depart
			wx.cloud.callFunction({
				name: 'get_doctors_accessible',
				data: {
					department: this.depart
				}
			})
			.then(res => {
				for(var doc of res.result.list){
					this.doctorList.push(doc)
				}
			})
		}
	}
</script>

<style lang="scss">
.container {
	.cu-list {
		.cu-item {
			height: 220rpx;
			.cu-avatar {
				border-radius: 50%;
				border: 1rpx solid #a3a3a3;
			}
			.content {
				.tag-box {
					width: fit-content;
				}
			}
		}
	}
}
</style>
