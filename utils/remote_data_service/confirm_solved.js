wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
export default (id) => {
	return new Promise((resolve, reject)=>{
		db.collection('order').doc(id)
		.update({
			data:{
				solved: true
			}
		})
		.then(res=>{
			resolve("订单已完成")
		})
		.catch(res=>{
			reject("订单完成失败")
		})
	})
}