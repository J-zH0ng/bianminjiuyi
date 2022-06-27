wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()

export default (id) => {
	return new Promise((resolve, reject) => {
		db.collection("hospital").where({
			_id: id
		}).field({
			comments: true
		}).get()
		.then(res => {
			resolve(res.data[0].comments)
		})
		.catch(res => {
			reject(res)
		})
	})
}