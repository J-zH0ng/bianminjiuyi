import App from './App'
import store from 'store/index.js'
// #ifndef VUE3
import Vue from 'vue'

// 引入uView主JS库
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

import sort from "./components/zwx-sort/zwx-sort"
Vue.component("sort",sort)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif