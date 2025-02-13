<template>
	<div>
		<div class="trade-record-detail">
			<div class="headf">
            <div>
                <h2><span class="hbnh"><a class="fan" @click="$router.back()"></a></span>成交详情</h2>
            </div>
        </div>
			<!-- 新内容 -->
			<div class="stock">
				<div class="stock-name PingFang-Regular-crude">{{detail.stockName}}</div>
				<div class="stock-code PingFang-Regular-crude">({{detail.stockCode}})</div>
				<div class="stock-order-price PingFang-Regular">{{detail.orderTotalPrice}}</div>
				<div class="stock-price PingFang-Regular">
					<div class="stock-price-item">买入: {{detail.buyOrderPrice}}</div>
					<div class="stock-price-item">卖出: {{detail.sellOrderPrice}}</div>
				</div>
				<div class="stock-jywc">
					<img v-if="detail.allProfitAndLose > 0" style="width: 60px;" src="@/assets/img/jywc.png" />
					<img v-else style="width: 60px;" src="@/assets/img/jywc-d.png" />
				</div>
			</div>
			<div class="partition">
				<div class="partition-item" v-for="item in 15" :key="item">
					<div class="partition-point"></div>
				</div>
			</div>
			<div class="detail-con PingFang-Regular-crude">
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">买入时间</div>
					<div class="value">{{detail.buyOrderTime}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">买入价格</div>
					<div class="value">￥{{detail.buyOrderPrice}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">买入总价值</div>
					<div class="value">￥{{detail.orderTotalPrice}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">持仓天数</div>
					<div class="value">{{detail.orderStayDays}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">买入股数</div>
					<div class="value">{{detail.orderNum}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">卖出时间</div>
					<div class="value">{{detail.sellOrderTime}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">卖出价格</div>
					<div class="value">￥{{detail.sellOrderPrice}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">手续费</div>
					<div class="value">￥{{detail.orderFee}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">印花税</div>
					<div class="value">￥{{detail.orderSpread}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">卖出得利</div>
					<div class="value">￥{{detail.profitAndLose}}</div>
				</div>
				<div class="detail-item flex col-center row-between page-warper">
					<div class="name">总盈亏</div>
					<div class="value" style="color: #098C26;">￥{{detail.allProfitAndLose}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import * as api from '@/axios/api'
	import { dateFormat } from '@/utils/dateUtils.js'
	export default {
		data() {
			return {
				detail: {}
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			async getDetail() {
				const res = await api.findBySn({positionSn: this.$route.query.positionSn})
				if(res) {
					this.detail = {
						...res.data,
						buyOrderTime: dateFormat(res.data.buyOrderTime, 'YYYY-MM-DD HH:mm:ss'),
						sellOrderTime: dateFormat(res.data.sellOrderTime, 'YYYY-MM-DD HH:mm:ss'),
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.partition{
	width: 100%;
	height: 20rpx;
	display: flex;
	padding: 20rpx 40rpx;
	.partition-item{
		flex: 1;
		.partition-point{
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			margin: 5rpx auto;
			    background-color: #000000 !important;
		}
	}
}
h2 {
    text-align: center;
    height: 1.2549rem;
    width: 100%;
    position: relative;
    line-height: 1.2549rem;
    font-size: 0.4806rem;
    color: #fff;
    background: transparent;
    font-weight: 500;
    z-index: 3;
}
.hbnh {
    position: absolute;
    left: 0.4005rem;
    font-size: 0.4272rem;
    font-weight: 500;
}
.fan {
    width: 0.2403rem;
    height: 0.4272rem;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAVdJREFUSEut1usqBVEYxvH/c1MuRJJDkhwTEpIkJUlyCEk++CJJckpycw49Gs3Wa+y9Z82ePd/Xr5n38KwRNR7bE0APMK1OHdtTwAWQGZcdQbZngPMc+QImK0O2Z4GzgIxLuqoE2Z4DTgMyJuk6K08yZHseOAnIqKSbRo2TINsLwHFARiTdxkaVQrYXgaOADEu6K3a7LWR7CTjMD2XdaYq0rZHtFWA/Rz6BIUn3reau6RvZXgX28kMfOfLQbnj/QbbXgN380HuOPJZtwB/I9jqwE5ABSc9lyJ8a2d4AtgPSL+klBfmFbG8CWwHpk/SaivxAtjMgg7Inq0mvpLcqSHehTOvKpzU+oSvFDlj99gesOJCDkp7Kip+yIknT3XL7C0tbum9lMbIMHKQkQEqwJWVSKZTPWTElq0dt6GYxt6uHf8DqX0cBq39BBqz+lR2w+j8RAfv9rfkGqF24CUdT9E4AAAAASUVORK5CYII=) no-repeat 50%;
    background-size: 100%;
    display: inline-block;
    margin-right: 0.1335rem;
    vertical-align: middle;
    margin-top: -0.0534rem;
}
.headf {
    width: 100%;
    height: 1.1748rem;
    background: linear-gradient(-55deg,rgb(241, 22, 20),rgb(240, 40, 37));
}
.page-warper{
	padding: 0 16px;
}
.flex {
  display: flex;
}
.col-center {
  align-items: center;
}
.row-between {
  justify-content: space-between;
}
	.trade-record-detail{
		min-height: 100vh;
		.stock{
			position: relative;
			padding: 20px;
			width: 100%;
			height: auto;
			text-align: center;
			color: #11183C;
			.stock-name{
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 30px;
			}
			.stock-code{
				width: 100%;
				height: 20px;
				line-height: 20px;
				font-size: 10px;
			}
			.stock-order-price{
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-size: 23px;
				font-weight: 400;
			}
			.stock-price{
				width: 100%;
				height: 20px;
				line-height: 20px;
				font-size: 15px;
				display: flex;
				justify-content: center;
				.stock-price-item{
					margin: 0 5px;
					color: #11183C;
				}
			}
			.stock-jywc{
				position: absolute;
				right: 50px;
				top: 50px;
				color: #11183C;
			}
			
		}
		.partition{
			width: 100%;
			height: 10px;
			display: flex;
			padding: 10px 20px;
			.partition-item{
				flex: 1;
				.partition-point{
					width: 5px;
					height: 5px;
					border-radius: 50%;
					margin: 2px auto;
				}
			}
		}
		
		.main-info{
			padding-top: 20px;
			padding-bottom: 20px;
			border-bottom: 1px solid #E9E9E9;
			.left{
				.name{
					font-size: 14px;
					color: #333333;
					color: #11183C;
				}
				.code{
					font-size: 12px;
					color: #999999;
					margin-top: 5px;
				}
			}
			.right{
				width: 40px;
				height: 36px;
			}
		}
		.detail-con{
			padding: 20px;
			.detail-item{
				padding-top: 10px;
				padding-bottom: 10px;
				.name{
					font-size: 14px;
					color: #11183C;
				}
				.value{
					font-size: 14px;
					color: #11183C;
				}
			}
		}
	}
</style>
