wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
const _ = db.command
export default (message, id, fromuser, touser, type) => {
	return new Promise((resolve, reject) => {
		db.collection("order").doc(id).update({
			data: {
				records: _.push(message)
			}
		})
		.then(res => {
			console.log("---------add_message--------");
			console.log(res);
			wx.cloud.callFunction({
				name: 'send_message',
				data: {
					touser,
					fromuser,
					type: type==='user'?'PATIENTINQUIRY':'RECEIVEREPLY',
					content: {
						sender: message.name,
						content: message.img === ''?message.message:'图片'
					}
				}
			})
			.then(res => {
				console.log("---------send_message--------");
				console.log(res);
				resolve("消息添加成功 订阅消息发送成功")
			})
			.catch(res => {
				console.log("---------send_message--------");
				console.log(res);
				resolve("消息添加成功 订阅消息发送失败")
			})
		})
		.catch(res => {
			console.log("---------add_message--------");
			console.log(res);
			reject("消息添加失败")
		})
	})
}