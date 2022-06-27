<template>
	<view class="content">
		<view class="header bg-theme">
			<view class="user-wrap flex flex-direction align-center">
				<view class="avatar-box margin-top-xl">
					<u-avatar size="104rpx" :src="photo"></u-avatar>
				</view>
				<view class="text-white fs-24 margin-top-sm">
					{{name}}
				</view>
			</view>
		</view>
		<view class="main-box solid bg-fff margin-top">
			<u-cell-group :border="false">
				<u-cell title="关于我们" isLink :border="false" @click="toAboutUs">
					<view class="iconfont icon-duoren2 color-theme" slot="icon"></view>
				</u-cell>
				<u-cell title="联系客服" isLink :border="false" icon="server-fill" iconStyle="color:#5e8860;"></u-cell>
				<u-cell title="赞赏开发者" isLink :border="false"  icon="gift-fill" iconStyle="color:#5e8860;"></u-cell>		
			</u-cell-group>
		</view>
		<u-tabbar :value="tabName" @change="name => tabName = name" activeColor="#5e8860">
			<u-tabbar-item text="首页" name="indexDc" icon="/static/tabIcon/home.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="myDc" :icon="iconPath" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabName: "myDc",
				name: "登录",
				photo: ""
			};
		},
		computed: {
			iconPath() {
				if(this.tabName === "myDc") {
					return "/static/tabIcon/user-selected.png"
				}
				return "/static/tabIcon/user.png"
			}
		},
		methods: {
			toAboutUs() {
				uni.navigateTo({
					url: "./aboutUs"
				})
			},
			toTab(name) {
				uni.navigateTo({
					url: "../index/indexDc"
				})
			}
		},
		onLoad() {
			this.name = this.$store.state.login.realname
			this.photo = this.$store.state.login.photo
		}
	}
</script>

<style lang="scss">
	.content {
		.header {
			height: 240rpx;
		}
		.user-wrap {
			.avatar-box {
				border: 6rpx solid #fff;
				border-radius: 50%;
			}
		}
	}
</style>
