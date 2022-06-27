<template>
	<view class="container">
		<view class="margin-lr-sm text-bold fs-32 margin-bottom-sm solid-bottom">
			{{department}}
		</view>
		<view class="margin-lr-sm fs-24 color-7f7f7f solid-bottom">
			河南大学淮河医院
		</view>
		<view class="info-box flex justify-between align-center margin-lr-sm solid-bottom">
			<view class="keshi flex justify-around align-center">
				<u-icon name="volume-fill"></u-icon>
				<view class="fs-24">科室公告</view>
				<u-line direction='col' length='40rpx' margin="10rpx"></u-line>
				<u-icon name="file-text"></u-icon>
				<view class="fs-24">科室介绍</view>
			</view>
			<view class="flex">
				<view class="margin-right-xs">15713667955</view>
				<u-icon name="phone-fill" ></u-icon>
			</view>
		</view>
		<view class="inform-box">
			<u-notice-bar :text="informText" bgColor="#5e8860" color="#fff"></u-notice-bar>
		</view>
		<view class="select-box margin-tb-xs">
			<u-subsection :list="selectList" :current="curNow" @change="sectionChange" activeColor="#5e8860"></u-subsection>
		</view>
		<view class="cu-list menu-avatar">
			<view class="margin-top-xl" v-if="selDoctors.length === 0">
				<u-empty
				        mode="list"
						text="当日没有医生坐诊哦,请择日再选吧"
				>
				</u-empty>
			</view>
			<view class="cu-item" v-for="(item, index) in selDoctors" :key="index" v-else>
				<view class="avatar-box">
					<image :src="item.photo" mode="widthFix" class="image" lazy-load></image>
				</view>
				<view class="content">
					<view class="fs-28 text-bold flex align-center justify-between">
						{{item.name}}
						<view class="margin-right">{{item.shift[selList[curNow]]}}</view>
					</view>
					<view class="eval-box flex justify-between align-center fs-24">
						<view class="flex justify-between align-center" style="width: 100rpx;">
							<u-icon name="star-fill" color="#5e8860"></u-icon>
							<view class="color-theme margin-right" >{{item.point}}</view>
						</view>
						<view class="color-7f7f7f">{{item.title.split(' ')[0]}}</view>
						<view class="color-7f7f7f margin-left-lg">接诊量</view>
						<view class="color-7f7f7f margin-right-lg">{{item.accepts}}</view>
					</view>
					<view class="tag-box margin-top-xs">
						<u-tag :text="item.description.goodat.slice(0, 10)+'...'" plain size="mini" color="#5e8860" borderColor="#5e8860"></u-tag>
					</view>
				</view>
				<view class="action" @click="toRegDoctor(index)">
					<tag content-text="挂号"></tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import get_doctors_by_department from "@/utils/remote_data_service/get_doctors_by_department.js";
	export default {
		data() {
			return {
				informText: "每周排班以医院实际安排为准",
				selectList: ['今天', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				selList: ['','mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
				selDoctors: [],
				curNow: 0,
				today: -99,
				doctorsId: [],
				doctors: [],
				selectedDoc: [],
				department: '',
				hospital: ''
			};
		},
		onLoad(options) {
			console.log(options);
			this.doctorsId = options.doctors.split(',')
			this.department = options.department
			this.hospital = options.hospital
			get_doctors_by_department(this.doctorsId).then(res => {
				res.forEach(item => {
					this.doctors.push(item)
				})
				console.log(this.doctors);
				this.sectionChange(0)
			}).catch(res => {
				console.log(res);
				uni.showToast({
					title: '网络错误',
					complete() {
						setTimeout(() => {
							uni.navigateBack()
						}, 1500)
					}
				})
			})
			
			
		},
		methods: {
			sectionChange(index) {
				console.log(index);
				this.curNow = index;
				this.selDoctors.splice(0, this.selDoctors.length)
				console.log(this.selDoctors);
				let today = new Date().getDay()
				this.today = today === 0? 7: today //1-7 星期1-日
				let day
				if (index == 0) {
					day = this.getWeek(today)
					this.selList[0] = day
					console.log(`day:${day} today:${today}`);
				}else {
					day = this.selList[index]
					console.log(`day:${day}`);
				}
				this.doctors.forEach((item, idx) => {
					if(item.shift[day]==='上午' || item.shift[day]==='下午' || item.shift[day]==='全天' || item.shift[day]==='晚上'){
						this.selDoctors.push(item)
					}
				})
			},
			toRegDoctor(index) {
				wx.setStorage({
					key: "doctorInfo",
					data: this.selDoctors[index]
				})
				uni.navigateTo({
					url: `./regDoctor?week=${this.curNow===0?this.today:this.curNow}`
				})
			},
			getWeek(day) {
				switch (day) {
					case 0: 
						return 'sun'
						break;
					case 1:
						return 'mon'
						break;
					case 2:
						return 'tue'
						break;
					case 3:
						return 'wed'
						break;
					case 4:
						return 'thu'
						break;
					case 5:
						return 'fri'
						break;
					case 6:
						return 'sat'
						break;
					default:
						return 'today'
						break;
				}
			},
		}
	}
</script>

<style lang="scss">
.container {
	.cu-list {
		.cu-item {
			height: 220rpx;
			.avatar-box {
				position: absolute;
				left: 0;
				margin-left: 20rpx;
				image {
					width: 100rpx;
					border-radius: 50%;
				}
			}
			.content {
				.tag-box {
					width: fit-content;
				}
			}
		}
	}
}
</style>
