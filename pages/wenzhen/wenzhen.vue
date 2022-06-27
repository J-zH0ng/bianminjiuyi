<template>
	<view class="content">
		<u-sticky bgColor="#fff">
			<view class="flex justify-around">
				<u-tabs :list="tabsList" lineColor="#5e8860" lineWidth='120rpx' :itemStyle="{
					height: '90rpx',
				}" :inactiveStyle="{
					color: 'gray'
				}" :activeStyle="{
					fontWeight: 'bold',
					color: '#5e8860'
				}" @change="changeTabs" :current="currentIndex"></u-tabs>
			</view>
		</u-sticky>
		<view v-if="currentIndex===0">
			<u-empty v-if="!orderList.length" mode="order"></u-empty>
			<view class="cu-list menu-avatar">
				<view class="cu-item" v-for="(item, index) in orderList" :key="index" @click="toChat(item._id)">
					<image class="cu-avatar radius lg" :src="item.userinfo.avatar"></image>
					<view class="content" style="width: 60%;">
						<view class="text-black"><view class="text-cut">{{item.userinfo.name}}</view></view>
						<view class="text-gray text-sm flex" style="width: 100%;"> <view class="text-cut" style="width: 150px;">{{item.records[item.records.length-1].message ? item.records[item.records.length-1].message : item.info.symptom}}</view></view>
					</view>
					<view class="action" style="width: 40%;">
						<view class="text-grey text-xs text-right">{{item.createtime}}</view>
						<view v-show="item.news" class="cu-tag round bg-red sm"></view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="currentIndex===1" class="flex justify-center align-center flex-wrap">
			<u-empty mode="order"></u-empty>
			<text style="margin: 100px;" class="text-bold text-lg text-gray">开发中，敬请期待</text>
		</view>
		<view v-if="currentIndex===2" class="flex justify-center align-center flex-wrap">
			<u-empty mode="order"></u-empty>
			<text style="margin: 100px;" class="text-bold text-lg text-gray">开发中，敬请期待</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabsList: [{
						name: "图文消息",
					},
					{
						name: "电话消息"
					},
					{
						name: "视频消息"
					}
				],
				currentIndex: 0
			};
		},
		computed: {
			orderList(){
				return this.$store.getters['orders/getAllOrders']
			}
		},
		methods: {
			changeTabs(e) {
				this.currentIndex = e.index
			},
			toChat(id) {
				this.$store.commit('orders/setReaded', id)
				this.$store.commit("orders/setIdToBeSearch", id)
				uni.navigateTo({
					url: `../message/chatDoc`
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {}
</style>
