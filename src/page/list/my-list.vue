<template>
    <div class="bigbg">
        <div class="toubu">
          <div class="tl">
            <span @click="$router.push('/trading-list')">行情</span>
            <span>自选</span>
          </div>
          <a class="tr" @click="getsearch"></a>
        </div>
        <div class="daboxk">
            <div class="bankuai">
                <div class="erty "  v-for="(i,index) in listArr1" :key="i.id" v-if="index<3" :class="i.floatRate > 0 ? 'redbg' : 'greenbg'"  >
                    <h3 :class="i.floatRate > 0 ? 'red' : 'green'">{{i.currentPoint}}</h3>
                    <h5>{{i.indexName}}<a  :class="i.floatRate > 0 ? 'red' : 'green'">{{i.floatRate}}%</a></h5>
                </div>

            </div>
        </div>
        <div class="xuanzhe">
            <div class="sangh">
                <span class="lety">股票</span>
                <span>最新</span>
                <span>涨跌额</span>
                <span>删除</span>
            </div>
            <van-list v-model="loadings" :finished="finisheds" :finished-text="$t('hj43')" @load="onLoads"
              :immediate-check="false">
            <div class="shujkl" @click="goDetail(item, index)" v-for="(item, index) in listArrs"
                    :key="item.indexCode">

                <div class="dange">
                    <h6>{{item.stockName}}</h6>
                    <p>
                        <span  v-show="(item.stockGid.indexOf('sz')>=0)">深</span>
                        <span class="sh"  v-show="(item.stockGid.indexOf('sh')>=0)">沪</span>
                        <span class="bj"  v-show="(item.stockGid.indexOf('bj')>=0)">北</span>
                        <a class="shbg">{{item.stockGid}}</a>
                    </p>
                </div>
                <div class="dange"><span class="plk " :class="item.hcrate > 0 ? 'hqred' : 'green'">{{item.nowPrice}}</span></div>
                <div class="dange"><a class="alk "  :class="item.hcrate > 0 ? 'hqredbtnbg' : 'hqgreenbtnbg'">{{item.hcrate}}%</a></div>
                <div class="dange" ><i @click.stop="optionszx(item)"></i></div>
            </div>
            </van-list>
            <!-- <div class="shujkl" v-for="i in 10">
                <div class="dange">
                    <h6>劲仔食品</h6>
                    <p><span style="">深</span><span class="sh" style="display: none;">沪</span><span class="bj"
                            style="display: none;">北</span><a class="">SZ003000</a></p>
                </div>
                <div class="dange"><span class="plk hqgreen">11.72</span></div>
                <div class="dange"><a class="alk hqgreenbtnbg">0.26%</a></div>
                <div class="dange"><i></i></div>
            </div> -->
        </div>

        <div class="tia" @click="$router.push('/trading-list')"><img
                src="../../assets/wode/jh.png"><span>添加自选</span>
        </div>
        <div style="height:1.5rem"></div>
    </div>
</template>
<script>
import * as api from '@/axios/api'
import { Toast } from "mint-ui";
export default {
    components: {

    },
    props: {},
    data() {
        return {
            loadings: false,
            finisheds: false,
            listArrs: [],
            pageNums: 1,
            gpcodes: "",
            listArr1: [],
        }
    },
    mounted() {
        this.getMyList()
        this.getListMarket()
    },
    methods: {
        //进入详情
    goDetail(item) {
    //   if (this.userData.length == 0) {

    //     return;
    //   }
      var codes = "";
      var names = "";
      var stock_type = "";
      var soks = "";
      var if_zhishu = '0';
      var if_us = '';
      codes = item.stockCode;
          names = item.stockName;
          stock_type = item.stock_type;
          soks =  this.filterSH(item.stock_type);
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
      if (val.indexOf('sh')>=0) {
        return 1;
      } else if (val.indexOf('bj')>=0 || val.indexOf('sz')>=0) {
        return 0;
      }
    },
        getsearch() {
            this.$router.push({
                path: '/Searchlist'
            })
        },
        onLoads() {
      this.pageNums++;
      this.loadings = true;
      this.getMyList();
    },
        async getMyList() {
      this.loadings = true;
      //获取自选列表
      let opt = {
        pageNum: this.pageNums,
        pageSize: 15,
        keyWords: this.gpcodes
      };
      let data = await api.getMyList(opt);
      this.loadings = false;
      if (data.status == 0) {
        data.data.list.forEach(element => {
          this.listArrs.push(element);
        });
      }
      if (data.data.list.length < 15) {
        this.finisheds = true;
      }
    },
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
    async optionszx(val) {
      let data = await api.delOption({ code: val.stockGid });
      if (data.status === 0) {
        Toast({
          message: "删除成功",
          position: "middle",
          duration: 2000
        });
        this.listArrs = [];
        this.pageNums = 1;
        this.finisheds = false;

        this.getMyList();
      } else {
        console.log(data.msg);
      }
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
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

  .toubu .tl span:last-child {
    color: #fff;
    background-color: #d2120f;
  }


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

.xuanzhe {
    width: 9.48rem;
    margin: 0 auto;
    margin-top: 0.29rem;
    border-radius: 0.13rem;

    .sangh {
        width: 9.48rem;
        display: flex;
        justify-content: space-between;

        span {
            width: 25%;
            color: #666;
            text-align: center;
            font-size: .35rem;
        }

        .lety {
            text-align: left;
            padding-left: 0.266rem;
        }
    }

    .shujkl {
        width: 9.48rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.026rem solid #e0e0e0;
        padding-bottom: 0.266rem;

        .dange {
            width: 25%;
            margin-top: 0.4rem;
            text-align: center;

            h6 {
                color: #333;
                font-size: .4rem;
                font-weight: 500;
                text-align: left;
            }

            p {
                color: #333;
                font-size: .32rem;
                margin-top: 0.13rem;
                text-align: left;

                span {
                    width: 0.4rem;
                    height: 0.4rem;
                    padding: 0.04rem;
                    background: #3b4fde;
                    border-radius: 0.05rem;
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
                    background: rgba(115, 131, 251, .1);
                }

                .bjbg {
                    color: #ea6248;
                    background: rgba(234, 98, 72, .1);
                }
            }

            .plk {
                font-size: .42rem;
                text-align: center;
                margin-top: 0.13rem;
                display: inline-block;
                font-weight: 600;
            }

            .alk {
                width: 1.33rem;
                height: 0.67rem;
                border-radius: 0.13rem;
                display: inline-block;
                text-align: center;
                line-height: .67rem;
                color: #fff;
                font-size: .35rem;
            }

            i {
                width: 0.43rem;
                height: 0.43rem;
                display: inline-block;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAW1JREFUWEftl89KAlEUxn9nRsxNf4mw2hhpBKIpQb1AUPtepHbZA2S7epDaF/QAEUSiiwKFIGkKC0oI+qdzQ0cXmYu54WSLucvhm3N+57twuJ/QOKlKDLu2g2IFGGl+8+48I5xgBLbJTRSFeCWKUTsDRr3r2bXyE3ZgSUhaByjWHYm6Qswj6vV3T2BMcwBVXwOZb9YXDoWEVQWGQC55fUlTinnTvD1R5DrEYPCiBVFtACiHxtgnH970ZPLOosn7PZS94ZjQBkDtUpjO/AlA4jYLsuUD+A74DvgOuHcgXh5DSRpTxPWiCkqO86nHrnrtRZS4K4KKum7uCG8oTM6A2D/+0waIWyUMZvUApEwhHOkNwKI1zodKaQGImScfrvTmCrQ6uxBrX4GLmloSH8B3wHfgfzrQx2d5n4NJZzRTcoxSb1qbza1YJISo1e/RbOFhDvvztC/h1AwsOw8MJ55nW/F82O1Av9RVW/E804jnX6EtCd72evTqAAAAAElFTkSuQmCC) no-repeat 50%;
                background-size: 100%;
                margin-top: 0.13rem;
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

.tia {
    text-align: center;
    width: 3.5rem;
    margin: 0.4rem auto;

    img {
        width: 0.37rem;
        height: 0.37rem;
        vertical-align: middle;
        margin-top: -0.11rem;
        margin-right: 0.06rem;
    }

    span {
        color: #333;
        font-size: .37rem;
    }
}
</style>
