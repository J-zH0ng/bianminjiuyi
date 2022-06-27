wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
export default (id, point) => {
	return new Promise((resolve, reject)=>{
		db.collection('order').doc(id)
		.update({
			data:{
				point: point
			}
		})
		.then(res=>{
			resolve("订单已评价")
		})
		.catch(res=>{
			reject("订单评价失败")
		})
	})
}