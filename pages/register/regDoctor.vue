<template>
	<view class="container">
		<view class="header flex justify-between align-center margin-top-xs margin-lr-sm">
			<view class="">
				<view class="fs-28 text-bold padding-tb-sm">
					{{doctorInfo.name}}
				</view>
				<view class="flex align-center padding-bottom-sm">
					<tag :content-text="rank" class="margin-right"></tag>
					<view class="fs-24 color-7f7f7f">{{doctorInfo.title.split(' ')[0]}}</view>
				</view>
				<view class="flex justify-between align-center fs-24">
					<u-icon name="star-fill" color="#5e8860"></u-icon>
					<view class="color-theme margin-right-sm">{{doctorInfo.point}}</view>
					<view class="">{{doctorInfo.hospital}}</view>
				</view>
			</view>
			<view class="padding-sm">
				<u-avatar size="120rpx" :src="doctorInfo.photo"></u-avatar>
			</view>
		</view>
		<!-- <view class="tag-box margin-lr-sm flex align-center margin-xs" style="width: fit-content;">
			<u-tag :text="doctorInfo.description.goodat.split('、')[0]" plain size="mini" color="#5e8860" borderColor="#5e8860"></u-tag>
			<view class="fs-24 color-7f7f7f margin-left-lg">
				<text>粉丝</text>
				<text class="text-bold margin-left-sm">19</text>
			</view>
			<view class="fs-24 color-7f7f7f margin-left-lg">
				<text>服务</text>
				<text class="text-bold margin-left-sm">{{doctorInfo.accepts}}</text>
			</view>
		</view> -->
		<u-divider></u-divider>
		<view class="margin-lr-sm text-bold fs-32 color-7f7f7f">
			个人简介
		</view>
		<u-divider></u-divider>
		<view class="content margin-lr-sm" style="height: calc(100vh - 600rpx);">
			<view class="text-bold margin-bottom-xs">擅长领域</view>
			<view class="fs-26 margin-bottom-xs">
				{{doctorInfo.description.goodat}}
			</view>
			<view class="text-bold margin-bottom-xs">职业经历</view>
			<view class="fs-26 margin-bottom-xs">
				{{doctorInfo.description.history}}
			</view>
		</view>
		<button class="bt-guahao" @click="guahao">去挂号</button>
	</view>
</template>
<script>
	import add_appointment from "@/utils/remote_data_service/add_appointment.js";
	export default {
		data() {
			return {
				doctorInfo : {},
				rank: "",
				weekday: 0
			};
		},
		onLoad(options) {
			// console.log(options);
			this.weekday = parseInt(options.week, 10)
			let that = this
			uni.getStorage({
				key: 'doctorInfo',
				success: function(res) {
					that.doctorInfo = res.data
				}
			})
			uni.getStorage({
				key: 'hospitalInfo',
				success: function(res) {
					that.rank = that.switchRank(res.data.rank)
				}
			})
		},
		methods: {
			switchRank(rank) {
				switch(rank) {
					case 10:
						return "三级甲等"
						break;
					case 9:
						return "三级乙等"
						break;
					case 8:
						return "三级丙等"
						break;
					case 7:
						return "三级特等"
						break;
					case 6:
						return "二级甲等"
						break;
					case 5:
						return "二级乙等"
						break;
					case 4:
						return "二级丙等"
						break;
					case 3:
						return "一级甲等"
						break;
					case 2:
						return "一级乙等"
						break;
					case 1:
						return "一级丙等"
						break;
					default:
						break;
				}
			},
			guahao() {
				add_appointment(wx.getStorageSync("openid"), this.doctorInfo._id, this.doctorInfo.shift, this.weekday)
				.then(res => {
					wx.showToast({
						title: res.info,
						mask: true,
						complete() {
							setTimeout(()=>{
								uni.navigateBack({
									delta:4
								})
							},1500)
						}
					})
				}).catch(res => {
					wx.showToast({
						title: res.result,
						mask: true
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.container {
	.bt-guahao {
		width: 312rpx;
		background-color: #5e8860;
		color: #fff;
		font-weight: bold;
	}
}
</style>
