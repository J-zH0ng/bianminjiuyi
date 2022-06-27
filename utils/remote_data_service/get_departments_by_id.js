wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()

export default (id) => {
	var result = {}
	
	return new Promise((resolve, reject) => {
		db.collection("hospital").where({
			_id: id
		}).field({
			departments: true
		}).get()
		.then(res => {
			for(var department of res.data[0].departments){
				result[department.type] = []
			}
			for(var department of res.data[0].departments){
				result[department.type].push(department)
			}
			
			resolve(result)
		})
		.catch(res => {
			reject(res)
		})
	})
}