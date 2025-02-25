<template>
  <div class="wrapper">
    <ul class="table-list"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li class="list-body" v-for="item in list" :key="item.key">
        <div v-if="item.deType=='买入股票'" class="capital">
          <div class="col-xs-6">
            <span>买卖方向:</span>
            <span class="red pull-right">{{item.deSummary.split("，")[0]}}</span>
          </div>
          <div>
            <span>股票名称:</span>
            <span class="red pull-right">{{item.deSummary.split(',')[0].split("，")[1]}}</span>
          </div>
          <div  class="col-xs-6">
            <span>扛杆倍数:</span>
            <span class="pull-right red">10</span>
          </div>
          <div>
            <span>保证金:</span>
            <span class="pull-right red">
              {{item.deSummary.split(',')[1].split("：")[1] + "," + item.deSummary.split(',')[2]}}
            </span>
          </div>
          <div  class="col-xs-6" >
            <span>市值:</span>
            <span class="pull-right red">
              {{ item.deSummary.split('：')[1].split('.')[0].replace(/,/g, '') +'0'}}
            </span>
          </div>
          <div>
            <span>买入股数:</span>
            <span class="pull-right red">
              {{ item.deSummary.split('：')[3].split('，')[0] }}
            </span>
          </div>
          <div  class="col-xs-6" >
            <span>买入价格:</span>
            <span class="pull-right red">
              {{ item.deSummary.split('，')[1].split('买入价格：')[1]}}
            </span>
          </div>
          <div>
            <span>买入手续费：</span>
            <span class="pull-right red">
              {{ item.deSummary.split('买入手续费：')[1].split(',')[0]}}
            </span>
          </div>
          <div class="col-xs-6"  >
            <span>印花税:</span>
            <span class="pull-right red">
              <!-- <span class="pull-right red">{{ item.deSummary.split("：")[4].split(',')[0] }}</span> -->
              <span class="pull-right red">
                {{ (parseFloat(item.deSummary.split('：')[3].split('，')[0]) * parseFloat(item.deSummary.split('，')[1].split('买入价格：')[1]) * 3 / 10000).toFixed(2) }}
              </span>
              
              <!-- {{ item.deSummary.split('：')[3].split('，')[0] }} * {{ item.deSummary.split('，')[1].split('买入价格：')[1]}} * 3 / 10000 -->
            </span>
          </div>
          <div>
            <span>买入时间</span>
            <span class="pull-right red">
              {{ new Date(item.addTime) | timeFormat}}
            </span>
          </div>
        </div>
        <div v-if="item.deType=='总盈亏'" class="capital">
          <div  class="col-xs-6">
            <span>买卖方向:</span>
            <span class="red pull-right">{{item.deSummary.split("，")[0]}}</span>
          </div>
          <div>
            <span>股票名称:</span>
            <span class="red pull-right">{{item.deSummary.split(',')[0].split("，")[1]}}</span>
          </div>
          <div  class="col-xs-6">
            <span>占用本金:</span>
            <span class="pull-right red">{{ item.deSummary.split("：")[1].split(',')[0]  }}</span>
          </div>
          <div  >
            <span>总手续费:</span>
            <span class="pull-right red">
              <span class="pull-right red">{{ item.deSummary.split("：")[2].split(',')[0]  }}</span>
            </span>
          </div>
          <div class="col-xs-6" >
            <span>卖出手续费:</span>
            <span class="pull-right red">
              <span class="pull-right red">{{ item.deSummary.split("：")[3].split(',')[0]  }}</span>
            </span>
          </div>
          <div  >
            <span>印花税:</span>
            <span class="pull-right red">
              <span class="pull-right red">{{ item.deSummary.split("：")[4].split(',')[0]  }}</span>
            </span>
          </div>
          <div  class="col-xs-6">
            <span>盈亏:</span>
            <span class="pull-right red">
              <span class="pull-right red">{{ item.deSummary.split("：")[5].split('，')[0]  }}</span>
            </span>
          </div>
          <div>
            <span>总盈亏:</span>
            <span class="pull-right red">
              <span class="pull-right red">{{ item.deSummary.split("：")[6] }}</span>
            </span>
          </div>
          <div >
            <span>卖出时间</span>
            <span class="pull-right red">
              {{ new Date(item.addTime) | timeFormat}}
            </span>
        </div>
        </div>
      </li>
    </ul>


    <!-- <ul  class="czjl">
      <li  class="czli lizj"  v-for="item in list" :key="item.key">
        <div  class="title">
          <p > {{item.deSummary}} </p>
          <h3 >
            <span >{{new Date(item.addTime) | timeFormat}}</span>
            <a >{{item.deAmt}}</a>
          </h3>
        </div>
      </li>
    </ul> -->


    <div v-show="loading" class="load-all text-center">
      <mt-spinner type="fading-circle"></mt-spinner>
      加载中...
    </div>
    <div v-show="!loading" class="load-all text-center">
      已全部加载
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import * as api from '@/axios/api'

export default {
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {},
  computed: {},
  created() { },
  mounted() {
    this.getcashDetail()
  },
  methods: {
    async getcashDetail() {
      // 获取资金明细
      let opts = {
        pageNum: this.pageNum,
        pageSize: 10
      }
      let data = await api.cashDetail(opts)
      if (data.status === 0) {
        data.data.list.forEach(element => {
          this.list.push(element)
          console.log("XXXXXX", element)
        })
        this.total = data.data.total
      } else {
        Toast(data.msg)
      }
    },
    async loadMore() {
      if (this.list.length < this.pageSize || this.total <= this.pageNum * this.pageSize) {
        return
      }
      this.loading = true
      // 加载下一页
      this.pageNum++
      await this.getcashDetail()
      this.loading = false
    }
  }
}
</script>
<style lang="less" scoped>
.table-list {
  padding: 0.2rem 0;

  .list-body {
    padding: 0.1rem 0.2rem;

    .capital {
      padding: 0.2rem;
      border-radius: 0.2rem;
      border: 0.01rem solid #3f444a;

      div {
        line-height: 0.4rem;
      }

      .col-xs-4 {
        padding-left: 0;
        padding-right: 0;
      }

      .pro {
        color: #999;
      }
    }
  }
}

.load-all {
  background-color: #fff;
}


.czjl {
    width: 9.4785rem;
    margin: 0 auto;
    margin-top: 0.1602rem;
}

.lizj {
    margin: 0 auto;
    margin-bottom: 0.534rem;
    width: 100%;
}
.czli h6 {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-weight: 500;
    height: 0.534rem;
    font-size: 0.3204rem;
    color: #666;
    line-height: 0.534rem;
    padding-left: 0.267rem;
    padding-top: 0.1335rem;
}
.czli h5{
    font-size: 0.4005rem;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000;
    margin-top: 0.267rem;
    margin-left: 0.267rem;
}
 .riqi {
    margin-top: 0.2937rem;
    color: #666;
    font-size: 0.267rem;
    margin-left: 0.267rem;
}


.title {
    width: 9.078rem;
    margin: 0 auto;
    font-weight: 500;
}

.title p{
    font-size: 0.4272rem;
    color: #666;
    line-height: 0.534rem;
    padding-top: 0.267rem;
}
.title h3{
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 0.2136rem;
    font-weight: 500;
}
.title h3 span {
    font-size: 0.3204rem;
    color: #999;
}
.title h3 a{
    font-size: 0.4806rem;
    color: #333;
}
</style>
