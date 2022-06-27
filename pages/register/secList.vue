<template>
	<view class="container">
		<view class="fs-36 margin-lr-sm padding-tb-xs">{{hospitalInfo.name}}</view>
		<u-tabs :list="tabList" lineColor="#5e8860" itemStyle="width:140rpx;height:60rpx" lineWidth="60rpx"
			:current="curTab" @change="changeTab"></u-tabs>
		<u-divider></u-divider>
		<template v-if="curTab==0">
			<view class="loc-box margin-lr-sm flex align-center">
				<u-icon name="map-fill" color="#5e8860"></u-icon>
				<view class="margin-left-sm">{{hospitalInfo.address}}</view>
			</view>
			<view class="content margin-lr-sm margin-top-sm">
				<view class="fs-26 flex align-center justify-between">
					<view class="text-bold">特色科室</view>
				</view>
				<u-scroll-list :indicator="false">
					<view v-for="(item, index) in hospitalInfo.characteristic_departments" :key="index">
						<view class="keshi-box bg-theme margin-sm color-fff">
							{{item}}
						</view>
					</view>
				</u-scroll-list>
				<view class="fs-26 flex align-center justify-between">
					<view class="text-bold">机构简介</view>
				</view>
				<view class="fs-24 color-7f7f7f margin-tb-xs">
					<u-parse :content="hospitalInfo.description" :selectable="true"></u-parse>
				</view>
				<view class="fs-26 flex align-center justify-between">
					<view class="text-bold">公共交通</view>
				</view>
				<view class="fs-24 color-7f7f7f margin-tb-xs">
					<u-parse :content="hospitalInfo.transportation" :selectable="true"></u-parse>
				</view>
			</view>
		</template>
		<template v-else-if="curTab==1">
			<view class="search-box margin-lr-sm margin-bottom-sm">
				<u-search placeholder="搜索医院、科室、医生、疾病" v-model="keyword" :showAction="false"></u-search>
			</view>
			<view class="VerticalBox">
				<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop"
					style="height:calc(100vh - 176rpx)">
					<view class="cu-item" :class="index==tabCur?'color-theme cur':''" v-for="(item,index) in depList"
						:key="index" @tap="TabSelect" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
				<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 176rpx)"
					:scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
					<view class="padding-top padding-lr" v-for="(item,index) in depList" :key="index"
						:id="'main-'+index">
						<view class="cu-bar solid-bottom bg-white">
							<view class="action">
								<text class="cuIcon-title color-theme"></text>{{item.name}}
							</view>
						</view>
						<u-cell-group :customStyle="{'background-color': '#fff'}">
							<view v-for="(item2,index2) in item.sub" :key="index2">
								<u-cell :title="item2.name" isLink @click="toRegHome(item2.doctors, item2.name)">
									<view class="cell-item bg-theme fs-26" slot="value">
										挂号
									</view>
								</u-cell>
							</view>
						</u-cell-group>
					</view>
				</scroll-view>
			</view>
		</template>
		<template v-else-if="curTab==2">
			<view class="cu-list menu-avatar comment">
				<view class="cu-item" v-for="(item, index) in commentList" :key="index">
					<view class="cu-avatar round lg" :style="avatarList[index]">
					</view>
					<view class="content margin-left">
						<view class="flex justify-between">
							<view class="text-grey fs-32">{{item.nickname}}</view>
							<view class="text-gray text-content text-df">
								{{item.time}}
							</view>
						</view>
						<view class="margin-top-xs">
							<u-rate :count="5" :value="4" readonly active-color="#FFD700"></u-rate>
						</view>
						<view class="margin-top-sm text-sm">
							<view class="">{{item.content}}</view>
						</view>
						<view class="flex justify-between">
							<view class=""></view>
							<view @click="upVote(index)">
								<text class="cuIcon-appreciatefill text-gray"></text>
								<text class="text-gray margin-left-xs">{{item.upvote}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="comment-area flex flex-direction align-center">
				<image src="../../static/意见反馈.png" mode="widthFix" @click="show"></image>
				去评论
			</view>
			<u-popup :show="showComment" @close="close" @open="open" :closeable="true">
				<view class="margin-lr-sm">
					<u--form labelPosition="top" :model="model1" ref="form1">
						<u-form-item label="您对医院服务满意吗？" prop="comment.point" borderBottom labelWidth="300" ref="item1">
							<u-rate :count="5" v-model="model1.comment.point" active-color="#FFD700"></u-rate>
						</u-form-item>
						<u-form-item prop="comment.content" borderBotto labelWidth="80" ref="item1">
							<u--textarea placeholder="分享一下你的感受吧!" v-model="model1.comment.content" count></u--textarea>
						</u-form-item>
						<view class="margin-lr-sm margin-bottom-xs">
							<u-button color="#5e8860" text="提交"
								customStyle="margin-top: 50rpx; border-radius: 20rpx; box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.4);"
								@click="submit"></u-button>
						</view>
					</u--form>
				</view>
			</u-popup>
		</template>
	</view>
</template>

<script>
	import get_hospital_info_by_id from "@/utils/remote_data_service/get_hospital_info_by_id.js";
	import get_departments_by_id from "@/utils/remote_data_service/get_departments_by_id.js";
	import get_hospital_comments_by_id from "@/utils/remote_data_service/get_hospital_comments_by_id.js";
	export default {
		data() {
			return {
				tabList: [{
						name: "主页"
					},
					{
						name: "挂号"
					},
					{
						name: "点评"
					}
				],
				depList: [],
				curTab: 0,
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				loaded: true,
				keyword: "",
				showComment: false,
				commentStar: 0,
				hospitalInfo: {},
				commentList: [],
				avatarList: [],
				tempcontent: [],
				temppoint: 0,
				model1: {
					comment: {
						userid: 0,
						nickname: "",
						avatar: "",
						point: 0,
						content: "",
						upvote: 0,
						advocates: [],
						time: {}
					},
				},
				rules: {
					'comment.point': {
						type: 'number',
						required: true,
						min: 1,
						max: 5,
						message: '请选择评分',
						trigger: ['blur', 'change']
					},
					'comment.content': {
						type: 'string',
						required: true,
						message: '请填入内容',
						trigger: ['blur', 'change']
					}
				}
			};
		},
		onLoad(obj) {
			let {
				id
			} = obj
			wx.cloud.callFunction({
				name: "get_openid"
			}).then(res => {
				wx.setStorage({
					key: 'openid',
					data: res.result.openid
				})
			})
			get_hospital_info_by_id(id).then(res => {
				// console.log(res);
				this.hospitalInfo = res
			}).catch(res => {
				console.log(res);
			})
			get_departments_by_id(id).then(res => {
				let list = []
				Object.keys(res).forEach((key, index) => {
					let obj = {}
					obj['id'] = index
					obj['name'] = key
					obj['sub'] = res[key]
					list.push(obj)
				})
				console.log(list);
				this.depList = list
			}).catch(res => {
				console.log(res);
			})
			this.getComments(id, false)
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			changeTab(e) {
				// console.log(e);
				this.curTab = e.index
			},
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				let that = this;
				let tabHeight = 0;
				if (this.loaded) {
					for (let i = 0; i < this.depList.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.depList[i].id);
						view.fields({
							size: true
						}, data => {
							this.depList[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.depList[i].bottom = tabHeight;
						}).exec();
					}
					this.loaded = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.depList.length; i++) {
					if (scrollTop > this.depList[i].top && scrollTop < this.depList[i].bottom) {
						this.verticalNavTop = (this.depList[i].id - 1) * 50
						this.tabCur = this.depList[i].id
						// console.log(scrollTop)
						return false
					}
				}
			},
			toRegHome(doctors, name) {
				uni.navigateTo({
					url: `./regHome?doctors=${doctors}&department=${name}&hospital=${this.hospitalInfo.name}`
				})
			},
			getComments(id, isAdd = true) {
				if (isAdd) {
					let {
						time
					} = this.model1.comment
					let d = new Date(time)
					let date = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
					this.model1.comment['time'] = date
					console.log(this.model1.comment.content);
					console.log(this.model1.comment);
					this.commentList.push(this.model1.comment)
					return
				}
				get_hospital_comments_by_id(id).then(res => {
					res.forEach(obj => {
						let {
							time,
							avatar
						} = obj
						this.avatarList.push(`background-image:url(${avatar});"`)
						let d = new Date(time)
						let date = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
						obj['time'] = date
						this.commentList.push(obj)
					})
				}).catch(res => {
					console.log(res);
				})
			},
			open() {
				this.$refs.form1.setRules(this.rules)
			},
			close() {
				this.showComment = false
				const validateList = ['comment.point', 'comment.content']
				this.$refs.form1.resetFields()
				this.model1.comment.point = 0
				this.model1.comment.content = ''
			},
			show() {
				let that = this
				wx.getStorage({
					key: "realname",
					success() {
						that.model1.comment.nickname = wx.getStorageSync('nickname')
						that.model1.comment.avatar = wx.getStorageSync('avatar')
						if (that.model1.comment.nickname == '' || that.model1.comment.avatar == '') {
							wx.getUserProfile({
									desc: "获取用户昵称头像"
								})
								.then(res => {
									that.model1.comment.nicknam = res.userInfo.nickName
									that.model1.comment.avatar = res.userInfo.avatarUrl
									Promise.resolve()
								})
								.then(res => {
									wx.setStorage({
										key: "nickname",
										data: that.model1.comment.nicknam
									})
									wx.setStorage({
										key: "avatar",
										data: that.model1.comment.avatar
									})
								})
						} else {
							that.showComment = true
						}
					},
					fail() {
						uni.navigateTo({
							url: '/pages/my/zhuce'
						})
					}
				})
			},
			submit() {
				this.$refs.form1.validate().then(res => {
					let that = this
					wx.getStorage({
						key: "openid",
						success(r) {
							that.model1.comment.userid = r.data
						},
						fail(r) {
							console.log(res);
						}
					})
					let d = new Date()
					this.model1.comment.time = d
					wx.cloud.callFunction({
						name: "add_comment",
						data: {
							comment: this.model1.comment,
							id: this.hospitalInfo._id
						}
					}).then(
						r => {
							uni.$u.toast('提交成功')
							this.getComments()
							this.close()
						}
					).catch(
						r => {
							uni.$u.toast('提交失败')
							this.close()
						}
					)
				}).catch(err => {
					uni.$u.toast('验证失败，请重新检查')
				})
			},
			upVote(idx) {
				wx.cloud.callFunction({
					name: "upvote_comment",
					data: {
						index: idx,
						hospitalid: this.hospitalInfo._id,
						userid: wx.getStorageSync('openid'),
						advocates: this.commentList[idx].advocates
					}
				}).then(res => {
					wx.showToast({
							title: "点赞成功",
							mask: true
						})
						++this.commentList[idx].upvote
						this.commentList[idx].advocates.push(wx.getStorageSync('openid'))
				}).catch(res => {
					wx.showToast({
							title: "您点过赞了",
							mask: true
						})
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.keshi-box {
			width: 180rpx;
			height: 106rpx;
			border-radius: 16rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx rgba(0, 0, 0, 0.4);
			line-height: 106rpx;
			text-align: center;
		}

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

		.comment-area {
			border-radius: 20rpx;
			width: 120rpx;
			height: 120rpx;
			border: 1rpx solid #7f7f7f;
			position: fixed;
			top: 0;
			right: 0;
			margin-right: 10rpx;
			margin-top: 20rpx;

			image {
				width: 90rpx;
				height: 90rpx;
			}
		}
	}
</style>
