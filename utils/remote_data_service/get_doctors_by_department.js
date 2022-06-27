wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
const _ = db.command

export default (doctorids) => {
	return new Promise((resolve, reject) => {
		db.collection("doctor").where({
			_id: _.in(doctorids)
		}).field({
			openid: false,
			_createTime: false,
			_updateTime: false,
			hospital: false,
			department: false
		}).get()
		.then(res => {
			resolve(res.data)
		})
		.catch(res => {
			reject(res)
		})
	})
}