wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()

export default (id) => {
	return new Promise((resolve, reject) => {
		db.collection("hospital").where({
			_id: id
		}).field({
			name: true,
			address: true,
			characteristic_departments: true,
			description: true,
			transportation: true
		}).get()
		.then(res => {
			resolve(res.data[0])
		})
		.catch(res => {
			reject(res)
		})
	})
}