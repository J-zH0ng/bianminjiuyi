<template>
	<view class="container">
		<u-empty v-if="showempty" mode="list"></u-empty>
		<view class="cu-list menu-avatar margin-lr">
			<view class="cu-item margin-tb" v-for="(item, index) in appointList" :key="index">
				<image v-if="type==='user'" class="cu-avatar lg" :src="item.doctorinfo.photo"></image>
				<view v-else class="cu-avatar lg bg-gradual-green text-bold">{{item.patientinfo.name.slice(0,1)}}</view>
				<view class="content">
					<view v-if="type==='user'" class="fs-28 text-bold">{{item.doctorinfo.name}}&nbsp{{item.doctorinfo.department}}&nbsp{{item.doctorinfo.hospital}}</view>
					<view v-else class="fs-28 text-bold">{{item.patientinfo.name}}&nbsp{{item.patientinfo.gender}}</view>
					<view class="fs-24 text-gray">
						<text>预约时间：</text>
						<text>{{`${item.time.getMonth()+1}-${item.time.getDate()} `}}&nbsp;{{item.period}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {setProp} from "@/utils/deep_vue_set.js"
	export default {
		data() {
			return {
				curPage: 1,
				appointList: [],
				type: '',
				showempty: false
			};
		},
		onLoad(e) {
			console.log(e);
			this.type = e.type //doctor / user
			uni.setNavigationBarTitle({
				title: "挂号记录"
			})
			uni.showLoading({
				title: "加载中..."
			})
			wx.cloud.callFunction({
				name: `get_appointments_by_${this.type}openid`,
				data: {
					limit: 10,
					page: 1
				}
			}).then(res => {
				for(var i=0; i<res.result.list.length; i++){
					var appoint = res.result.list[i]
					console.log(appoint);
					this.appointList.push(appoint)
					for(var prop in appoint){
						if(prop==='time'){
							this.appointList[i].time = new Date(appoint.time)
						}else{
							// setProp(this.appointList, [`${i}`, prop], appoint[prop])
						}
					}
				}
				if(this.appointList.length === 0){
					this.showempty = true
				}
				console.log(this.appointList);
				uni.hideLoading()
			}).catch(res => {
				uni.hideLoading()
				uni.showToast({
					title: "获取失败！"
				})
			})
		},
		onReachBottom() {
			this.curPage += 1
			wx.cloud.callFunction({
				name: "get_appointments_by_useropenid",
				data: {
					limit: 10,
					page: this.curPage
				}
			}).then(res => {
				var curlength = this.appointList.length
				for(var i=0; i<res.result.list.length; i++){
					var appoint = res.result.list[i]
					console.log(appoint);
					for(var prop in appoint){
						if(prop==='time'){
							this.appointList[curlength+i].time = new Date(appoint.time)
						}else{
							setProp(this.appointList, [`${curlength+i}`, prop], appoint[prop])
						}
					}
				}
				if(res.result.list.length === 0){
					this.curPage-=1
					uni.showToast({
						title: '没有更多了',
						icon: "none",
						position:"bottom"
					})
				}
			}).catch(res => {
				uni.showToast({
					title: "获取失败！"
				})
				this.curPage -=1
			})
		}
	}
</script>

<style lang="scss">
.container {
	.cu-list {
		.cu-item {
			border: 1rpx solid #797979;
			border-radius: 16rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.4);
			.pay-box {
				width: 90rpx;
				height: 40rpx;
				border-radius: 12rpx;
				box-shadow: 4rpx 4rpx 2rpx 2rpx rgba(0, 0, 0, 0.4);
			}
		}
	}
}
</style>
