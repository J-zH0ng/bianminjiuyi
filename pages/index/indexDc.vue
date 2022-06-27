<template>
	<view class="content">
		<view class="search-box padding bg-theme">
			<u-search placeholder="请输入搜索关键词" v-model="keyword" :showAction="false">
			</u-search>
		</view>
		<view class="swiper-box margin-top margin-lr-sm solid">
			<u-swiper :list="swiperList" indicator indicatorMode="dot" circular height="400rpx">
			</u-swiper>
		</view>
		<view class="func-zone grid col-2 flex-wrap margin-top margin-lr-sm">
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs" @click="toWenzhen">
				<view class="func-text">
					<view class="fs-32 text-bold">
						问诊管理
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-calendar"></view>
				</view>
			</view>
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs" @click="toGuahao">
				<view class="func-text">
					<view class="fs-32 text-bold">
						挂号管理
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-search"></view>
				</view>
			</view>
		</view>
		<u-tabbar :value="tabName" @change="name => tabName = name" activeColor="#5e8860">
			<u-tabbar-item text="首页" name="indexDc" :icon="iconPath" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="myDc" icon="/static/tabIcon/user.png" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				styleSearch: {
					color: "#fff"
				},
				swiperList: [
					"cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/imgs/办公环境.png",
					"cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/imgs/病例巡诊.png",
					"cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/imgs/技术交流.png"
				],
				tabName: "indexDc",
				identity: 0
			}
		},
		computed: {
			iconPath() {
				if (this.tabName === "indexDc") {
					return "/static/tabIcon/home-selected.png"
				}
				return "/static/tabIcon/home.png"
			}
		},
		onLoad() {
			if(!this.$store.state.orders.loaded){
				uni.showLoading({
					title: '加载订单数据中'
				});
				this.$store.dispatch('orders/setOrderList', 'doctor')
				.then(() => {
					uni.hideLoading();
				})
			}
		},
		methods: {
			toTab(name) {
				uni.navigateTo({
					url: `../my/myDc`
				})
			},
			toGuahao() {
				uni.navigateTo({
					url: "/pages/guahao/guahao?type=doctor"
				})
			},
			toWenzhen() {
				uni.navigateTo({
					url: "/pages/wenzhen/wenzhen"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.swiper-box {
			border-radius: 24rpx;
		}
		.func-zone {
			.func-item {
				background-color: #f2f2f2;
				height: 148rpx;
			
				.func-text {
					width: 180rpx;
				}
				.icon-bg {
					width: 100rpx;
					height: 100rpx;
					border-radius: 24rpx;
					.cuIcon {
						font-size: 60rpx;
						color: #b1e3c2;
					}
				}
			}
		}
	}
</style>
