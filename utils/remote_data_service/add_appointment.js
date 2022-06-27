wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
export default (userid, doctorid, doctorShift, weekday) => {
	return new Promise((resolve, reject) => {
		var now = new Date()
		var weekdayToday = now.getDay() === 0 ? 7 : now.getDay() //1-7代表周1到周日
		var skip = 0
		if(weekday >= weekdayToday){
			skip = weekday - weekdayToday
		}else{
			skip = 7 - weekdayToday + weekday
		}
		var time = new Date(now.getFullYear(), now.getMonth(), now.getDate() + skip)
		console.log(`weekdayToday:${weekdayToday} weekday:${weekday} skip:${skip}`);
		var period = ""
		if(doctorShift[weekdays[weekday-1]] !== '无'){ //医生有排班
			period = doctorShift[weekdays[weekday-1]]
			db.collection("appointment").add({
				data: {
					userid,
					doctorid,
					time,
					period
				}
			})
			.then(res => {
				resolve({info: "预约成功", result: res})
			})
			.catch(res => {
				reject({info: "预约失败", result: res})
			})
		}else{
			reject(`预约失败, 医生${weekdays[weekday-1]}没有排班`)
		}
	})
}