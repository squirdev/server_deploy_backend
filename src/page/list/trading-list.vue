<template>
	<div class="stocklistcontainer">
		<!--  <div class="toubu">
            <div class="tl">
                <span :class="headertab == 0 ? 'xuank' : ''" @click="headertab = 0">行情</span>
               
            </div>
            <a class="tr" @click="getsearch"></a>
        </div>-->
		<div class="toubu">
			<div class="tl">
				<span>行情</span>
				<span @click="$router.push('/MyList')">自选</span>
			</div>
			<a class="tr" @click="getsearch"></a>
		</div>
		<div class="othermain">
			<div class="daboxk">
				<div class="bankuai">
					<div class="erty" v-for="(i,index) in listArr1" :key="i.id" v-if="index<3"
						:class="i.floatRate > 0 ? 'redbg' : 'greenbg'">
						<h3 :class="i.floatRate > 0 ? 'red' : 'green'">{{i.currentPoint}}</h3>
						<h5>{{i.indexName}}<a :class="i.floatRate > 0 ? 'red' : 'green'">{{i.floatRate}}%</a></h5>
					</div>


				</div>
			</div>
			<div class="poklk">
				<span>热门股票</span>
				<a></a>
			</div>
			<div class="renmen">
				<div class="dangeh">
					<div class="dank" v-for="(item,index) in listArr" v-if="(index<6)" @click="goDetail2(item)">
						<h6>{{item.name}}</h6>
						<p class="zhangl" :class="item.changeRate>=0? 'red':'green'">{{item.price}}</p>
						<p class="bili" :class="item.changeRate>=0? 'red':'green'">{{item.change}}
							{{item.changeRateStr}}%</p>
					</div>
				</div>
			</div>
			<div class="zhnj">
				<span v-for="(item, index) in diefuList" :key="index" :class="diefuidx == index ? 'xuan' : ''"
					@click="diefuidx = index">{{ item.name }}</span>
				<a class="pokl" :style="diefuidx == 0 ? 'left:10%' : diefuidx == 1 ? 'left:30%' : ''"></a>
			</div>
			<div class="kanbox">
				<span class="k1">股票</span>
				<span class="k2">最新</span>
				<span class="k2">涨跌幅</span>
				<span class="k4">涨跌额</span>
			</div>
			<div class="kfgfd"></div>
			<div class="everylistmain">
				<van-list v-model="loading" :finished="finished" :finished-text="$t('hj43')" @load="onLoad"
					v-if="(diefuidx==0)" :immediate-check="false">
					<div class="shujuk" v-for="(item, index) in listArr" :key="index" @click="goDetail(item)">
						<div class="s1">
							<h6>{{item.name}}</h6>
							<p>
								<span v-if="(item.symbol.indexOf('sz')>=0)">深</span>
								<span class="sh" v-if="(item.symbol.indexOf('sh')>=0)">沪</span>
								<span class="bj" v-if="(item.symbol.indexOf('bj')>=0)">北</span>
								<a class="shbg">{{item.symbol}}</a>
							</p>
						</div>
						<div class="s2 " :class="item.changeRate>=0?'hqred':'hqgreen'">{{Number(item.price).toFixed(2)}}
						</div>
						<div class="s2 " :class="item.changeRate>=0?'hqred':'hqgreen'">{{item.changeRateStr}}%</div>
						<div class="s4"><a :class="item.changeRate>=0?'hqredbtnbg':'hqgreenbtnbg'">{{item.change}}</a>
						</div>
					</div>
				</van-list>
				<van-list v-model="loadings" :finished="finisheds" :finished-text="$t('hj43')" @load="onLoads"
					v-if="(diefuidx==1)" :immediate-check="false">
					<div class="shujuk" v-for="(item, index) in listArrs" :key="index" @click="goDetail(item)">
						<div class="s1">
							<h6>{{item.name}}</h6>
							<p>
								<span v-if="(item.symbol.indexOf('sz')>=0)">深</span>
								<span class="sh" v-if="(item.symbol.indexOf('sh')>=0)">沪</span>
								<span class="bj" v-if="(item.symbol.indexOf('bj')>=0)">北</span>
								<a class="shbg">{{item.symbol}}</a>
							</p>
						</div>
						<div class="s2 " :class="item.changeRate>0?'hqred':'hqgreen'">{{Number(item.price).toFixed(2)}}
						</div>
						<div class="s2 " :class="item.changeRate>0?'hqred':'hqgreen'">{{item.changeRateStr}}%</div>
						<div class="s4"><a :class="item.changeRate>0?'hqredbtnbg':'hqgreenbtnbg'">{{item.change}}</a>
						</div>
					</div>
				</van-list>
				<!-- <div class="shujuk">
                    <div class="s1">
                        <h6>格利尔</h6>
                        <p>
                            <span style="display: none;">深</span>
                            <span class="sh" style="display: none;">沪</span>
                            <span class="bj" style="">北</span>
                            <a class="bjbg">BJ831641</a>
                        </p>
                    </div>
                    <div class="s2 hqred">12.65</div>
                    <div class="s2 hqred">+31.77%</div>
                    <div class="s4"><a class="hqredbtnbg">3.05</a></div>
                </div> -->
				<!-- <div class="shujuk" v-for="i in 6">
                    <div class="s1">
                        <h6>安奈儿</h6>
                        <p><span style="">深</span><span class="sh" style="display: none;">沪</span><span class="bj"
                                style="display: none;">北</span><a class="">SZ002875</a></p>
                    </div>
                    <div class="s2 hqred">19.12</div>
                    <div class="s2 hqred">+10.01%</div>
                    <div class="s4"><a class="hqredbtnbg">1.74</a></div>
                </div> -->
			</div>
		</div>
		<div style="height:1.5rem"></div>
	</div>
