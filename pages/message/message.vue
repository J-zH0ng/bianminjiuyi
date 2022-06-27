<template>
	<view class="content">
		<u-empty v-if="!orderList.length" mode="order"></u-empty>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item, index) in orderList" :key="index">
				<image class="cu-avatar radius lg" :src="item.doctorinfo.photo"></image>
				<view class="content" style="width: 60%;"  @click="toChat(item._id)">
					<view class="text-black"><view class="text-cut">{{item.doctorinfo.name}}</view></view>
					<view class="text-gray text-sm flex" style="width: 100%;"> <view class="text-cut" style="width: 150px;">{{item.records[item.records.length-1].message ? item.records[item.records.length-1].message : item.info.symptom}}</view></view>
				</view>
				<view class="action" style="width: 40%;"  @click="toChat(item)">
					<view class="text-grey text-xs text-right">{{item.createtime}}</view>
					<view v-show="item.news" class="cu-tag round bg-red sm"></view>
				</view>
			</view>
		</view>
		<u-tabbar :value="tabName" @change="name => tabName = name" activeColor="#5e8860">
			<u-tabbar-item text="首页" name="index" icon="/static/tabIcon/home.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="医学科普" name="knowledge" icon="/static/tabIcon/news.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="消息" name="message" :icon="iconPath" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="/static/tabIcon/user.png" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabName: "message"
			};
		},
		computed: {
			iconPath() {
				if(this.tabName === "message") {
					return "/static/tabIcon/comment2-selected.png"
				}
				return "/static/tabIcon/comment2.png"
			},
			orderList(){
				return this.$store.getters['orders/getAllOrders']
			}
		},
		methods: {
			toTab(name) {
				uni.reLaunch({
					url: `../${name}/${name}`
				})
			},
			toChat(id) {
				this.$store.commit('orders/setReaded', id)
				this.$store.commit("orders/setIdToBeSearch", id)
				uni.navigateTo({
					url: `./chat`
				})
			}
		}
	}
</script>

<style lang="scss">
.content {

}
</style>
