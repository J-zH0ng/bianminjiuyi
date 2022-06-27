<template>
	<view class="container margin-lr-sm">
		<view class="u-demo-block">
			<view class="text-lg text-bold align-center">医生注册</view>
			<view class="u-demo-block__content">
				<u--form labelPosition="left" :model="model" ref="form1">
					<u-divider text="个人信息" lineColor="black"></u-divider>
					<u-form-item label="姓名" prop="name" borderBottom>
						<u--input placeholder="真实姓名" v-model="model.name" count></u--input>
					</u-form-item>
					<u-form-item label="照片" prop="photo" borderBottom>
						<u-upload :fileList="model.photo" @afterRead="afterRead" @delete="deletePic" name="1"
							:maxCount="1"></u-upload>
					</u-form-item>
					<u-form-item label="职称" prop="title" borderBottom>
						<u--input placeholder="如副院长, 主任医师等" v-model="model.title" count></u--input>
					</u-form-item>
					<u-form-item label="擅长" prop="goodat" borderBottom>
						<u--input placeholder="擅长的领域" v-model="model.goodat" count></u--input>
					</u-form-item>
					<u-form-item label="职业经历" prop="history" borderBottom>
						<u--textarea placeholder="过去曾任职位, 学术成就等" v-model="model.history" count></u--textarea>
					</u-form-item>
					<u-form-item label="所属医院" prop="hospital" borderBottom>
						<u-button @click="openPicker">选择</u-button><text>{{model.hospital}}</text>
						<u-picker :show="show" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cancel" @change="changeHandler"></u-picker>
					</u-form-item>
					<u-form-item label="所属科室" prop="department" borderBottom>
						<u-button @click="openPicker1">选择</u-button><text>{{model.department}}</text>
						<u-picker :show="show1" ref="uPicker1" :columns="columns1" @confirm="confirm1" @cancel="cancel" @change="changeHandler1"></u-picker>
					</u-form-item>
					<u-divider text="排班" lineColor="black"></u-divider>
					<u-form-item label="周一" prop="mon" borderBottom>
						<u-radio-group placement="row" v-model="model.mon">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周二" prop="tue" borderBottom>
						<u-radio-group placement="row" v-model="model.tue">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周三" prop="wed" borderBottom>
						<u-radio-group placement="row" v-model="model.wed">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周四" prop="thu" borderBottom>
						<u-radio-group placement="row" v-model="model.thu">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周五" prop="fri" borderBottom>
						<u-radio-group placement="row" v-model="model.fri">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周六" prop="sat" borderBottom>
						<u-radio-group placement="row" v-model="model.sat">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="周日" prop="sun" borderBottom>
						<u-radio-group placement="row" v-model="model.sun">
							<u-radio label="上午" name="上午"></u-radio>
							<u-radio label="下午" name="下午"></u-radio>
							<u-radio label="全天" name="全天"></u-radio>
							<u-radio label="晚上" name="晚上"></u-radio>
							<u-radio label="无" name="无"></u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {setProp} from '@/utils/deep_vue_set.js'
	import login_doctor from '@/utils/remote_data_service/login_doctor.js'
	export default {
		data() {
			return {
				model: {
					name: '',
					photo: [],
					title: '',
					goodat: '',
					history: '',
					hospital: '',
					department: '',
					mon: null,				    tue: null,				    wed: null,				    thu: null,				    fri: null,				    sat: null,				    sun: null
				},
				photoPath: '',
				show: false,
				show1: false,
				columns: [
					['开封', '郑州'],
					['河南大学淮河医院', '开封光大医院']
				],
				columnData: [
					['河南大学淮河医院', '开封光大医院'],
					['河南省人民医院']
				],
				columns1: [
					['外科','内科','其他'],
					["普通外科",'泌尿外科','胸心血管外科','骨科']
				],
				columnData1: [
					["普通外科",'泌尿外科','胸心血管外科','骨科'],
					['心血管内科','神经内科','消化内科','肾内科','小儿内科'],
					['肿瘤科','皮肤科','心理门诊','新生儿重症监护病房（NICU）','妇产科']
				],
				rules: {
					name: {
						type: 'string',
						min: 2,
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					title: {
						type: 'string',
						min: 2,
						required: false,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					photo: {
						type: 'array',
						required: true,
						message: '请上传一张照片',
						trigger: ['change', 'blur']
					},
					goodat: {
						type: 'string',
						min: 10,
						required: false,
						message: '最少10字',
						trigger: ['change', 'blur']
					},
					history: {
						type: 'string',
						min: 20,
						required: false,
						message: '最少20字',
						trigger: ['change', 'blur']
					},
					hospital: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					department: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					sun: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					mon: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					tue: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					wed: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					thu: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					fri: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
					sat: {
						type: 'string',
						required: true,
						message: '必要信息',
						trigger: ['change', 'blur']
					},
				}
			};
		},
		methods: {
			afterRead(e){
				this.model.photo.push(e.file)
				this.photoPath = e.file.url
			},
			deletePic(e){
				this.model.photo.splice(e.index, 1)
				this.photoPath = ''
			},
			openPicker(){
				this.show = true
			},
			openPicker1(){
				this.show1 = true
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			changeHandler1(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker1
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData1[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				this.show = false
				setProp(this.model, ['hospital'], e.value[1])
			},
			confirm1(e) {
				this.show1 = false
				setProp(this.model, ['department'], e.value[1])
			},
			cancel(e) {
				this.show = false
				this.show1 = false
			},
			submit() {
				this.$refs.form1.validate()
				.then(res => {
					uni.showLoading({
						title: '注册中',
						mask: true
					})
					login_doctor(
						this.model.name,
						this.photoPath,
						this.model.title,
						{
							goodat: this.model.goodat,
							history: this.model.history
						},
						this.model.hospital,
						this.model.department,
						{
							mon: this.model.mon,
							tue: this.model.tue,
							wed: this.model.wed,
							thu: this.model.thu,
							fri: this.model.fri,
							sat: this.model.sat,
							sun: this.model.sun,
						}
					)
					.then(res => {
						var now = new Date()
						wx.setStorageSync("realname", this.model.name)
						wx.setStorageSync("photo", `cloud://cloudtest-8g4o6lb175c403f0.636c-cloudtest-8g4o6lb175c403f0-1311391403/doctor/photo/${this.model.hospital}-${this.model.department}-${this.model.name}-${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`)
						console.log(res);
						uni.hideLoading()
						uni.showToast({
							title: res.result,
							success() {
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							}
						})
					})
					.catch(res => {
						uni.showToast({
							title: res.result
						})
					})
				})
				.catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules)
		}
	}
</script>

<style lang="scss">
	
</style>