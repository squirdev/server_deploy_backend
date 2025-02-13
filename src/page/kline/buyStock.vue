<template>
    <div>
        <div class="headf"><span @click="$router.go(-1)"></span>
            <div class="wenebn">
                <h6>{{name}}</h6>
                <p class="">{{nowPrice}}</p>
                <!-- <p class="">{{ currentItem.p }} {{ currentItem.zdp ? currentItem.zdp.toFixed(2) + '%' : '0.00%' }}</p> -->
            </div>
        </div>
        <div style="height:1.5rem">

        </div>
        <div class="goumais">
            <div class="xiaoge"><span><img
                        src="data:image/png;base64,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">数量</span>
                <div class="rtyh">
                    <div class="kunk"><input placeholder="请输入" v-model="buyNum"
                            @input="buyNum = buyNum.replace(/^(0+)|[^\d]+/g, '')" type="number"><a class="shou">手</a>
                    </div>
                </div>
            </div>
            <p class="shougu">1手=100股</p>
            <div class="xiaoge">
                <span class="eduleft"><img class="eduleftimg"
                        src="data:image/png;base64,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">可用额度</span>
                <div class="eduright">
                    <a class="ertyu">￥{{ userinfo.enableAmt }}</a>
                </div>
            </div>
            <div class="rtyh">
                <!-- <div class="fangxi">
                    <a class="fanh" :class="buyType == 0 ? 'xuk' : ''" @click="buyType = 0">买涨</a>
                    <a class="fanh" :class="buyType == 1 ? 'xuk' : ''" @click="buyType = 1">买跌</a>
                </div> -->
            </div>
            <div class="xiaoge">
                <span class="eduleft"><img
                        src="data:image/png;base64,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">选择杠杆倍数</span>
                <div class="rtyh" @click="showPicker = true">
                    <div class="kunk">
                        <input placeholder="请选择" disabled="disabled" v-model="lever" class="canwei">
                        <img class="gangganicon"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAGCAYAAAAVMmT4AAAAAXNSR0IArs4c6QAAAGRJREFUKFNjnDFjhiUjI2Pr////GRlwAEZGxpcsLCypYAUzZ87MYWBgmMTAwIBNw8v///87ZWRkXINL4tAAVwgyFMUkNA0oCjEUIzmp+v///84gq5G9gdVT/f39AoWFhR/Q/QsATGgt64otJQ8AAAAASUVORK5CYII=">
                    </div>
                </div>
            </div>
            <div class="xiaoge">
                <span class="eduleft"><img
                        src="data:image/png;base64,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">支付保证金</span>
                <div class="eduright"><a class="ertyu"> ￥{{ (nowPrice * buyNum * 100 / lever ).toFixed(2) }}</a>
                </div>
            </div>
            <!-- <div class="xiaoge">
                <span class="eduleft"><img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAbdJREFUOE+N0z9IG1EcB/Dv76URtGiXekEsgRCHunToXZrV5A7XIB0LzeTUreJQMnTRrYODCFUchDpauulwgSCK4AUXyVAIpVCKuUtSIdr8UfJ+5bB3TVLUu+3de78P3/vd7xEGHgaophofJSFLxJ3B/X9rYsUyH1HvAbe4qukbTDQHxlakaL69DXA040IpmqM+4BWDEBGMvS4o7gG2mo4LUOay3l2LfS+0XbQP6C0eb1Ze1kYmspIx7QKVZ7MPEZYZIbDNQFw5D/+k8m7HBwaLqVS6qiaMeQ+wNeMLETLepzCwGLHMDz7gaPobEK0yo0rA9c1BHgGwphTzuZqaSkqIDAS9Y5avScoj5aRQ9oGqZrwHsWy2O6u9DYueHjQI6LrvKmoqKYTI/Wq0Xz39enjR1wMXkITfbqzbf9n/O30J7gLqyeTYZTMc8ohoa7TZ18T7EjiaUWAg5gGCsDxumeuBEzjPZ6ZCHBrygFYY9pPjfD0wYCf0zwSK+gnAK4+t/KfAwJmWfvGAQsMecIXOt0lr/0dgwEnoGwAm/UFi2owUzZ3AwL2XyVb1BRK0BPDfKQw+DYqVH/sD+c0JIKaNn8sAAAAASUVORK5CYII=">手续费</span>
                <div class="eduright"><a class="ertyu">￥26600640.90</a></div>
            </div> -->
        </div>
        <div class="mail" @click="setBuy">买入</div>
        <van-popup v-model="showPicker" round position="bottom">
            <van-picker :columns="siteLeverList" @cancel="showPicker = false" @confirm="onConfirm" show-toolbar />
        </van-popup>
    </div>
</template>
<script>
import * as api from '@/axios/api'
import { Toast } from 'vant'
export default {
    components: {

    },
    props: {},
    data() {
        return {
            showPicker: false,
            currentItem: '',
            userinfo: '',
            settingdetail: '',
            siteLeverList: [],
            nowPrice: 0,
            buyType: 0, // 0 买入 1 卖出
            buyNum: '', //买入数量
            lever: '', //杠杆倍数
            name:'',
            code:'',
            id:'',
            buying: false,
        }
    },
    mounted() {
        if (this.$route.query.code) {
      this.code = this.$route.query.code
    }
    if (this.$route.query.name) {
      this.name = this.$route.query.name
    }
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    if (this.$route.query.m) {
      this.nowPrice = Number(this.$route.query.m)
    }
        // this.currentItem = JSON.parse(decodeURIComponent(this.$route.query.item))

        this.getUserInfo()
        this.getuserSetting()
    },
    methods: {
        onConfirm(item) {
            console.log(item)
            this.showPicker = false
            this.lever = item.value
        },
        async getuserSetting() {
            var opt = {};
            var data = await api.getSetting(opt);
            this.settingdetail = data.data;
            this.siteLever = this.settingdetail.siteLever.split("/")
            this.lever = this.siteLever[0];
            this.siteLeverList = [];
            for (let i = 0; i < this.siteLever.length; i++) {
                let val = this.siteLever[i];
                let item = {
                    text: val + "倍",
                    value: val
                };
                this.siteLeverList.push(item);
            }
            this.buyNum = this.settingdetail.buyMinNum / 100;
        },
        async getbuyVipQc() {
            if (this.buyNum * 100 < this.settingdetail.buyMinNum) {
                this.$message.error('交易数量不能小于' + this.settingdetail.buyMinNum / 100 + '手');
                return
            }
            if (this.buyNum * 100 > this.settingdetail.buyMaxNum) {
                this.$message.error('交易数量不能大于' + this.settingdetail.buyMaxNum / 100 + '手');
                return
            }
            var opt = {
                buyNum: this.buyNum * 100,
                stockCode: this.currentItem.c,
                lever: 1,
                buyType: this.buyType,
            };
            var data = await api.buyVipQc(opt);
            if (data.status == 0) {
                this.$toast('下单成功');
            } else {
                this.$toast(data.msg);
            }
        },
        async getUserInfo() {
            // 获取用户信息
            let data = await api.getUserInfo();
            if (data.status === 0) {
                this.userinfo = data.data;
            }
        },
        //买卖
    setBuy() {
      if (!this.$store.state.userInfo.idCard) {
        Toast(this.$t('hj111'))
        this.$router.push('/smrz')
        return
      }
      if (this.buyNum * 100 < this.settingdetail.buyMinNum) {
                this.$message.error('交易数量不能小于' + this.settingdetail.buyMinNum / 100 + '手');
                return
            }
            if (this.buyNum * 100 > this.settingdetail.buyMaxNum) {
                this.$message.error('交易数量不能大于' + this.settingdetail.buyMaxNum / 100 + '手');
                return
            }
      // if (!this.agree) {
      //   Toast('需同意合作协议才能交易!')
      // } else if (isNull(this.selectNumber) && isNull(this.autoNumber)) {
      //   Toast('请选择购买手数')
      // } else if (isNull(this.selectType)) {
      //   Toast('请选择买卖方向')
      // } else if(isNull(this.subaccountNumber)) {
      //   Toast('请选择子账户')
      // } else {}
      if (this.buying) {
        return;
      }
      this.buying = true
      let opts = {}
      opts = {
        // stockId: this.detail.id,
        // buyNum: this.selectNumber ? this.selectNumber * 100 : 0, // 单位为手
        // buyType: this.selectType,
        // lever: this.selectCycle ? this.selectCycle : 0,
        // subaccountNumber:this.subaccountNumber
        //买入是买涨buyType:0, 卖出是买跌buyType:1,卖出的状态是0，买入的状态是1
        buyNum: Number(this.buyNum) * 100, // 单位为手
        //buyNum: (this.num.match(/\d+/g))[0] * 100, // 单位为手
        lever: this.lever,
        buyType :0,
        stockId: this.id,
      }
      this.gpBuy(opts)

    },
    //股票买入
    async gpBuy(opts) {
        console.log(11)
      opts.stockId = this.id
      let data = await api.buy(opts)
      this.buying = false
      if (data.status === 0) {
        Toast(data.data)
        this.getUserInfo()
        this.$router.push('/warehouse')
      } else {
        if (data.msg.indexOf('不在交易时段内') > -1) {
            Toast(this.$t('hj113'))
        } else {
            Toast(data.msg)
        }

      }
    },
    },
}
</script>
<style lang="less" scoped>
/deep/ .van-picker__cancel{
    font-size: 0.4rem;
}
/deep/ .van-picker__confirm{
    font-size: 0.4rem;
}
/deep/ .van-picker__toolbar{
    height: 1.3rem;
}
/deep/ .van-picker-column{
    font-size: 0.4rem;
}
.headf {
    height: 1.17rem;
    position: fixed;
    background: linear-gradient(#f44336);
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #ececec;
    z-index: 33;

    span {
        position: absolute;
        width: 0.266rem;
        height: 0.45rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAVdJREFUSEut1usqBVEYxvH/c1MuRJJDkhwTEpIkJUlyCEk++CJJckpycw49Gs3Wa+y9Z82ePd/Xr5n38KwRNR7bE0APMK1OHdtTwAWQGZcdQbZngPMc+QImK0O2Z4GzgIxLuqoE2Z4DTgMyJuk6K08yZHseOAnIqKSbRo2TINsLwHFARiTdxkaVQrYXgaOADEu6K3a7LWR7CTjMD2XdaYq0rZHtFWA/Rz6BIUn3reau6RvZXgX28kMfOfLQbnj/QbbXgN380HuOPJZtwB/I9jqwE5ABSc9lyJ8a2d4AtgPSL+klBfmFbG8CWwHpk/SaivxAtjMgg7Inq0mvpLcqSHehTOvKpzU+oSvFDlj99gesOJCDkp7Kip+yIknT3XL7C0tbum9lMbIMHKQkQEqwJWVSKZTPWTElq0dt6GYxt6uHf8DqX0cBq39BBqz+lR2w+j8RAfv9rfkGqF24CUdT9E4AAAAASUVORK5CYII=) no-repeat 50%;
        background-size: 100%;
        left: 0.4rem;
        top: 0.37rem;
    }

    .wenebn {
        text-align: center;
        width: 8rem;
        margin: 0 auto;

        h6 {
            color: #fff;
            font-size: .4rem;
            padding-top: 0.133rem;
            font-weight: 500;
        }

        p {
            font-size: .32rem;
            color: #fff;
            margin-top: 0.133rem;
        }
    }
}

