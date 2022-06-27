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
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs" @click="toRegister()">
				<view class="func-text">
					<view class="fs-32 text-bold">
						预约挂号
					</view>
					<view class="fs-24 color-9c9c9c margin-top-xs">
						医院线上挂号
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-calendar"></view>
				</view>
			</view>
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs" @click="toInsurance()">
				<view class="func-text">
					<view class="fs-32 text-bold">
						急救中心
					</view>
					<view class="fs-24 color-9c9c9c margin-top-xs">
						发送急救信息
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-search"></view>
				</view>
			</view>
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs" @click="toDoctor()">
				<view class="func-text">
					<view class="fs-32 text-bold">
						医生问诊
					</view>
					<view class="fs-24 color-9c9c9c margin-top-xs">
						医生在线问诊
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-message"></view>
				</view>
			</view>
			<view class="func-item flex justify-around align-center padding-tb padding-lr-xs">
				<view class="func-text">
					<view class="fs-32 text-bold">
						乳腺癌
					</view>
					<view class="fs-24 color-9c9c9c margin-top-xs">
						智能分析风险
					</view>
				</view>
				<view class="icon-bg bg-theme flex justify-around align-center">
					<view class="cuIcon cuIcon-location"></view>
				</view>
			</view>
		</view>
		<!-- 精选推荐 -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-titles color-theme"></text> 精选推荐
			</view>
		</view>
		<view class="cu-card article">
			<view class="cu-item solid shadow" :class="index==0?'cu-first':''" v-for="(item, index) in 4" :key="index">
				<view class="title">
					<view class="text-cut">
						细菌性感染发烧一般几天好
					</view>
				</view>
				<view class="content">
					<view class="desc">
						<view class="text-content">
							对于细菌感染引起发热的患者，一般该病约为5~7天左右才能逐渐好转，其主要通过抗生素抗感染，如阿奇霉素，阿莫西林克拉维酸钾，头孢克肟等等。如果体温超过38.5度时，可以通过布洛芬或对乙酰氨基酚退热，没有超过38.5度时可以用温水擦拭身体降温。
						</view>
						<view>
							<text class="margin-right-xs text-blue">
								于晨光
							</text>
							<text class="text-gray">
								主治医生
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar :value="tabName" @change="name => tabName = name" activeColor="#5e8860">
			<u-tabbar-item text="首页" name="index" :icon="iconPath" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="医学科普" name="knowledge" icon="/static/tabIcon/news.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="消息" name="message" icon="/static/tabIcon/comment2.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="/static/tabIcon/user.png" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import add_order from "@/utils/remote_data_service/add_order.js"
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
				tabName: "index",
				identity: 0
			}
		},
		computed: {
			iconPath() {
				if (this.tabName === "index") {
					return "/static/tabIcon/home-selected.png"
				}
				return "/static/tabIcon/home.png"
			}
		},
		created() {
			if(!this.$store.state.orders.loaded){
				uni.showLoading({
					title: '加载订单数据中'
				});
				this.$store.dispatch('orders/setOrderList', 'user')
				.then(() => {
					uni.hideLoading();
				})
			}
			
			// var doctorinfo = {
			// 	openid: "ozE6G4uPADddFl9WwQZQSIWR-X7A",
			// 	photo: "cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/doctor/photo/开封光大医院-普通外科-张三-2022-5-25",
			// 	name: "张三",
			// 	department: "普通外科"
			// }
			// var userinfo = {
			// 	openid: "ozE6G4uPADddFl9WwQZQSIWR-X7A",
			// 	name: "张三峰",
			// 	gender: "男",
			// 	avatar: ""
			// }
			// var info = {
			// 	symptom: "膝盖疼",
			// 	symptom_time: "最近一周",
			// 	picture: ""
			// }
			// var picture = ""
			// wx.chooseImage({
			// 	count: 1,
			// 	sourceType: ['album', 'camera'],
			// 	success (res) {
			// 	// tempFilePath可以作为 img 标签的 src 属性显示图片
			// 		console.log("success");
			// 		picture = res.tempFilePaths[0]
			// 		console.log(picture);
			// 		info.picture = picture
			// 		add_order(doctorinfo, userinfo, info, 3)
			// 		.then(res => {
			// 			console.log(res);
			// 		})
			// 	},
			// 	fail(res) {
			// 		console.log(res);
			// 	}
			// })
		},
		methods: {
			toInsurance() {
				wx.navigateToMiniProgram({
					appId: "wx308bd2aeb83d3345",
					path: "pages/main?serviceId=1000836&path=https%3A%2F%2Fmp.weixin.qq.com%2Finsurance%2Fcard%2Fcreditjump%3Fcityid%3D99999%26%23wechat_redirect",
					envVersion: "release"
				})
			},
			toDoctor() {
				uni.navigateTo({
					url: '../doctor/doctor'
				})
			},
			toRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			toTab(name) {
				uni.reLaunch({
					url: `../${name}/${name}`
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

		.cu-first {
			margin-top: 0;
		}
	}
</style>
