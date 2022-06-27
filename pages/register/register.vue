<template>
	<view class="container">
		<view class="search-box padding-sm bg-theme flex justify-around align-center">
			<view class="flex align-center padding-lr-xs">
				<view @click="show = true" class="fs-28 color-fff margin-right-xs">{{curCity}}</view>
				<u-icon name="arrow-down" color="#e1e9e1"></u-icon>
			</view>
			<u-search placeholder="请输入搜索关键词" v-model="keyword" :showAction="false"></u-search>
		</view>
		<!-- 城市选择器 -->
		<u-picker :show="show" :columns="city" @cancel="show = false" @confirm="selectCity"></u-picker>
		<sort :sortlist="topicArr" @conditionName="conditionName"></sort>
		<u-divider></u-divider>
		<view class="cu-list menu-avatar">
			<view class="cu-item" style="height: 190rpx;" v-for="(item, index) in hospitalInfo" :key="index" @click="toSecList(item._id)">
				<view class="avatar-box">
					<image :src="item.image" mode=""></image>
				</view>
				<view class="content margin-left-sm">
					<view class="text-bold fs-26">{{item.name}}</view>
					<view class="eval-box flex justify-around align-center fs-24" style="width: fit-content;">
						<u-icon name="star-fill" color="#5e8860" ></u-icon>
						<view class="color-theme margin-left-sm" >{{item.point.toFixed(1)}}分</view>
						<view class="color-7f7f7f margin-left-sm">{{item.rankName}}</view>
					</view>
					<view class="flex align-center">
						<view style="width: fit-content;" class="margin-xs" v-for="(item2, index2) in item.tags" :key="index2">
							<u-tag :text="item2" plain size="mini" color="#5e8860" borderColor="#5e8860"></u-tag>
						</view>
					</view>
				</view>
				<view class="action">
					<view class="">4.8km</view>
					<view class="">鼓楼</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import get_hospitals_by_city from "@/utils/remote_data_service/get_hospitals_by_city.js";
	export default {
		data() {
			return {
				keyword: "",
				show: false,
				city: [
					["开封", "郑州"]
				],
				curCity: "开封",
				topicArr: ["全城", "智能排序"],
				hospitalInfo: [],
			}
		},
		onLoad() {
			this.getHospital(this.curCity)
		},
		methods: {
			selectCity(e) {
				this.curCity = e.value[0]
				this.show = false
				this.getHospital(e.value[0])
			},
			toSecList(id) {
				console.log(id);
				uni.navigateTo({
					url: `./secList?id=${id}`
				})
			},
			getHospital(city) {
				this.hospitalInfo.splice(0, this.hospitalInfo.length)
				get_hospitals_by_city(city).then(res => {
					wx.setStorage({
						key: "hospitalInfo",
						data: res
					})
					res.forEach(obj => {
						let {rank} = obj
						obj["rankName"] = this.switchRank(rank)
						this.hospitalInfo.push(obj)
					})
				}).catch(res => {
					console.log(res);
				})
				console.log(this.hospitalInfo);
			},
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
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.cu-list {
			.cu-item {
				.avatar-box {
					position: absolute;
					left: 0;
					margin-left: 20rpx;
					image {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
				}
			}
		}
	}
</style>
