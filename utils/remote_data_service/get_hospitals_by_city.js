wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()

export default (city) => {
	return new Promise((resolve, reject) => {
		db.collection("hospital").where({
			city: city
		}).field({
			name: true,
			rank: true,
			point: true,
			tags: true,
			image: true
		}).get()
		.then(res => {
			resolve(res.data)
		})
		.catch(res => {
			reject(res)
		})
	})
}