</template>
<script>
	import * as api from '@/axios/api'
	import {
		gethsph,
		getQsgc
	} from '../../axios/api'
	export default {
		components: {

		},
		props: {},
		data() {
			return {
				headertab: 0,
				diefuList: [{
						name: '涨跌幅',
					},
					{
						name: '跌幅榜',
					}
				],
				diefuidx: 0,
				listArr: [],
				listArr1: [],
				listArrs: [],
				pageNum: 1,
				finished: false,
				loading: false,
				pageNums: 1,
				finisheds: false,
				loadings: false,
				timer1: null,
				timer2: null
			}
		},
		mounted() {
			this.getListMarket()
			this.getStock()
			this.getStocks()
			//
			this.timer1 = setInterval(() => {
				this.getListMarket()
			}, 1000);
			this.timer2 = setInterval(() => {
				if (this.diefuidx === 0) {
					this.getStock()
				} else {
					this.getStock()
					this.getStocks()
				}
			}, 1000);

		},
		beforeDestroy() {
			if (this.timer1) {
				clearInterval(this.timer1);
			}
			if (this.timer2) {
				clearInterval(this.timer2);
			}
		},
		methods: {
			// goDetail(item){

			//     var type = item.symbol.substring(0,2)
			//     this.$router.push({path:'/kline',query:{
			//             code:item.code,
			//             type:type,
			//         }})
			// },
			async getListMarket() {
				let val = {
					pageNum: 1,
					pageSize: 15
				};
				// 获取指数列表
				let result = await api.getListMarket2(val);
				this.loading = false;
				if (result.status === 0) {
					this.listArr1 = result.data;
				} else {
					this.texts = result.msg;
					this.alertShow = true;
				}
			},
			getsearch() {
				this.$router.push({
					path: '/Searchlist'
				})
			},
			onLoad() {
				this.pageNum++;
				this.loading = true;
				this.getStock();
			},
			onLoads() {
				this.pageNums++;
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				switch (this.diefuidx) {
					case 1:
						this.loadings = true;
						this.getStocks();
						break;
				}
			},
			async getStock() {
				//沪深升序
				let param = {
					asc: 0
				}
				let data = await api.gethsph(param)
				this.loading = false
				if (data.status === 0) {
					this.finished = true
					this.listArr = data.data
				} else {
					this.texts = data.msg
					this.alertShow = true
				}
			},
			async getStocks() {
				//沪深降序
				let param = {
					asc: 1
				}
				let data = await api.gethsph(param)
				this.loadings = false
				if (data.status === 0) {
					this.finisheds = true
					this.listArrs = data.data
				} else {
					this.texts = data.msg
					this.alertShow = true
				}
			},
			//进入详情
			goDetail(item) {
				//   if (this.userData.length == 0) {

				//     return;
				//   }

				if (item.symbol) {
					this.goDetail2(item);
					return;
				}

				var codes = "";
				var names = "";
				var stock_type = "";
				var soks = "";
				var if_zhishu = '0';
				var if_us = '';
				codes = item.code;
				names = item.name;
				stock_type = item.symbol.substring(0, 2);
				soks = this.filterSH(item.symbol);
				if_zhishu = '0';
				if_us = item.stock_type == 'us' ? '1' : '';
				this.$router.push({
					path: "/kline",
					query: {
						name: names,
						stockplate: item.stock_plate,
						code: codes,
						type: stock_type,
						sok: soks,
						if_us: if_us,
						usType: item.type,
						if_zhishu: if_zhishu,
					}
				});
			},
			goDetail2(item) {
				//   if (this.userData.length == 0) {

				//     return;
				//   }
				var codes = "";
				var names = "";
				var stock_type = "";
				var soks = "";
				var if_zhishu = '0';
				var if_us = '';
				codes = item.symbol.substring(2);
				names = item.name;
				stock_type = item.symbol.substring(0, 2);
				soks = this.filterSH(item.symbol);
				if_zhishu = '0';
				if_us = item.stock_type == 'us' ? '1' : '';
				this.$router.push({
					path: "/kline",
					query: {
						name: names,
						stockplate: item.stock_plate,
						code: codes,
						type: stock_type,
						sok: soks,
						if_us: if_us,
						usType: item.type,
						if_zhishu: if_zhishu,
					}
				});
			},
			filterSH(val) {
				if (val.indexOf('sh') >= 0) {
					return 1;
				} else if (val.indexOf('bj') >= 0 || val.indexOf('sz') >= 0) {
					return 0;
				}
			},
		}
	}
