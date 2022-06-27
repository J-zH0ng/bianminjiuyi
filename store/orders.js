import Vue from 'vue'

import {setProp, getProp, deleteProp} from "@/utils/deep_vue_set.js"
import get_orders_by_useropenid from "@/utils/remote_data_service/get_orders_by_useropenid.js"
import get_orders_by_doctoropenid from "@/utils/remote_data_service/get_orders_by_doctoropenid.js"

const normalObjs = new Set(['fee','solved','point','_id'])
const messageKeys = ['userId', 'msgId', 'name', 'message', 'img', 'avator']
var watcher = null

wx.cloud.init({
  env: "cloudtest-8g4o6lb175c403f0"
})

const db = wx.cloud.database()
const _ = db.command
export default {
	namespaced: true,
	state() {
		return {
			orderList: [],
			idToBeSearch: "",
			loaded: false,
			neworder: {}
		}
	},
	mutations: {
		setOrderList(state, list){
			state.orderList = []
			for(var i=0; i<list.length; i++){
				var order = list[i]
				for(var prop in order){
					if(prop === "records"){
						for(var j=0; j<order.records.length; j++){
							for(var recordProp in order.records[j])
								setProp(state, ["orderList", `${i}`, "records", `${j}`, recordProp], order.records[j][recordProp])
						}
					}else if(normalObjs.has(prop)){
						setProp(state, ["orderList", `${i}`, prop], order[prop])
					}else if(prop === 'createtime'){
						var createtime = new Date(order.createtime)
						console.log(createtime);
						setProp(state, ["orderList", `${i}`, prop], `${createtime.getMonth()+1}月${createtime.getDate()}日 ${createtime.getHours()}时${createtime.getMinutes()}分`)
					}else{
						for(var p in order[prop]){
							setProp(state, ["orderList", `${i}`, prop, p], order[prop][p])
						}
					}
				}
				setProp(state, ["orderList", `${i}`, "news"], false)
			}
			state.loaded = true
		},
		updateOrder(state, changeEvent){
			console.log('--------------updateOrder-------------')
			console.log(changeEvent);
			if(changeEvent.dataType === 'update'){
				var toUpdate = state.orderList.find(order => order._id === changeEvent.docId)
				for(var field in changeEvent.updatedFields){
					if(field === "records"){
						setProp(toUpdate, ["records"], changeEvent.updatedFields.records)
					}else if(field.split('.')[0] === "records"){
						setProp(toUpdate, ["records", field.split('.')[1]], changeEvent.updatedFields[field])
					}else if(field === "solved"){
						toUpdate.solved = true
					}else if(field === "point"){
						toUpdate.point = changeEvent.updatedFields.point
					}
				}
				toUpdate.news = true
			}else if(changeEvent.dataType === 'add'){
				console.log("add new order!");
				state.orderList.unshift(null)
				var order = changeEvent.doc
				console.log(order);
				for(var prop in order){
					console.log("prop" + prop);
					if(normalObjs.has(prop)){
						setProp(state, ["orderList", '0', prop], order[prop])
					}
					else if(prop === 'createtime'){
						console.log("进入createtime分支");
						var createtime = new Date(order.createtime)
						console.log(createtime);
						setProp(state, ["orderList", '0', prop], `${createtime.getMonth()+1}月${createtime.getDate()}日 ${createtime.getHours()}时${createtime.getMinutes()}分`)
					}
					else if(prop !== 'records'){
						for(var p in order[prop]){
							setProp(state, ["orderList", '0', prop, p], order[prop][p])
						}
					}
					
				}
				setProp(state, ["orderList", '0', "news"], true)
			}
		},
		setReaded(state, id){
			var toChange = state.orderList.find(order => {
				return order._id === id
			})
			toChange.news = false
		},
		setIdToBeSearch(state, id){
			setProp(state, ["idToBeSearch"], id)
		},
		setNewOrder(state, neworder){
			for(var prop in neworder.doctorinfo){
				setProp(state, ['neworder','doctorinfo', prop], neworder.doctorinfo[prop])
			}
			for(var prop in neworder.userinfo){
				setProp(state, ["neworder",'userinfo', prop], neworder.userinfo[prop])
			}
			setProp(state, ['neworder', 'fee'], 3)
			for(var prop in neworder.info){
				setProp(state, ["neworder",'info', prop], neworder.info[prop])
			}
		},
		setLoaded(state, loaded) {
			state.loaded = loaded
		}
	},
	actions: {
		setOrderList(context, type){
			var openid = ""
			return new Promise((resolve, reject) => {
				
				wx.cloud.callFunction({
					name: "get_openid"
				})
				.then(res => {
					openid = res.result.openid
					console.log(openid);
					if(type === "user"){
						return get_orders_by_useropenid(openid)
					}else{
						return get_orders_by_doctoropenid(openid)
					}
				})
				.then(res => {
					console.log(res);
					context.commit("setOrderList", res)
					return Promise.resolve("成功设置orderList")
				})
				.then(res => {
					console.log(res);
					console.log(context.state);
					watcher = db.collection('order').where(
						_.and([
							{
								[`${type}info.openid`]: openid
							},
							_.or([
								{
									solved: false
								},
								{
									point: -1
								}
							])
						])
					)
					
					.orderBy('createtime','desc')
					// .limit(10)
					.watch({
						onChange: function(snapshot) {
						  // console.log('docs\'s changed events', snapshot.docChanges)
						  // console.log('query result snapshot after the event', snapshot.docs)
						  // console.log('is init data', snapshot.type === 'init')
							for(var changeEvent of snapshot.docChanges){
								context.commit("updateOrder", changeEvent)
							}
						},
						onError: function(err) {
							console.error('the watch closed because of error', err)
						}
					})
					resolve(res)
				})
				.catch(res => {
					reject(res)
				})
			})
			
			
		}
	},
	getters: {
		getAllOrders(state){
			return state.orderList
		},
		getUnsolvedOrders(state){
			return state.orderList.filter(order => !order.solved)
		},
		getNotEvalueOrders(state){
			return state.orderList.filter(order => order.point === -1)
		},
		getOrder(state){
			return state.orderList.find(order => order._id === state.idToBeSearch)
		}
	}
}