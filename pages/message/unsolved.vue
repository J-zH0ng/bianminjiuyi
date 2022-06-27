<template>
	<view class="content">
		<u-empty v-if="!orderList.length" mode="order"></u-empty>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item, index) in orderList" :key="index" @click="toChat(item._id)">
				<image class="cu-avatar radius lg" :src="item.doctorinfo.photo"></image>
				<view class="content" style="width: 60%;">
					<view class="text-black"><view class="text-cut">{{item.doctorinfo.name}}</view></view>
					<view class="text-gray text-sm flex" style="width: 100%;"> <view class="text-cut" style="width: 150px;">{{item.records[item.records.length-1].message ? item.records[item.records.length-1].message : item.info.symptom}}</view></view>
				</view>
				<view class="action" style="width: 40%;">
					<view class="text-grey text-xs text-right">{{item.createtime}}</view>
					<view v-show="item.news" class="cu-tag round bg-red sm"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			orderList(){
				return this.$store.getters['orders/getUnsolvedOrders']
			}
		},
		methods: {
			toChat(id) {
				this.$store.commit('orders/setReaded', id)
				this.$store.commit("orders/setIdToBeSearch", id)
				uni.navigateTo({
					url: `./chat?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
.content {

}
</style>