</script>


<style lang="less" scoped>
	.red {
		color: #ff5353 !important;
	}

	.green {
		color: #20b844 !important;
	}

	.hqred {
		color: #f11614 !important;
	}

	.hqgreen {
		color: #09965f !important;
	}

	.redbg {
		background: #fdf7f7 !important;
	}

	.greenbg {
		background: #f4faf8 !important;
	}

	.stocklistcontainer {}

	.toubu {
		width: 100%;
		background: #fff;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		position: relative;
	}

	.toubu .tl {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		margin: .32rem auto;
		width: 5.3125rem;
		height: .75rem;
		border: .018519rem solid #d2120f;
		border-radius: .375rem;
		overflow: hidden;
		display: flex;
	}

	.toubu .tr {
		position: absolute;
		width: .43rem;
		height: .43rem;
		background: url(data:image/png;base64,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) no-repeat 50%;
		background-size: 100%;
		right: .4rem;
		top: 10px;
	}

	.toubu .tl span {
		width: 50%;
		height: .75rem;
		line-height: .75rem;
		color: #666;
		font-size: .37rem;
		text-align: center;
	}

	.toubu .tl span:first-child {
		color: #fff;
		background-color: #d2120f;
	}



	.othermain {
		.daboxk {
			width: 100%;
			background: #fff;
			margin-top: -0.32rem;
			min-height: 1.07rem;
			border-radius: 0.4rem 0.4rem 0 0;
			padding-top: 0.4rem;

			.bankuai {
				width: 9.32rem;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;

				.erty {
					width: 2.99rem;
					height: 2.14rem;
					background: #ffffff;
					border-radius: 0.21rem;
					text-align: center;

					h3 {
						font-size: .53rem;
						font-family: SourceHanSansCN;
						padding-top: 0.266rem;
						font-weight: 800;
						line-height: .75rem;
						margin-top: 0.13rem;
					}

					h5 {
						font-size: .32rem;
						font-family: SourceHanSansCN;
						font-weight: 500;
						color: #333;
						margin-top: 0.266rem;

						a {
							margin-left: 0.11rem;
						}
					}
				}
			}
		}

		.poklk {
			width: 9.48rem;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			margin-top: 0.4rem;

			span {
				color: #333;
				font-size: .38rem;
				position: relative;
				font-weight: 600;
			}

			a {
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAQCAYAAACWa2gIAAAAAXNSR0IArs4c6QAABGRJREFUWEftmD1vI1UUht/3nnvveEm8sCuxiBRUq21o+A0QWn4HDQ0VBS0SHQUfJR0NlPyARdAhaKEAgVhWG8FKCfl2bM856Fx7kvHkY8deoAluPBl7bM/jZ557HGLJ2/vb28+u10cv6Hi6ZmRY8vBr8XSaacjx8ECe+eOd27d3/aS5zJl/+PjBhk7sxWWOue7PDYlbbz3/0qPeoN3kG6P9u9cd3CrnfzwY/twb9EePH96rJ/VwlTe67sdIkv3eoD9++Osr0xDkukNb5fyjav0/6FXILXmML44LoM0sfA/IPiAHQFgHwhSQNezJL9vH96bQmySFEEaogBQQYmAQ3wZE5vsFEo0aCEaQGcoYBcnARLVMCZHKbNRESCQ0BzIBiAQzYBGE/50CGA2WAX8/Rmp5LBoQA1Ded/YYIgCfhAIMkQQNEJZF3yck88f8nJtpqdluc7hs2/EeqdkPh3X92YO9vW/68u6kw3jfIHeA8CcQHPQtQI6B4KC3Tuy5/cOjuw46AEH8g5Ni/qFJcdC+n1AHK848UKULWsEY1CoKIlWSUTPBFBwwmQhk/zIAS5yBWwW0Qw80hDnoGfwZ5KcBfcp2XNef/rS7+0kf2AuLodv8BcCXAXHQ42IyQgN6iiCP/jraODHdaBvdBt02+mrQzBRkKt367EYHaHLQDhZg5qLRye112916Uyv2Xmm0f8gz0JcZ3YbfMLvK6AWue9Px27/vHXx9Fexz410b9G8Aa0DaRjvoGuuyc7B1azRNd4LVQ6Vf0mdGO+gABlKjg5ZyXy73TjqYKEhn6SgmJ4fo9yUvq4P2lPB8Okpi/NbY3Ww3li8NWs2++3Fn580u6Cf8YDmfjnajHfTYISLECITRaByzp2PsICdxXFUxTaaloXbay9Jnb+6AVE9CNiKz1gxaZZDK6GmwyhRlH4NkqmYjs6llEJVbbp6S8gXAXyN580Fz+2Pp+cz2qDPbHarvE5iL0MD1pJ12up2RxuKroF8k7v7mYHizTz5OLxM3+isgXNboxugJjgpsHZ1IH9BKplQAa+WgSSRVG8wTUYFaKSQF1epi0CEb1JtdWt4TdIFMIJihAe/5cNDtBbC7GC4L+mBzMOz126LVo5nRQ4DN1NFOx0lZtYfRQVegNEaPyVgWxskkkqEY7JZZsYqxAe33gA66RmO2GGY32mg5BKkWjQ4Z8KthZrRnJcCSGdOTjO4ButvoZUHf3xwMX/1PjHbQaTyRJh2GJGSdZgmBOGABqyYdbrTVWnkaAA7aoN1olIkDA87SkcBFo0u/aaX5/wDopzKaCG+8Nlj78l8D7UZ7OsAQm0arz9dzo7uNdtCeDvWJgqzg412x9OJGm2rVBt022tPh/V3SaDd3tkieLYZP1WgzvPf6jeG7fSB3/ntn/NwQmvGuO0c3jVYci4ISRyMfME5BX7YYdhvdpOMyo30xnIP2MS73MZqeEp94OothKx3zSeNcoy9KR5tL55czDwH7lggf9DW5+SL+BkSaMTe4+9tFAAAAAElFTkSuQmCC) no-repeat 50%;
				background-size: 100%;
				width: 1.20rem;
				height: 0.21rem;
				margin-top: 0.13rem;
			}
		}

		.renmen {
			.dangeh {
				width: 9.48rem;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.dank {
					width: 30%;
					text-align: center;
					padding: 0.42rem 0;
					background: #fdf7f7;
					border-radius: 0.21rem;
					margin-top: 0.266rem;

					h6 {
						color: #333;
						font-size: .37rem;
					}

					.zhangl {
						font-size: .53rem;
						margin-top: 0.266rem;
						font-weight: 600;
					}

					.bili {
						font-size: .266rem;
						margin-top: 0.29rem;
					}
				}
			}
		}

		.zhnj {
			width: 100%;
			display: flex;
			height: 1.01rem;
			border-bottom: 0.03rem solid #e0e0e0;
			position: relative;

			span {
				width: 20%;
				text-align: center;
				line-height: 1.01rem;
				color: #333;
				font-size: .37rem;
			}

			.pokl {
				position: absolute;
				width: 0.53rem;
				height: 0.11rem;
				background: #F44336;
				border-radius: 0.05rem;
				bottom: 0;
				left: 10%;
				margin-left: -0.266rem;
			}

			.xuan {
				color: #F44336;
			}
		}

		.kanbox {
			width: 9.48rem;
			margin: 0 auto;
			margin-top: 0.32rem;
			padding-bottom: 0.32rem;
			display: flex;
			justify-content: space-between;

			span {
				color: #666;
				font-size: .35rem;
			}

			.k1 {
				width: 30%;
				padding-left: 0.266rem;
			}

			.k2 {
				width: 25%;
				text-align: center;
			}

			.k4 {
				width: 20%;
				text-align: right;
			}
		}

		.kfgfd {
			height: 1px;
			background: #e0e0e0;
		}

		.everylistmain {
			width: 9.48rem;
			margin: 0 auto;

			.shujuk {
				margin: 0 auto;
				margin-top: 0.40rem;
				padding-bottom: 0.32rem;
				display: flex;
				justify-content: space-between;

				.s1 {
					width: 30%;

					h6 {
						color: #333;
						font-size: .37rem;
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
							padding: 0.04rem;
							text-align: center;
							line-height: .4rem;
							color: #fff;
							font-size: .3rem;
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

				.s2 {
					text-align: center;
					font-size: .4rem;
					margin-top: 0.13rem;
					font-weight: 600;
					width: 25%;
				}

				.s4 {
					width: 20%;
					text-align: right;

					span {
						display: inline-block;
						width: 1.34rem;
						height: 0.67rem;
						border-radius: 0.13rem;
						color: #fff;
						font-size: .35rem;
						text-align: center;
						line-height: .67rem;
					}

					a {
						display: inline-block;
						width: 1.34rem;
						height: 0.67rem;
						border-radius: 0.13rem;
						color: #fff;
						font-size: .35rem;
						text-align: center;
						line-height: .67rem;
					}

					.hqgreenbtnbg {
						background: #09965f;
					}

					.hqredbtnbg {
						background: #f11614;
					}
				}
			}
		}
	}
</style>