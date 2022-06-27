<template>
	<view class="main container margin-lr-sm">
		<view class="jine margin-bottom-lg text-bold">3 元</view>
		<view class="margin-top-lg">为了方便演示暂时未开放支付</view>
		<view class="margin">点击<text class="text-red text-bold">确认</text>进入医生问诊页面</view>
		<view class="anniu">
			<button @click="addOrder" class="margin-right-lg" type="primary">确认</button>
			<button @click="navback">取消</button>
		</view>
		<u-overlay :show="showOverlay">
			<view class="flex justify-center" style="margin-top: 50%; padding: 50px;">
				<u-loading-icon text="下单中" color="#ededed" textColor="#ededed" textSize="18"></u-loading-icon>
			</view>
		</u-overlay>
	</view>
</template>

<script>
	import add_order from "@/utils/remote_data_service/add_order.js"
	export default {
		data() {
			return {
				newOrder: null,
				showOverlay: false
			}
		},
		methods: {
			navback(){
				uni.navigateBack()
			},
			addOrder(){
				this.showOverlay = true
				add_order(this.newOrder.doctorinfo, this.newOrder.userinfo, this.newOrder.info, this.newOrder.fee)
				.then(res => {
					console.log(res);
					wx.showToast({
						title: "下单成功",
						mask: true,
						success() {
							setTimeout(()=>{
								uni.navigateBack({
									delta: 5,
									complete() {
										uni.reLaunch({
											url: '../message/message'
										})
									}
								})
							},1500)
							
						}
					})
				})
				.catch(res => {
					this.showOverlay = false
					console.log(res);
					wx.showToast({
						title: "下单失败"
					})
				})
			}
		},
		created() {
			this.newOrder = this.$store.state.orders.neworder
		}
	}
</script>

<style>
	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.jine {
		margin-top: 100px;
		font-size: 2rem;
	}
	
	.anniu {
		margin-top: 150px;
		display: flex;
		justify-content: space-around;
	}
</style>
