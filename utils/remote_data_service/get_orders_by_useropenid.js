wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
export default (openid) => {
	return new Promise((resolve, reject) => {
		db.collection('order').where({
			_openid: openid
		})
		.orderBy('createtime','desc')
		.get()
		.then(res => {
			resolve(res.data)
		})
		.catch(res => {
			reject(res)
		})
	})
}