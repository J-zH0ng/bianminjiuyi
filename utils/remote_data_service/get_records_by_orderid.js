wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
export default (id) => {
	return new Promise((resolve, reject) => {
		db.collection('order').doc(id)
		.get()
		.then(res => {
			resolve(res.data.records)
		})
		.catch(res => {
			reject(res)
		})
	})
}