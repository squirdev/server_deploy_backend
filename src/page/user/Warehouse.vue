<template>
	<div class="chicangcontainer">
		<div class="toubu">
			<div class="tl"></div>
			<a class="tr" @click="getsearch"></a>
		</div>
		<div class="dabokl">
			<div class="sert">
				<span v-for="(item, index) in chicangList" :key="index" @click="chicangidx = index"
					:class="chicangidx == index ? 'sdpl' : ''">{{ item.name }}</span>
				<a :style="chicangidx == 0 ? 'left: 0.8rem;' : 'left: 4.54rem;'"></a>
			</div>
			<div class="bnm"></div>
		</div>
		<div class="chicanglistmain">

			<van-list v-model="loading" :finished="finished" :finished-text="$t('hj43')" v-show="chicangidx === 0"
				@load="onLoad" :immediate-check="immediate">
				<div class="cichang" @click="goDetail(item, index)" v-for="(item,index) in tabsPositionNumArr"
					:key="item.buyOrderId">
					<div class="dingbu">
						<div class="dl">
							<h6>{{ item.stockName ? item.stockName : item.indexName }}</h6>
							<p>
								<span v-show="(item.stockGid.indexOf('sz')>=0)">深</span>
								<span class="sh" v-show="(item.stockGid.indexOf('sh')>=0)">沪</span>
								<span class="bj" v-show="(item.stockGid.indexOf('bj')>=0)">北</span>
								<a class="">{{item.stockGid}}</a>
							</p>
						</div>
						<div class="oper-btns">
							<div 
  								class="dr" 
  								:class="{ disabled: isChineseHoliday() }"
  								v-if="chicangidx == 0"
  								@click="!isChineseHoliday() && showPingCangDialog(item)" 
  								:title="isChineseHoliday() ? '今天是假期，无法卖出股票' : ''"
							>
  								卖出
							</div>
							<div
  								class="dr" 
  								:class="{ disabled: isChineseHoliday() }"
  								v-if="chicangidx == 0" 
  								@click="!isChineseHoliday() && showBuCangDialog(item)" 
  								:title="isChineseHoliday() ? '今天是假期，无法买入股票' : ''"
							>
								买入
							</div>
						</div>


					</div>
					<!--  -->
					<div class="fudo" v-if="chicangidx == 0 &item.ykl==0">
						<h6> 最新<span :class="item.profitAndLose-item.orderFee>0?'red':'green'" >{{ (item.now_price/100).toFixed(4) }}元/手  </span></h6>
						<p>{{ item.buyOrderTime | gettime }}</p>
					</div>
					<div class="fudo" v-if="chicangidx == 0 &item.ykl!=0">
						<h6> 最新 <span :class="item.profitAndLose-item.orderFee>0?'red':'green'" >{{ (item.now_price/100).toFixed(4) }}元/手  {{ item.ykl }}%</span></h6>
						<p>{{ item.buyOrderTime | gettime }}</p>
					</div>
					<div class="fudo" v-else>
						<h6> 卖出时间 </h6>
						<p>2022-12-03 13:21</p>
					</div>
					<div class="fudong redbg">
						<div class="kuij">

							<p><span>浮动盈亏：</span><a
									:class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.profitAndLose}}元</a></p>
						<!-- 	<p><span>总盈亏：</span><a
									:class="item.allProfitAndLose>0?'red':'green'">{{item.allProfitAndLose}}元</a></p> -->
									<p><span>总盈亏：</span><a
											:class="item.profitAndLose-item.orderFee>0?'red':'green'">{{(item.profitAndLose-item.orderFee).toFixed(2)}}元</a></p>
							

						</div>
					</div>
					<div class="plkm">
						
						<p><span>买入价格</span><a
								:class="item.profitAndLose-item.orderFee>0?'red':'green'">{{(item.buyOrderPrice/100)}}/手</a></p>
						<p><span>买入天数</span><a :class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.orderStayDays}}天</a></p> 
						<p><span>数量</span><a :class="item.profitAndLose-item.orderFee>0?'red':'green'">{{(item.orderNum/100)}}手</a></p>
						<p><span>杠杆</span><a :class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.orderLever}}倍</a></p>
						<p><span>保证金</span><a
								:class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.orderTotalPrice / item.orderLever}}元</a>
						</p>

						<p><span>买入手续费</span><a :class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.orderFee}}元</a>
						</p>
						<p><span>市值</span><a
							:class="item.profitAndLose-item.orderFee>0?'red':'green'">{{item.orderTotalPrice}}元</a></p>
						<p><span>盈亏率</span><a :class="item.profitAndLose-item.orderFee>0?'red':'green'">{{((item.now_price - item.buyOrderPrice ) / item.buyOrderPrice *100).toFixed(2)}}%</a></p>
					</div>
				</div>
			</van-list>
			<!-- <p v-if="chicangidx == 1"><span>递延费</span><a class="red">49959.00</a></p> -->
			<!-- 平仓 -->
			<van-list v-model="loadings" :finished="finisheds" :finished-text="$t('hj43')" @load="onLoads"
				:immediate-check="immediate" v-show="(chicangidx === 1)">
				<div class="cichang" @click="goDetail(item, index)" v-for="(item,index) in tabsPcArr" :key="item.id">
					<div class="dingbu">
						<div class="dl">
							<h6>{{ item.stockName ? item.stockName : item.indexName }}</h6>
							<p>
								<span v-show="(item.stockGid.indexOf('sz')>=0)">深</span>
								<span class="sh" v-show="(item.stockGid.indexOf('sh')>=0)">沪</span>
								<span class="bj" v-show="(item.stockGid.indexOf('bj')>=0)">北</span>
								<a class="">{{item.stockGid}}</a>
							</p>
						</div>
						<div class="dr" v-if="chicangidx == 0"> 平仓 </div>
					</div>
					<div class="fudo" v-if="chicangidx == 0">
						<h6> 最新 <span :class="item.allProfitAndLose>0?'red':'green'">{{ (item.now_price/100).toFixed(4) }}元/手</span></h6>
						<p>{{ item.buyOrderTime | gettime }}</p>
					</div>
					<div class="fudo" v-else>
						<h6> 卖出时间 </h6>
						<p>{{item.sellOrderTime | gettime}}</p>
					</div>
					<div class="fudong redbg">
						<div class="kuij">
							<p><span>浮动盈亏：</span><a
									:class="item.profitAndLose>0?'red':'green'">{{item.profitAndLose}}元</a></p>
							<p><span>总盈亏：</span><a
									:class="item.allProfitAndLose>0?'red':'green'">{{item.allProfitAndLose}}元</a></p>
								
						</div>
					</div>
					<div class="plkm">
						<p><span>买入价格</span><a
								:class="item.allProfitAndLose>0?'red':'green'">{{(item.buyOrderPrice/100).toFixed(4)}}/手</a></p>
						<p><span>数量</span><a :class="item.allProfitAndLose>0?'red':'green'">{{item.orderNum/100}}手</a></p>
						<p><span>杠杆</span><a :class="item.allProfitAndLose>0?'red':'green'">{{item.orderLever}}倍</a></p>
						<p><span>保证金</span><a
								:class="item.allProfitAndLose>0?'red':'green'">{{item.orderTotalPrice / item.orderLever}}元</a>
						</p>
						<p><span>买入手续费</span><a :class="item.allProfitAndLose>0?'red':'green'">{{item.orderFee}}元</a>
						</p>
						<p><span>卖出手续费</span><a
								:class="item.allProfitAndLose>0?'red':'green'">{{item.sellOrderFee}}元</a></p>
						<p><span>卖出价格</span><a
								:class="item.allProfitAndLose>0?'red':'green'">{{(item.sellOrderPrice/100).toFixed(4)}}/手</a></p>
						<p><span>市值</span><a
								:class="item.allProfitAndLose>0?'red':'green'">{{item.orderTotalPrice}}元</a></p>	
						
						<p><span>印花税</span><a :class="item.allProfitAndLose>0?'red':'green'">{{item.orderSpread}}元</a>
						<p><span>买入天数</span><a :class="item.allProfitAndLose>0?'red':'green'">{{item.orderStayDays}}天</a></p> 
						<p><span>盈亏率</span><a :class="item.allProfitAndLose>0?'red':'green'">{{((item.sellOrderPrice-item.buyOrderPrice)/ item.buyOrderPrice *100).toFixed(2)}}%</a></p>
						</p>
					</div>
				</div>
			</van-list>

		</div>
		<div style="height:2rem">

		</div>

		<van-dialog className="pcDialogClass" style="width: 80%;font-size: 20px;" v-model="showPcDialog" title="平仓"
			@confirm="pingcangDialogConfirm" show-cancel-button>
			<div>
				<div class="plkm detail">
					<div class="detailItem"><span>股票名称：</span><a class="red">{{isShowPingCangInfo.stockName}}</a></div>
					<div class="detailItem"><span>股票代码：</span><a class="red">{{isShowPingCangInfo.stockGid}}</a></div>
					<div class="detailItem"><span>当前价格：</span><a class="red">{{(isShowPingCangInfo.now_price/100).toFixed(4)}}/手</a>
					</div>
					<div class="detailItem"><span>持有数量：</span><a class="red">{{(isShowPingCangInfo.orderNum/100).toFixed(4)}}手</a></div>
					<div class="detailItem"><span>可用数量：</span><a class="red">{{(isShowPingCangInfo.canSellNum/100).toFixed(4)}}手</a>
					</div>
					<div class="detailItem"><span>浮动盈亏：</span><a class="red">{{isShowPingCangInfo.profitAndLose}}元</a>
					</div>
				</div>
				<div style="padding: 20px 0;border-bottom: solid 1px #ccc;">
					<van-field style="font-size: 15px;" v-model="sellNum" type="digit" @input="sellNumBlur" label="平仓数量"
						placeholder="请输入平仓数量" />
				</div>
			</div>
		</van-dialog>

		<van-dialog className="pcDialogClass" style="width: 80%;font-size: 20px;" v-model="showBcDialog" title="补仓"
			@confirm="buCangDialogConfirm" show-cancel-button>
			<div>
				<div class="plkm detail">
					<div class="detailItem"><span>股票名称：</span><a class="red">{{isShowBuCangInfo.stockName}}</a></div>
					<div class="detailItem"><span>股票代码：</span><a class="red">{{isShowBuCangInfo.stockGid}}</a></div>
					<div class="detailItem"><span>当前价格：</span><a class="red">{{(isShowBuCangInfo.now_price/100).toFixed(4)}}/手</a></div>
					<div class="detailItem"><span>持有数量：</span><a class="red">{{(isShowBuCangInfo.orderNum/100)}}手</a></div>
				</div>
				<div style="padding: 20px 0;border-bottom: solid 1px #ccc;">
					<van-field style="font-size: 15px;" v-model="buyNum" type="digit" label="补仓数量"
						placeholder="请输入补仓数量" />
				</div>
			</div>
		</van-dialog>
	</div>
