wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()

export default (name, photo, title, description, hospital, department, shift) => {
	return new Promise((resolve, reject) => {
		var now = new Date()
		var photoId = ""
		
		wx.cloud.uploadFile({
			cloudPath: `doctor/photo/${hospital}-${department}-${name}-${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
			filePath: photo,
			success(res) {
				console.log(res);
				photoId = res.fileID
				wx.cloud.callFunction({
					name: "login_doctor",
					data: {
						name,
						photo: photoId,
						title,
						description,
						hospital,
						department,
						shift
					}
				})
				.then(res => {
					resolve(res)
				})
				.catch(res => {
					reject(res)
				})
			},
			fail(res) {
				console.log(res);
				reject(res)
			}
			
		})
		
	})
	
}