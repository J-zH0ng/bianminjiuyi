<template>
	<view class="content">
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles color-theme"></text> 按科室找医生
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh - 176rpx)">
				<view class="cu-item" :class="index==tabCur?'color-theme cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 176rpx)"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in list" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title color-theme"></text>{{item.name}}</view>
					</view>
					<u-cell-group :customStyle="{'background-color': '#fff'}">
						<u-cell v-for="(depart, idx) in item.departs" :title="depart" isLink @click="toDcinfo(depart)">
							<view class="cell-item bg-theme fs-26" slot="value">
								咨询
							</view>
						</u-cell>
					</u-cell-group>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						id: 0,
						name: "热门科室",
						departs: ["普通外科",'心血管内科','皮肤科', '消化内科']
					},
					{
						id: 1,
						name: "外科",
						departs: ["普通外科",'泌尿外科','胸心血管外科','骨科']
					},
					{
						id: 2,
						name: "内科",
						departs: ['心血管内科','神经内科','消化内科','肾内科','小儿内科']
					},
					{
						id: 3,
						name: '其他',
						departs: ['肿瘤科','皮肤科','心理门诊','新生儿重症监护病房（NICU）','妇产科']
					}
					
				],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				keyword: ""
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						// console.log(scrollTop)
						return false
					}
				}
			},
			toDcinfo(depart) {
				uni.navigateTo({
					url: `./dcList?depart=${depart}`
				})
			}
		},
	}
</script>

<style lang="scss">
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
	.cell-item {
		width: 72rpx;
		height: 30rpx;
		border-radius: 12rpx;
		color: #fff;
		line-height: 30rpx;
		text-align: center;
		box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.4);
	}
</style>