</template>
<script>
	import {
		Toast,
		Dialog,
		Divider
	} from 'vant';
	import {
		MessageBox
	} from 'mint-ui'
	import * as api from '@/axios/api'
	import {
		getCanSell,
		getRealTimeData
	} from '../../axios/api'
	export default {

		
		components: {

		},
		props: {},
		data() {
			return {
				sellNum: '',
				buyNum: '',
				showPcDialog: false,
				headertab: 0,
				chicangList: [{
						name: '我的持仓',
					},
					{
						name: '我的平仓',
					}
				],
				chicangidx: 0,
				loading: false,
				loadings: false,
				finished: false,
				finisheds: false,
				page: 1,
				pages: 1,
				immediate: false,
				tabsPositionNumArr: [],
				tabsPcArr: [],
				buyAccount: "",
				isShowPingCangInfo: {},
				isShowPingCangInfoCopy: {},
				timer1: null,
				showBcDialog: false,
				isShowBuCangInfo: {}
			}
		},

		mounted() {
			this.getUserInfo()
			this.getListDetail()
			this.getListDetails()

			this.timer1 = setInterval(() => {
				this.refreshCurrPrice()
			}, 1000);
		},

		beforeDestroy() {
			clearInterval(this.timer1);
		},

		methods: {
			isChineseHoliday() {
				const today = new Date();
				const year = today.getFullYear();
				const month = today.getMonth() + 1;
				const day = today.getDate();
				const weekDay = today.getDay();

				const fixedHolidays = [
					`${year}-01-01`,
					`${year}-01-28`, 
					`${year}-01-29`, 
					`${year}-01-30`, 
					`${year}-01-31`, 
					`${year}-02-01`,
					`${year}-02-02`,
					`${year}-02-03`,
					`${year}-02-04`,
					`${year}-04-04`,
					`${year}-04-05`,
					`${year}-05-01`,
					`${year}-05-02`,
					`${year}-05-03`,
					`${year}-05-04`,
					`${year}-05-05`,
					`${year}-06-01`,
					`${year}-06-02`,
					`${year}-10-01`,
					`${year}-10-02`,
					`${year}-10-03`,
					`${year}-10-04`,
					`${year}-10-05`,
					`${year}-10-06`,
					`${year}-10-07`,
					`${year}-10-08`,
				];

				//check if Sunday or Saturday
				if (weekDay === 0 || weekDay === 6) return true;
						
				const todayStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
				console.log(todayStr)
				return fixedHolidays.includes(todayStr);
			},
			refreshCurrPrice() {
				if (!this.tabsPositionNumArr || this.tabsPositionNumArr.length === 0) {
					return;
				}
				const stockCodes = this.tabsPositionNumArr.map(item => item.stockGid);
				const uniqueArray = [...new Set(stockCodes)];		
				//console.log(uniqueArray)
				api.getRealTimeData(uniqueArray).then(res => {

					const priceMap = res.data;

					this.tabsPositionNumArr.forEach(pos => {

						const priceDto = priceMap[pos.stockGid];
						if (!priceDto) {
							return;
						}

						let profitAndLose = (priceDto.price - pos.buyOrderPrice) * pos.orderNum;
						if ("买跌" === pos.orderDirection) {
							profitAndLose = -profitAndLose;
						
						}
						const allProfitAndLose = profitAndLose - pos.orderFee - pos.orderSpread - pos
							.orderStayFee - pos.spreadRatePrice;
							pos.now_price = priceDto.price;

						pos.ykl = priceDto.changeRateStr;
						pos.profitAndLose = profitAndLose.toFixed(2);
						pos.allProfitAndLose = allProfitAndLose.toFixed(2);
						
						if (priceDto.price ==0) {
							pos.ykl = 0
							pos.now_price = priceDto.preclose;
							pos.profitAndLose =((priceDto.preclose - pos.buyOrderPrice) * pos.orderNum).toFixed(2);;
						
						} 
					});


				});



			},
			getxxTime(time) {
				return ((new Date().getTime() / 1000) - (time / 1000)) / 60;
			},
			getday(time) {
				let timer = (((new Date().getTime() / 1000) - (time / 1000)) / 86400).toFixed(0);
				return timer * 1;
			},
			isToday(dateStr) {
				console.log('dateStr', dateStr);
				// 确保两个日期按时间顺序排列
				const d1 = new Date(dateStr);
				const d2 = new Date();


				// 获取两个日期的年份、月份和日期
				const year1 = d1.getFullYear();
				const month1 = d1.getMonth();
				const day1 = d1.getDate();

				const year2 = d2.getFullYear();
				const month2 = d2.getMonth();
				const day2 = d2.getDate();

				// 计算日期差
				const dateDiff = (new Date(year2, month2, day2) - new Date(year1, month1, day1)) / (1000 * 60 * 60 * 24);

				return dateDiff === 0;
			},
			//进入详情
			goDetail(item) {
				console.log(item)
				var codes = "";
				var names = "";
				var stock_type = "";
				var soks = "";
				var if_zhishu = '0';
				var if_us = '';
				codes = item.stockCode;
				names = item.stockName;
				stock_type = this.filterSH(item.stockGid);
				soks = this.filterSH(item.stockGid);
				if_zhishu = '0';
				if_us = '';

				//   this.$router.push({
				//     path: "/kline",
				//     query: {
				//       name: names,
				//       stockplate: item.stock_plate,
				//       code: codes,
				//       type: stock_type,
				//       sok: soks,
				//       if_us: if_us,
				//       usType: item.type,
				//       if_zhishu: if_zhishu,
				//     }
				//   });
			},

			filterSH(val) {
				if (val.indexOf('sh') >= 0) {
					return 1;
				} else if (val.indexOf('bj') >= 0 || val.indexOf('sz') >= 0) {
					return 0;
				}
			},
			onLoad() {
				//持仓
				this.page++;
				switch (this.chicangidx) {
					case 0:
						//沪深京持仓
						this.getListDetail();
						break;
					case 1:
						//指数持仓
						//   this.getzhishuListDetail();
						break;

					default:
						break;
				}
			},
			getsearch() {
				this.$router.push({
					path: '/Searchlist'
				})
			},
			onLoads() {
				//平仓
				this.pages++;
				//沪深京平仓
				this.getListDetails();
			},
			async showPingCangDialog(item) {
				this.sellNum = ''
				this.isShowPingCangInfo = {
					...item
				}
				this.isShowPingCangInfoCopy = {
					...item
				}
				this.isShowPingCangInfo.profitAndLose = "-"

				const data = await api.getCanSell({
					positionSn: this.isShowPingCangInfo.positionSn,
					
				})

				this.isShowPingCangInfo.canSellNum = data.data || 0;

				this.showPcDialog = true
			},
			showBuCangDialog(item) {
				this.buyNum = null;
				this.isShowBuCangInfo = {
					...item
				}
				this.showBcDialog = true
			},
			sellNumBlur(e) {
				console.log('sss', this.sellNum);
				if (!this.sellNum) {
					this.isShowPingCangInfo.profitAndLose = "-"
				} else if (this.sellNum > this.isShowPingCangInfo.orderNum) {
					console.log('eee', this.isShowPingCangInfo);
					// this.isShowPingCangInfo.profitAndLose = this.isShowPingCangInfo.orderNum
					this.isShowPingCangInfo.profitAndLose = "-"
					Toast('超过持有数量')
				} else {
					// this.isShowPingCangInfo.profitAndLose = this.isShowPingCangInfoCopy.profitAndLose
					this.isShowPingCangInfo.profitAndLose = ((Number(this.isShowPingCangInfoCopy.profitAndLose) / this
						.isShowPingCangInfo.orderNum) * this.sellNum).toFixed(2)
				}
			},
			async buCangDialogConfirm() {
				let data = await api.buy2({
					buyNum: this.buyNum,
					positionSn: this.isShowBuCangInfo.positionSn
				})
				console.log('000', data)
				if (data.status === 0) {
					Toast(data.msg)
					this.tabsPositionNumArr.forEach(pos => {
						if (pos.id === data.data.id) {
							Object.assign(pos, data.data)
						}
					})
				} else {
					Toast(data.msg)
				}
			},
			async pingcangDialogConfirm() {
				if (this.sellNum > Number(this.isShowPingCangInfo.orderNum)) {
					Toast('不能超过！')
				} else {
					let data = await api.sell({
						sellNum: this.sellNum,
						positionSn: this.isShowPingCangInfo.positionSn
					})
					if (data.status === 0) {
						Toast(data.msg)
						if (data.data.sellOrderId) {
							this.tabsPositionNumArr = this.tabsPositionNumArr.filter(pos => {
								return pos.id !== data.data.id;
							});
						} else {
							this.tabsPositionNumArr.forEach(pos => {
								if (pos.id === data.data.id) {
									Object.assign(pos, data.data);
								}
							});
						}

						this.tabsPcArr = [];
						this.pages = 0;
						this.onLoads();

					} else if (data.msg.indexOf('不在交易时段内') > -1) {
						Toast(this.$t('hj140'))
					} else {
						Toast(data.msg)
					}
				}

			},
			getpingcang(val) {
				// if (!this.$store.state.userInfo.idCard) {
				//     Toast(this.$t('hj138'))
				//     this.$router.push('/authentications')
				//     return
				// }
				if (this.chicangidx == 0) {
					//沪深京
					MessageBox.confirm(this.$t('hj139') + '?', this.$t('hj165'), {
						confirmButtonText: this.$t('hj161'),
						cancelButtonText: this.$t('hj106'),
					}).then(async () => {
						let opt = {
							positionSn: val
						}
						let data = await api.sell(opt)
						if (data.status === 0) {
							Toast(data.msg)
							//沪深京持仓
							this.finished = false;
							this.getListDetail();
							this.tabsPositionNumArr = []
							//沪深京平仓
							this.finisheds = false;
							this.tabsPcArr = [];
							this.getListDetails();

						} else if (data.msg.indexOf('不在交易时段内') > -1) {
							Toast(this.$t('hj140'))
						} else {
							Toast(data.msg)
						}
					}).catch(() => {

					});
				}
			},
			async getListDetails() {
				//获取沪深我的平仓列表
				this.loadings = true;
				let opt = {
					state: 1,
					stockCode: '', // 代码
					stockSpell: '', // 简拼
					pageNum: this.pages,
					pageSize: 15
				}
				let data = await api.getOrderList(opt)
				this.loadings = false;
				if (data.status === 0) {
					if (data.data.list.length < 15) {
						this.finisheds = true;
					}
					data.data.list.sort(function (a, b) {
					    return b.sellOrderTime - a.sellOrderTime;
					});
					// console.log(data.data.list)
					data.data.list.forEach(element => {											
						this.tabsPcArr.push(element)
					})
					this.totals = data.data.total
				} else {
					Toast(data.msg)
				}
			},
			async getListDetail() {
				//获取沪深我的持仓列表
				this.loading = true;
				let opt = {
					state: 0,
					stockCode: '', // 代码
					stockSpell: '', // 简拼
					pageNum: this.page,
					pageSize: 15,
				}
				let data = await api.getOrderList(opt)
				this.loading = false;
				if (data.status === 0) {
					if (data.data.list.length < 15) {
						this.finished = true;
					}
					data.data.list.forEach(element => {
						this.tabsPositionNumArr.push(element)
					})
					//this.total = data.data.total
				} else {
					Toast(data.msg)
				}
			},
			async getSettingInfo() {
				let data = await api.getSetting()
				if (data.status === 0) {
					// 成功
					this.settingInfo = data.data
				} else {
					Toast(data.msg)
				}
			},
			async getUserInfo() {
				// 获取用户信息
				let data = await api.getUserInfo()
				if (data.status === 0) {
					this.$store.state.userInfo = data.data
					let tempcount = this.$store.state.userInfo.id.toString().length;
					let str = '60753';

					if (tempcount < 3) {
						for (let index = 0; index <= tempcount; index++) {
							str += '0';
						}
					}

					this.buyAccount = str + this.$store.state.userInfo.id;

				} else {
					Toast(data.msg)
				}
				this.$store.state.user = this.user
			},
			
		},
		filters: {
			gettime(time) {
				if (!time) {
					return "";
				}
				var nd = new Date(time);
				var y = nd.getFullYear();
				var mm = nd.getMonth() + 1;
				var d = nd.getDate();
				var h = nd.getHours();
				var m = nd.getMinutes();
				var c = nd.getSeconds();
				if (mm < 10) {
					mm = "0" + mm;
				}
				if (d < 10) {
					d = "0" + d;
				}
				if (h < 10) {
					h = "0" + h;
				}
				if (m < 10) {
					m = "0" + m;
				}
				if (c < 10) {
					c = "0" + c;
				}
				//17:35:2922-06-2022
				return y + '-' + mm + '-' + d + ' ' + h + ":" + m + ":" + c;
			}
		}
	}
	
