<template>
	<view class="content">
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-titles color-theme"></text> 精选推荐
			</view>
		</view>
		<view class="cu-card article">
			<view class="cu-item solid shadow" v-for="(item, index) in 4" :key="item">
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
			<u-tabbar-item text="首页" name="index" icon="/static/tabIcon/home.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="医学科普" name="knowledge" :icon="iconPath" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="消息" name="message" icon="/static/tabIcon/comment2.png" @click="toTab"></u-tabbar-item>
			<u-tabbar-item text="我的" name="my" icon="/static/tabIcon/user.png" @click="toTab"></u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabName: "knowledge"
			};
		},
		computed: {
			iconPath() {
				if(this.tabName === "knowledge") {
					return "/static/tabIcon/news-selected.png"
				}
				return "/static/tabIcon/news.png"
			}
		},
		methods: {
			toTab(name) {
				uni.reLaunch({
					url: `../${name}/${name}`
				})
			}
		}
	}
</script>

<style lang="scss">
.content {}
</style>
