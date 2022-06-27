<template>
	<view class="content">
		<view class="header bg-theme">
			<view class="user-wrap flex flex-direction align-center">
				<view class="avatar-box margin-top-xl">
					<u-avatar size="104rpx" :src="avatar"></u-avatar>
				</view>
				<view class="text-white fs-24 margin-top-sm">
					{{nickname}}
				</view>
			</view>
		</view>
		<view class="flex flex-direction align-center">
			<view class="center-box bg-fff solid flex justify-around align-center">
				<view class="item flex flex-direction align-center" @click="toGuahao">
					<view class="iconfont icon-daizhifudingdan color-theme"></view>
					<view class="fs-24">
						挂号记录
					</view>
				</view>
				<view class="item flex flex-direction align-center" @click="toUnsolved">
					<view class="iconfont icon-shalou color-theme"></view>
					<view class="fs-24">
						进行中
					</view>
				</view>
				<view class="item flex flex-direction align-center" @click="toNotevalued">
					<view class="iconfont icon-jieshao color-theme"></view>
					<view class="fs-24">
						待评价
					</view>
				</view>
			</view>
		</view>
		<view class="main-box solid bg-fff margin-top">
			<u-cell-group :border="false">
				<view class="block"></view>
				<u-cell title="关于我们" isLink :border="false" @click="toAboutUs">
					<view class="iconfont icon-duoren2 color-theme" slot="icon"></view>
				</u-cell>
				<u-cell title="联系客服" isLink :border="false" icon="server-fill" iconStyle="color:#5e8860;"></u-cell>
				<u-cell title="赞赏开发者" isLink :border="false"  icon="gift-fill" iconStyle="color:#5e8860;"></u-cell>		
			</u-cell-group>
		</view>
		<u-tabbar :value="tabName" @change="name => tabName = name" activeColor="#5e8860">
			<u-tabbar-item text="首页" name="index" icon="/static/tabIcon/home.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="医学科普" name="knowledge" icon="/static/tabIcon/news.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="消息" name="message" icon="/static/tabIcon/comment2.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" :icon="iconPath" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabName: "my",
				nickname: "",
				avatar: ""
			};
		},
		computed: {
			iconPath() {
				if(this.tabName === "my") {
					return "/static/tabIcon/user-selected.png"
				}
				return "/static/tabIcon/user.png"
			}
		},
		onLoad() {
			console.log("onload");
			this.nickname = this.$store.state.login.nickname
			this.avatar = this.$store.state.login.avatar
		},
		methods: {
			toGuahao() {
				uni.navigateTo({
					url: `/pages/guahao/guahao?type=user`
				})
			},
			toUnsolved() {
				uni.navigateTo({
					url: '/pages/message/unsolved'
				})
			},
			toNotevalued() {
				uni.navigateTo({
					url: '/pages/message/notevalued'
				})
			},
			toAboutUs() {
				uni.navigateTo({
					url: "./aboutUs"
				})
			},
			toTab(name) {
				uni.reLaunch({
					url: `../${name}/${name}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		.header {
			height: 320rpx;
		}
		.user-wrap {
			.avatar-box {
				border: 6rpx solid #fff;
				border-radius: 50%;
			}
		}
		.center-box {
			width: 708rpx;
			height: 136rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.4);
			transform: translateY(-50%);
			border-radius: 24rpx;
			z-index: 2;
			.iconfont {
				font-size: 60rpx;
			}
		}
		.main-box {
			transform: translateY(-202rpx);
			border-radius: 50rpx 50rpx 0 0rpx;
			z-index: 1;
			.block {
				margin-top: 150rpx;
			}
		}
	}
</style>
