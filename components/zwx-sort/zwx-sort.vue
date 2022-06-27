<template>
	<view class="sortContent">
		<view class="sortCondition">
			<view class="conditionList" v-for="(item,index) in topicArr" :key="index">
				<view class="listParent" :data-tabtopic="sortlist[index]" :data-index="index" :data-name="item" @click="topicClick">
					<text :class="item.length>4?'isovertext':''">{{item}}</text>
					<i
						:class="topicIndex==index && topicStatu ?'iconfont el-icon-thirdshengji' :'iconfont el-icon-thirdshengji-copy'"></i>
				</view>
			</view>
		</view>
		<!-- 筛选面板数据 -->
		<view class="panelMask" v-if="topicStatu" @touchmove.stop.prevent="moveHandle"></view>
		<view class="condition-panel" v-for="(item,index) in panelData" :key="index"
			v-if="topicIndex==index && topicStatu">
			<view class="ranking" v-if="currentTap=='美食'">
				<view class="panelList" v-for="(childitem,childindex) in item.children" :key="childindex"
					:data-index="childindex" :data-name="childitem.name" @click="screenClick">
					<text :class="deliciousindex==childindex?'delicious':''">{{childitem.name}}</text>
					<text class="stopNumber" v-if="childitem.stopnum>0">{{childitem.stopnum}}</text>
				</view>
			</view>
			<view class="ranking" v-else-if="currentTap=='智能排序'">
				<view class="panelList" v-for="(recommendationitem,recommenindex) in item.children"
					:key="recommenindex">
					<view :data-index="recommenindex" :data-name="recommendationitem.name" @click="screenClick">
						<text
							:class="recommendationindex==recommenindex?'recommendation':''">{{recommendationitem.name}}</text>
					</view>
				</view>
			</view>
			<view class="nearby" v-else-if="currentTap=='附近'">
				<view class="childTab" v-for="(childtabitem,childtanindex) in item.children" :key="childtanindex">
					<view class="tabList">
						<view :class=" tapindex==childtanindex?'tabtopic tabtopicActive':'tabtopic '"
							
							:data-index="childtanindex" @click="tabClick">{{childtabitem.name}}
						</view>
						<view class="childContent" v-if="tapindex==childtanindex">
							<view class="contentList"
								v-for="(childcontentitem,chilcontentindex) in childtabitem.children"
								:key="chilcontentindex">
								<view :class="contentindex==chilcontentindex &&tabName==childtabitem.name ?childcontentitem.children&&childcontentitem.children.length>0?
								'contentopic contentopicActive':'contentopic contentActive':'contentopicdefault'"
									:data-index="chilcontentindex" :data-name="childcontentitem.name"
									:data-parentname="childtabitem.name"
									@click.stop="contentClick">
									{{childcontentitem.name}}
								</view>
								<view class="specific" v-if="contentindex==chilcontentindex && 
									childcontentitem.children && 
									childcontentitem.children.length>0">
									<view class="specificList"
										v-for="(specificitem,index) in childcontentitem.children"
										:key="index" :data-index="index" :data-name="specificitem.name"
										:data-parentname="childcontentitem.name"
										@click.stop="specificClick">
										<view :class="specificindex==index && specificName==childcontentitem.name?'specificActive':'specificcontent'">
											{{specificitem.name}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="screen" v-else-if="currentTap=='筛选'">
				<view class="screenList" v-for="(screenitem,screenindex) in item.children" :key="screenindex">
					<view class="screenTopic">{{screenitem.name}}</view>
					<view class="screenContent">
						<view v-for="(screenchilditem,screenchildindex) in screenitem.children" :key="screenchildindex">
							<view :class="screenchildindex==currentscreenindex?'screentext colorChange':'screentext'">
								<view :data-index="screenchildindex" :data-name="screenchilditem.name"
									@click="screenClick">{{screenchilditem.name}}</view>
							</view>
						</view>

					</view>
				</view>
				<view class="operateBtn">
					<button class="reset" @click="reset">重置</button>
					<button class="sure" @click="sure">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'sort',
		props: {
			sortlist: {
				type: Array,
				default: () => []
			},
			panelData: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				topicArr: [],
				panelArr: [],
				currentTap: null,
				topicIndex: 0,
				tapindex: 0,
				deliciousindex: 0,
				recommendationindex: 0,
				contentindex: 0,
				specificindex: -1,
				currentscreenindex: -1,
				topicStatu: false,
				currentspecific:null,
				tabName:null,
				specificName:null
			}
		},
		mounted() {
			this.topicArr = JSON.parse(JSON.stringify(this.sortlist))
		},
		methods: {
			topicClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const tabtopic = e.currentTarget.dataset.tabtopic;
				this.currentTap = tabtopic;
				if (this.topicIndex == index) {
					this.topicStatu = !this.topicStatu
					return
				}
				this.topicStatu = true;
				this.topicIndex = index;
				this.panelArr = this.panelData;
			},
			tabClick(e) {
				const index = e.currentTarget.dataset.index;
				this.tapindex = index;
				// this.contentindex = -1;
			},
			contentClick(e) {
				
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const parentname = e.currentTarget.dataset.parentname;
				this.tabName=parentname;
				this.contentindex = index;
				this.topicStatu = false;
				if(name!=='全城') return
				this.updatetopic(name)
			},
			specificClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				const parentname = e.currentTarget.dataset.parentname;
				this.specificName=parentname;
				this.specificindex = index;
				this.topicStatu = false;
				this.updatetopic(name)
			},
			screenClick(e) {
				const index = e.currentTarget.dataset.index;
				const name = e.currentTarget.dataset.name;
				switch (this.currentTap) {
					case "美食":
						this.updatetopic(name)
						this.deliciousindex = index;
						this.topicStatu = false;
						return;
					case "智能排序":
						this.updatetopic(name)
						this.recommendationindex = index;
						this.topicStatu = false;
						return;
					case "筛选":
						this.currentspecific=name;
						if (this.currentscreenindex == index) {
							this.currentscreenindex = -1;
							return
						}
						this.currentscreenindex = index;
						return;
				}
			},
			updatetopic(name){
				let index=this.sortlist.indexOf(this.currentTap);
				this.topicArr[index]=name
				this.$emit("conditionName", name)
			},
			reset() {
				this.currentscreenindex = -1;
			},
			sure(){
				this.topicStatu = false;
				this.$emit("conditionName", this.currentspecific)
			}
		}
	}
</script>

<style>
	@import url("./css/iconfont.css");
	@import url("./css/sort.css");
</style>