.goumais {
    width: 9.21rem;
    margin: 0 auto;

    .xiaoge {
        margin-top: 10px;
        display: flex;
        height: 1.50rem;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;

        span {
            display: flex;
            align-items: center;
            color: #333;
            font-size: .43rem;
            line-height: 1.5rem;

            img {
                width: 0.43rem;
                height: 0.43rem;
                margin-right: 0.133rem;
            }
        }

        .rtyh {
            background-color: rgb(245, 245, 245);
            width: 4.75rem;
            border: 1px solid rgb(224, 224, 224);
            border-radius: 5px;
            display: flex;


            .kunk {
                border-radius: 0.08rem;
                display: flex;
                align-items: center;

                input {
                    color: #000;
                    font-size: .37rem;
                    background-color: rgb(245, 245, 245);
                    width: 4rem;
                    padding-left: 10px;
                    height: 1.07rem !important;
                }

                a {
                    color: #333;
                    font-size: .4rem;
                    line-height: 1.07rem;
                    margin-right: 0.266rem;
                }

                .gangganicon {
                    width: 0.26rem;
                    height: 0.24rem;
                }
            }
        }

        .eduleft {
            display: flex;
            align-items: center;

            .eduleftimg {
                width: 0.43rem;
                height: 0.43rem;
                margin-right: 0.13rem;
            }
        }

        .eduright {
            justify-content: space-between;
        }

        .ertyu {
            color: #333;
            font-size: .4rem;
            line-height: 1.5rem;
        }
    }

    .fangxi {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .4rem;
        text-align: center;
        margin-top: 20px;

        .fanh {
            width: 49%;
            height: 1.07rem;
            line-height: 1.07rem;
            border-radius: 5px;
            color: #999;
            border: 1px solid #e0e0e0;
        }

        .xuk {
            color: #fff;
            background: linear-gradient(#f44336);
            border: 1px solid #fff;
        }
    }
}

.shougu {
    color: rgb(153, 153, 153);
    text-align: right;
}

.mail {
   width: 9.21rem;
       height: 1.2rem;
       border-radius: .13rem;
       line-height: 1.2rem;
       margin: .8rem auto;
       color: #fff;
       font-size: .43rem;
       text-align: center;
       background: -webkit-gradient(linear, right top, left top, from(#e73241), to(#ff4e17));
       background: linear-gradient(270deg, #e73241, #ff4e17)
}
</style>
