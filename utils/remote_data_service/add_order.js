wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
export default (doctorinfo, userinfo, info, fee) => {
	var now = new Date()
	var pictureid = ""
	
	return new Promise((resolve, reject) => {
		new Promise((reso, reje) => {
			if(info.picture !== '' && info.picture !== undefined && info.picture !== null){
				wx.cloud.uploadFile({
					cloudPath: `order/info-picture/${now.getTime()}`,
					filePath: info.picture,
					success(res) {
						console.log(res);
						pictureid = res.fileID
						reso()
					},
					fail(res) {
						console.log(res);
						reject(res)
					}
				})
			}else{
				reso()
			}
		})
		.then(res => {
			return db.collection("order").add({
				data: {
					doctorinfo,
					userinfo,
					fee,
					info: {
						symptom: info.symptom,
						symptom_time: info.symptom_time,
						picture: pictureid
					},
					solved: false,
					point: -1,
					records: [],
					createtime: now
				}
			})
		})
		.then(res => {
			return wx.cloud.callFunction({
				name: "send_message",
				data: {
					touser: doctorinfo.openid,
					fromuser: userinfo.openid,
					type: "NEWORDER",
					content: {
						ordertype: "图文",
						orderid: res._id,
						author: userinfo.name,
						fee: `${fee}元`
					}
				}
			})
		})
		.then(res => {
			resolve(res)
		})
		.catch(res => {
			reject(res)
		})
		
		
	})
}