</script>


<style>
	.pcDialogClass .van-dialog__cancel {
		font-size: 20px !important;
	}

	.pcDialogClass .van-dialog__confirm {
		font-size: 20px !important;
	}
</style>
<style lang="less" scoped>
	// ::v-deep
	.detail {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}

	.detailItem {
		font-size: 20px;
		width: 100%;
		margin-bottom: 20px;
	}

	.red {
		color: #d73d3d !important;
	}

	.green {
		color: #20b844 !important;
	}

	.redbg {
		background: #a8a8a849 !important;
	}

	.greenbg {
		background: #dcf7ee !important;
	}

	.chicangcontainer {}

	.toubu {
		width: 100%;
		height: 1.60rem;
		background: linear-gradient(#f44336);
		display: flex;
		justify-content: space-between;

		.tr {
			width: 0.43rem;
			height: 0.43rem;
			background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA4dJREFUWEe9l0msn2MUxn8PYl4QolhIKhYS00JalAiCIIbeBg1FSrsTQxcsGrEo3WBR0pWZkjSGVEpMiSkiTRPTgkhKYiaGiilmHnna8/H1/r//4N6/+27u/X/vec953nPOc855xZBle39gAXAycCiwH7Ar8C3wIfAa8DTwhKSfh+mbvK9+B2wfCKwAFgI7jKD4G+BW4BZJP40gv0WkB4DtfLsaWAns0lL0MfAq8CnwA7AbcAhwHLBTS+4D4CJJr4wCYhsAtrcH7gQW12EDj9atNnYptL07MAEsBw4umd+ByyQ9MAzEPwDq5vcHfR36qG7y8jAl2be9HXANcGOF7M86v3bQ+TaAK4DbSjiuPk3S5lGMt2Vsnwo8DuwIJBfmSnq7n54tAGzPBiKUmCfWR0r66r8ab+Rtnw08VjmW0M2T9FeXvgbAmnJ9Yn6SpBenarwFYhVwVf1eKOmhTgC2ZwGfVNzWSQrnp71s7wG8D+TvBknz+gG4HFhdmydIemna1hsK2akLV9bP2ZJC0W2WbK8D5gOJ+SxJCcNYlu3jgeZCSyTd3QXgXeAgYL2kc8Zi+V8PJKl/BELRVZKWdQGIQKraakmh4liX7c+qf6yVdEEXgMblN0u6dqzWt1I8DeuAfh5ODqSJ7AncJWnp/wCg0b9G0iVdHngTOGIQVaYKyva+wOd1fqWk67oApPksAX4D9pKUnBjLsn0h8GApm5CU6thDw3OBh+vrpZLuHYv1rfF/LpUV+LUo/l0XgJ2r/u8NvAMcLumP6YKwPRdoWngnA2Kj6QWJzQ1l9HpJzf9TwmE7A0o6aka4sCzN7Y0uZQ2AzHhvAemK6eMLJK2fivWaC+5rzRUD2dWeB44Fnq8+npgtHWWiaYO0nXDeDlxc3zcBcyR93+8yk0eyRUCmopTOuC4MWS7p62HesH0UcAdwWMl+kXlR0nuDznYNpecD99TonbOhZagUpmxsaFquToU7BTivxvZGX/rLGZmGgHTbFZKe6ZsDkzdsJ3nSueZ0HPoSCEv26RjX47WAXxa3294AHF01Zr6kp3po2M89dcN4I/38mCEhSM6kyNwk6fVG1vbp9T3zYQpdD4i+D5NJyZVHyokV37yU8lD5pSae0O0FSXkp9SzbZwGPVHL3gBgJwLAEHLY/CMSMAAjADhDpDU/OGIACcWa9tJqcmJhRAB0gNs84gBaIFLxn/wb6PUsFkO1mDQAAAABJRU5ErkJggg==) no-repeat 50%;
			background-size: 100%;
			margin-right: 0.40rem;
			margin-top: 0.32rem;
		}
	}

	.dabokl {
		width: 100%;
		min-height: 1.07rem;
		border-radius: 0.4rem 0.4rem 0 0;
		margin-top: -0.4rem;
		background: #fff;

		.sert {
			width: 5.34rem;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			position: relative;
			height: 1.07rem;

			span {
				text-align: center;
				color: #666;
				font-size: .4rem;
				font-weight: 550;
				line-height: 1.07rem;
			}

			.sdpl {
				color: #517afa;
			}

			a {
				width: 0.53rem;
				height: 0.11rem;
				background: #517afa;
				border-radius: 0.05rem;
				position: absolute;
				bottom: 0;
				margin-left: -0.266rem;
				transition: all .5s;
			}
		}

		.bnm {
			height: 0.03rem;
			width: 100%;
			background: #e0e0e0;
		}
		
	}

	.chicanglistmain {
		.cichang {
			width: 100%;
			border-bottom: 1px solid #e0e0e0;
			padding: 0.4rem 0;

			.dingbu {
				width: 9.35rem;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;

				.dl {
					h6 {
						color: #333;
						font-size: .4rem;
						font-weight: 500;
					}

					p {
						color: #333;
						font-size: .32rem;
						margin-top: 0.13rem;

						span {
							width: 0.4rem;
							height: 0.4rem;
							background: #3b4fde;
							border-radius: 0.05rem;
							text-align: center;
							line-height: .4rem;
							color: #fff;
							font-size: .3rem;
							display: inline-block;
						}

						a {
							display: inline-block;
							height: 0.4rem;
							line-height: .4rem;
							padding: 0 0.11rem;
							background: rgba(59, 79, 222, .1);
							border-radius: 0.05rem;
							color: #3b4fde;
							font-size: .32rem;
							vertical-align: middle;
						}

						.bj {
							background: #ea6248;
						}

						.sh {
							background: #aa3bde;
						}

						.shbg {
							color: #aa3bde;
							background: rgba(170, 59, 222, .1);
						}

						.bjbg {
							color: #ea6248;
							background: rgba(234, 98, 72, .1);
						}
					}
				}

				.dr {
					width: 1.6rem;
					height: 0.67rem;
					background: linear-gradient(-55deg, #F44336, #F44336);
					border-radius: 0.35rem;
					margin-top: 0.13rem;
					text-align: center;
					color: #fff;
					font-size: .32rem;
					line-height: .67rem;
				}
			}

			.fudo {
				width: 9.35rem;
				margin: 0 auto;
				margin-top: 0.4rem;
				display: flex;
				justify-content: space-between;

				h6 {
					color: #333;
					font-size: .37rem;

					span {
						font-weight: 600;
					}
				}

				p {
					color: #666;
					font-size: .32rem;
				}
			}

			.fudong {
				width: 100%;
				height: 0.8rem;
				margin: 0 auto;
				margin-top: 0.4rem;

				.kuij {
					width: 9.35rem;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;

					p {
						width: 47%;
						line-height: .8rem;
						display: flex;
						justify-content: space-between;

						span {
							color: #666;
							font-size: .32rem;
						}

						a {
							font-size: .32rem;
						}
					}
				}
			}

			.plkm {
				display: flex;
				justify-content: space-between;
				width: 9.35rem;
				margin: 0 auto;
				flex-wrap: wrap;

				p {
					width: 47%;
					margin-top: 0.4rem;
					display: flex;
					justify-content: space-between;

					span {
						color: #666;
						font-size: .32rem;
					}

					a {
						font-size: .32rem;
					}
				}
			}
		}
	}

	/* Disabled state */
	.dr.disabled {
		background-color: #ffffff !important; /* More white when disabled */
		color: #bbb !important; /* Lighter text */
		cursor: not-allowed !important; /* Disable cursor */
		opacity: 0.6; /* Make it look disabled */
		}
	.oper-btns {
		display: flex;

		.dr {
			margin-left: 0.2rem;
		}
	}
</style>