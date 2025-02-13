<template>
  <div class="user_page">
    <!-- <div class="content">
      <div class="top_icon">
        <div class="right_icon">
          <div @click="goToTopUp()">
            <img src="@/assets/img/qianbao.png" alt />
          </div>
          <div @click="goOnline" style="justify-content: flex-end;">
            <img style="width: 0.5rem;height: 0.5rem;" src="@/assets/img/kefu.png" alt />
          </div>
        </div>
      </div>
      <div class="users" @click="goWall()">
        <div class="left_tou">
          <div class="left_tx">
            <div>
              <img src="@/assets/img/eslogo.png" alt />
            </div>
          </div>
          <div class="right_name">
            <span>{{ userInfo.realName ? userInfo.realName : userInfo.phone }}</span>
          </div>
        </div>
        <div class="right_go">
          <img src="@/assets/img/youjiantou.png" alt />
        </div>
      </div>
      <div class="center_card">
        <div class="keyon">
          <span>{{ $t('hj49') }}</span>
        </div>
        <div class="num_price" v-if="userInfo.length == 0">
          ¥0
        </div>
        <div class="num_price" v-if="userInfo.length != 0">
          <p v-if="this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay"
            class="account">
            ¥{{ $store.state.hide ? '****' : Number($store.state.userInfo.userAmt +
                $store.state.userInfo.userIndexAmt).toFixed(2)
            }}
          </p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && this.$store.state.settingForm.futuresDisplay"
            class="account">
            ¥{{ $store.state.hide ? '****' : Number($store.state.userInfo.userAmt +
                $store.state.userInfo.userFuturesAmt).toFixed(2)
            }}
          </p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay"
            class="account">¥&nbsp;&nbsp;{{ $store.state.hide ? '****' :
                Number($store.state.userInfo.userAmt).toFixed(2)
            }}</p>
        </div>
        <div class="yk es">
          <div>
            <span>{{ $t('hj55') }}</span>
          </div>
          <div>
            <span>{{ $t('hj141') }}</span>
          </div>

          <div>
            <span>{{ $t('hj48') }}</span>
          </div>
        </div>
        <div class="yk as">
          <div>
            <span class="orenge">¥ {{ userInfo.length != 0 ? ($store.state.userInfo.allFreezAmt + $store.state.userInfo.djzj).toFixed(2) : 0
            }}</span>
          </div>
          <div v-if="userInfo.length == 0">
            <span v-if="!selectUserFlag">
              <span>{{ '¥ 0' }}</span>
            </span>
            <span v-else>
              <span>{{ '¥ 0' }}</span>
            </span>
          </div>
          <div v-if="userInfo.length != 0">
            <span v-if="!selectUserFlag">
              <span
                :class="$store.state.userInfo.allIndexProfitAndLose > 0 ? ' red' : $store.state.userInfo.allIndexProfitAndLose < 0 ? ' green' : ''">{{
                    '¥ ' + $store.state.userInfo.allIndexProfitAndLose
                }}</span>
            </span>
            <span v-else>
              <span
                :class="$store.state.userInfo.allProfitAndLose > 0 ? ' red' : $store.state.userInfo.allProfitAndLose < 0 ? ' green' : ''">{{
                    '¥ ' + $store.state.userInfo.allProfitAndLose
                }}</span>
            </span>
          </div>

          <div v-if="userInfo.length == 0">
            <span class="bzz" v-if="!selectUserFlag">{{ '¥ 0' }}</span>
            <span class="bzz" v-else>{{ '¥ 0' }}</span>
          </div>
          <div v-if="userInfo.length != 0">
            <span class="bzz" v-if="!selectUserFlag">{{ '¥ ' + $store.state.userInfo.enableIndexAmt }}</span>
            <span class="bzz" v-else>{{ '¥ ' + $store.state.userInfo.enableAmt }}</span>
          </div>

        </div>
        <div class="btns" @click="handleZh()" :class="selectUserFlag ? '' : 'active'">
          <span>{{ selectUserFlag ? $t('hj142') : $t('hj143') }}</span>
        </div>
      </div>
      <div class="jy" @click="goToSettings()">
        <div class="left_gn">
          <div class="l_icon">
            <img src="../../assets/img/xiugaimima.png" alt />
          </div>
          <div class="r_title">
            <span>{{ $t('hj144') }}</span>
          </div>
        </div>
        <div class="right_gos">
          <img src="../../assets/img/youjiantou.png" alt />
        </div>
      </div>
      <div class="jy" @click="handleGoToTransfer()">
        <div class="left_gn">
          <div class="l_icon">
            <img src="../../assets/img/huazhuan2.png" alt />
          </div>
          <div class="r_title">
            <span>{{ $t('hj145') }}</span>
          </div>
        </div>
        <div class="right_gos">
          <img src="../../assets/img/youjiantou.png" alt />
        </div>
      </div>
      <div class="jy" @click="handleGoToAuthentication()">
        <div class="left_gn">
          <div class="l_icon">
            <img src="../../assets/img/shiming.png" alt />
          </div>
          <div class="r_title">
            <span>{{ $t('hj146') }}</span>
          </div>
        </div>
        <div class="right_gos">
          <img src="../../assets/img/youjiantou.png" alt />
        </div>
      </div>
      <div class="jy" @click="handleGoToBankCard()">
        <div class="left_gn">
          <div class="l_icon">
            <img src="../../assets/img/shiming.png" alt />
          </div>
          <div class="r_title">
            <span>{{ $t('hj147') }}</span>
          </div>
        </div>
        <div class="right_gos">
          <img src="../../assets/img/youjiantou.png" alt />
        </div>
      </div>
      <div class="jy" @click="handleOutLoginClick()">
        <div class="left_gn">
          <div class="l_icon">
            <img src="../../assets/img/out2.png" alt />
          </div>
          <div class="r_title">
            <span>{{ $t('hj148') }}</span>
          </div>
        </div>
        <div class="right_gos">
          <img src="../../assets/img/youjiantou.png" alt />
        </div>
      </div>
    </div>
    <van-popup v-model="settingDialog" position="bottom" :style="{ height: '40%' }">
      <div class="setting_content">
        <div class="old_password">
          <div class="left_titles">
            <span>{{ $t('hj150') + ':' }}</span>
          </div>
          <div class="right_password_input">
            <input type="password" v-model="oldPassword" />
          </div>
        </div>
        <div class="old_password">
          <div class="left_titles">
            <span>{{ $t('hj151') + ':' }}</span>
          </div>
          <div class="right_password_input">
            <input type="password" v-model="newPassword" />
          </div>
        </div>
        <div class="old_password">
          <div class="left_titles">
            <span>{{ $t('hj152') + ':' }}</span>
          </div>
          <div class="right_password_input">
            <input type="password" v-model="cirNewPassword" />
          </div>
        </div>
        <div class="btn_setting" @click="changeLoginPsd()">
          <span>{{ $t('hj153') }}</span>
        </div>
      </div>
    </van-popup> -->
    <div class="head">
      <div class="tbox">
        <!-- <img src="~@/assets/img/yifu.png" />
        <img src="~@/assets/img/lingdang.png" /> -->



      </div>
      <div class="userHead">
        <div class="tl">
          <img class="touxiang" src="/static/img/touxiang.jpg" />
          <div class="mingzi">
            <p>{{ phone11 }}</p>
            <div class="feae" v-if="(!showBtn&&this.$store.state.userInfo.isActive != 1)">
              <img src="~@/assets/imgRed/jinse.png" />
              <span>已实名</span>
            </div>
            <div class="feae" v-if="(showBtn)" @click="$router.push('/smrz')">
              <img src="~@/assets/imgRed/yinse.png" />
              <span>未实名</span>
            </div>
          </div>
        </div>
        <div class="tr" @click="$router.push('/setup')"></div>
      </div>
    </div>
    <div class="zijk">
      <h5>
        账户总资产(沪深账户)
      </h5>
      <div class="kunk">
        <van-circle v-model="currentRate" :rate="rate" :clockwise="false" class="daxiao" color="#F44336"
          layer-color="#e6e6e6" stroke-width="60" />
        <div class="zican">
          <p v-if="this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay"
            class="yans">
            ¥{{ $store.state.hide ? '****' : $store.state.userInfo.userAmt ? (Number($store.state.userInfo.userAmt + $store.state.userInfo.userIndexAmt).toFixed(2)) : 0}}
          </p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && this.$store.state.settingForm.futuresDisplay"
            class="yans">
            ¥{{ $store.state.hide ? '****' : $store.state.userInfo.userAmt ? (Number($store.state.userInfo.userAmt + $store.state.userInfo.userFuturesAmt).toFixed(2)) :0 }}
          </p>
          <p v-else-if="!this.$store.state.settingForm.indexDisplay && !this.$store.state.settingForm.futuresDisplay"
            class="yans">
            ¥&nbsp;&nbsp;{{ $store.state.hide ? '****' : $store.state.userInfo.userAmt ? (Number($store.state.userInfo.userAmt).toFixed(2)) : 0 }}
          </p>
          <p>账户总资产</p>
        </div>
      </div>
      <div class="boxk">
        <div class="bdan">
          <p style="display: flex; align-items: center;">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABVVJREFUWEfFl2tsk2UUx3/Pu7Zrd2FjwNaNSwYbasAAKsotYKYSEUk0GAKSoEZGApKYaKKSGMOInyYfQINfQESjYUrw8gGMCmQagqiJiiMgchsXGYONiVvbbe3Wx5w+79Z27dsVQ+JJlqXt85zzf87lf85RZCmaEwWQ9zhEa0DNACYCRfb1f4Bm0MfAaoTQfsXUQDaq1XCHNGerwXoNeBrIH+68/XsQaIBovaL6bKY7jgA0zV6I1oF6CfBkaXjosTDorWBtVEzsSacjLQDNmSrI2QuIq2+HHIPosnTeSAGguXAvRL8Cym6H5QQd18BarKj8NVFvEgA73j8AY26z8QF1bRCdm+iJQQCayz6IHAWmpxif4IIn82C+F6Z6wJ8DIyzQGjo1XO2D4xE43ANfBqGlPxP+JnDPVozvlkMJAM7Vg3o16WaVGzaXwBN5YAFX+uH3XrjcDzej5uhoC8a6YIYNTGx/HoRXOuBinwMQ/ZaiSirLALCT7g/APXhjZi586wefgnc6YWcXnI5kjswUN6wuhHUjIKRhQQucTHsnAtEpEgobwPkdQG2S9p8rjKsfboUzwxgeCusuN3xfDk1hWNjqBHqnYlKt0pwqBM/VFJIJVcKHAVjX/t/ycW8pLPBC6SWn+0EIlytN83LQn6Sc+qIMHvVBbTvszopVjQrx6foRsHUUNARgVVuGB6gVSnN+O7Am5dRDPjjkN18fDxtvNHbDiQj06uTjXmWSUO48UwB32qk0swV+6c3kwR0C4EdgVsqpoxVQ5YK3O2FVglJJ/pY+6NbmtT4LKnLi9SRx3xuEDcWmLBc55oCY/EkAiI9GpwDoqYT3u+CFG+YneZXE9A43jHdBgZLygYCGS31wKgJHeuKVIjnwoBfGOOaAaG0XAOKj1GZzwA8P5MLS63AoxhmZRQA+WwDTPCAhmes17p8v+e0oYWcAs3NBwiCv/KYbPgoYINfSsFzdSHi9CJSCE2HDAXe7ocCC/SFY2QadNnElY4kBSB8C8YC8YkcXLMs3cY45rd8wYUc/WArKckAI6NMgvHwjTsN5Cl4sgjeL4Ts7F1Kxx0KQPgklB4T91t8Al4I5uTA3N54D0guEhoWu9wRhxXXjLXF/oQVttrU1hbB9NDzfDru6hsYiloTpy3CgCoQJpQzTycZieGMkTLhkXl5kwUG/ASUMKDkglXJynAG0ICUfpAwdiGiAB8LaxF/+jvaCfB6QfWUwThrRFchVcLgcpnugPQoSgnl2L9g2Cp4rhIILQ54RIyIHKhYmfMwH+0KwJM8YkNr/MwIXhAeiUOMzHW92CxRbcHqcMSC9Y5bXcMDBbtgyCtYWgi8JQAjC/oFm9B6wOglebyXsCsDadiix4BGfmQek3OTVEmtpViJjLkJQm1mh0Q8lOVDbBh/YFH6kHPIt46m4mGYkn+1J6GRSO/5trDEscXPq61Ilorzub9h006iuFoA5JvNFBLhU1IYOqJfpPSYR0FMVVWecB5J5Xvi6DGSm2NYJHweM+4fKnlJYmm9KUM4llvtCHzSUmpK954rxkpHNikmx4WfoSCYlOW3QxmQ3bC2BRfZE9Jc9esn/jqjhzwoXLLfXBYn9ge7Y+7jfY3hEQC9uhfOD01ETeOcoKkJJABJCkTqUTnKZREzMASm5fg1d2oToVNiAuc9jeEOmJ2nj73ZBYNAtzkPpwKv/17E8DiK2jn2WFI7U6N/KN00QfSqrxSQOIraabbJXs/iweitmTbZvueXVLNGG5txke1xfCeRlaV/6927Q9VJqme4Mux3HPRJbz5eArrF3RlnPi+3fhQSagWOgZD3fl+16/i91NuTW6o8hHwAAAABJRU5ErkJggg=="
              style="width: 0.4272rem; height: 0.4272rem; margin-right: 0.1602rem;" />
            沪深冻结保证金
          </p>
          <h6>
            ¥ {{ userInfo.length != 0 ? ($store.state.userInfo.allFreezAmt + $store.state.userInfo.djzj).toFixed(2) : 0 }}
          </h6>
        </div>
        <div class="bdan">
          <p style="display: flex; align-items: center;"><img
              src="data:image/png;base64,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"
              style="width: 0.4272rem; height: 0.4272rem; margin-right: 0.1602rem;"> 沪深可用资金</p>
          <h6 style="margin-left: 0.534rem;">
            <span class="bzz" v-if="!selectUserFlag">{{ '¥ ' + ($store.state.userInfo.enableIndexAmt || 0) }}</span>
            <span class="bzz" v-else>{{ '¥ ' + ($store.state.userInfo.enableAmt || 0) }}</span>
          </h6>
        </div>
        <div class="bdan" v-if="this.yingkui==0">
          <p style="display: flex; align-items: center;"><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA/hJREFUWEfFl11sVEUUx38zu620yEdwaUWjUFEjKFoMKjaibJRGWkmMSFBfqU9Gow8Uw4ua+FJJ/HgwMVSNT9UYeRIbU0pKdC0lJrbpA9KUpCkVsWmBNrDttrt3xsyd/ea2965s47zc5M455/+fM+ecOUcQcOkebsUJNaN0FCHqQdcBq9Lq0yBG0HoAKXoIOT+JKNeDmBZ+Qvpn7iUsD6F5FVjuJ5/ejyP4lpRqE89zfjGdBQnoHpbhyPfRvANUBgQuFptH8ykV6j0RJeFlw5OAPslGlPwBqP+PwMVqAzhqn5c3biCgT/IoSnYCtWUCz5gZR6om8Sx/5NstIODed0j2AmvLDJ4xN4GjGvI9kSWge6liRp5G80hZwNdE4aEOSIxBfxMkJzNmB1mutosGZs2PHIEu2YagtSzgxsjDx6DmRWvu7AH4+5ucac1HolEdyhJIB92fQIUvgYrbILIbpn6D2RFvcRGCrZ2w5jlIXoXft8NMQTYmcdRmcxWuB3S3bEfT4gtuBB4/Ayu3WZfG7gEnXqhmwDe1Q2oaxj6zX0OieGm+Eo2qRegYK5iVlwIXmZ1XIGwKoIZf18PcxZxpIS24cw2GTPnQi50pTpVaJ3R3aD9afxfo9LX7oO4wzI1DeCVMdsLIh2lVAZsNeByG3vYDtzpCvCL0CXkUeN2XQO3LsP5gOqIvg6yELd/bOEhdger7ITkFQ28FA7eA7UKfCPWBfmJRAjV7YUNrDjwjXBGBZ/6xyZSaglORUsCN3hnjgQnAaBYu42ITxSbq72yB/ub8XLay4dXw9CXrjflx+OUO+3/TUah5KWfPuQ6xDV5nnDQE5jwfm8d6YZVxjIbYRkiMejsp0mzz/eLXMH3aytT/CJGmQvnukJf+/MIEdl61gWZWrA4SF3zDJCtQIgHvKzBBd9ebMHEcRo94g4dWgAzn9lLXQKdK8YC5ggBB6AV/yzrYMZZfzWH0Yxg+WAIBG4TB0rCYxLK74amiUvzXF3DujRIImDT0K0Qm1badAmfGUghVQ/9ue/KbJeAWIr9SbE76wOcwsCcX4ecP2xp/cwRmqFK328eoS36J4IBnpC0Vgcxj5BKwndBZz+d4aQgk0epB0ciwf0OyNASOiF3KbX4KW7K47DO9TMFVlJ/AIAn1pNiDG9X+TWllDTScg+Rly6tyLfRttVmx4wKIvEJkCtbwu7ClA2r3F74FPe4QtXBTmpH+X9vyLAkblMduuI7gr0Gx5CCO2htoMMmSMKNZUn6AcEcz/2bVm1wSzSclj2b5tnQX9yFlK5rXgOqATphF0wGqzaTaYjq+03GeR8x4/gJaR9GiHuGO56vT+1NoMYLQAwh3PD8edDz/F5zhrmiE4ANeAAAAAElFTkSuQmCC"
              style="width: 0.4272rem; height: 0.4272rem; margin-right: 0.1602rem;"> 持仓总盈利 </p>
          <h6  :class="this.total >= 0 ? 'red' : 'green'" style="margin-left: 0.534rem;">等待开市</h6>
        </div>
		<div class="bdan" v-if="this.yingkui!=0">
		  <p style="display: flex; align-items: center;"><img
		      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA/hJREFUWEfFl11sVEUUx38zu620yEdwaUWjUFEjKFoMKjaibJRGWkmMSFBfqU9Gow8Uw4ua+FJJ/HgwMVSNT9UYeRIbU0pKdC0lJrbpA9KUpCkVsWmBNrDttrt3xsyd/ea2965s47zc5M455/+fM+ecOUcQcOkebsUJNaN0FCHqQdcBq9Lq0yBG0HoAKXoIOT+JKNeDmBZ+Qvpn7iUsD6F5FVjuJ5/ejyP4lpRqE89zfjGdBQnoHpbhyPfRvANUBgQuFptH8ykV6j0RJeFlw5OAPslGlPwBqP+PwMVqAzhqn5c3biCgT/IoSnYCtWUCz5gZR6om8Sx/5NstIODed0j2AmvLDJ4xN4GjGvI9kSWge6liRp5G80hZwNdE4aEOSIxBfxMkJzNmB1mutosGZs2PHIEu2YagtSzgxsjDx6DmRWvu7AH4+5ucac1HolEdyhJIB92fQIUvgYrbILIbpn6D2RFvcRGCrZ2w5jlIXoXft8NMQTYmcdRmcxWuB3S3bEfT4gtuBB4/Ayu3WZfG7gEnXqhmwDe1Q2oaxj6zX0OieGm+Eo2qRegYK5iVlwIXmZ1XIGwKoIZf18PcxZxpIS24cw2GTPnQi50pTpVaJ3R3aD9afxfo9LX7oO4wzI1DeCVMdsLIh2lVAZsNeByG3vYDtzpCvCL0CXkUeN2XQO3LsP5gOqIvg6yELd/bOEhdger7ITkFQ28FA7eA7UKfCPWBfmJRAjV7YUNrDjwjXBGBZ/6xyZSaglORUsCN3hnjgQnAaBYu42ITxSbq72yB/ub8XLay4dXw9CXrjflx+OUO+3/TUah5KWfPuQ6xDV5nnDQE5jwfm8d6YZVxjIbYRkiMejsp0mzz/eLXMH3aytT/CJGmQvnukJf+/MIEdl61gWZWrA4SF3zDJCtQIgHvKzBBd9ebMHEcRo94g4dWgAzn9lLXQKdK8YC5ggBB6AV/yzrYMZZfzWH0Yxg+WAIBG4TB0rCYxLK74amiUvzXF3DujRIImDT0K0Qm1badAmfGUghVQ/9ue/KbJeAWIr9SbE76wOcwsCcX4ecP2xp/cwRmqFK328eoS36J4IBnpC0Vgcxj5BKwndBZz+d4aQgk0epB0ciwf0OyNASOiF3KbX4KW7K47DO9TMFVlJ/AIAn1pNiDG9X+TWllDTScg+Rly6tyLfRttVmx4wKIvEJkCtbwu7ClA2r3F74FPe4QtXBTmpH+X9vyLAkblMduuI7gr0Gx5CCO2htoMMmSMKNZUn6AcEcz/2bVm1wSzSclj2b5tnQX9yFlK5rXgOqATphF0wGqzaTaYjq+03GeR8x4/gJaR9GiHuGO56vT+1NoMYLQAwh3PD8edDz/F5zhrmiE4ANeAAAAAElFTkSuQmCC"
		      style="width: 0.4272rem; height: 0.4272rem; margin-right: 0.1602rem;"> 持仓总盈利 </p>
		  <h6  :class="this.total >= 0 ? 'red' : 'green'" style="margin-left: 0.534rem;"> {{ '¥ ' + (this.total || 0) }}</h6>
		</div>
        <div class="bdan" >
          <p style="display: flex; align-items: center;"><img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA/hJREFUWEfFl11sVEUUx38zu620yEdwaUWjUFEjKFoMKjaibJRGWkmMSFBfqU9Gow8Uw4ua+FJJ/HgwMVSNT9UYeRIbU0pKdC0lJrbpA9KUpCkVsWmBNrDttrt3xsyd/ea2965s47zc5M455/+fM+ecOUcQcOkebsUJNaN0FCHqQdcBq9Lq0yBG0HoAKXoIOT+JKNeDmBZ+Qvpn7iUsD6F5FVjuJ5/ejyP4lpRqE89zfjGdBQnoHpbhyPfRvANUBgQuFptH8ykV6j0RJeFlw5OAPslGlPwBqP+PwMVqAzhqn5c3biCgT/IoSnYCtWUCz5gZR6om8Sx/5NstIODed0j2AmvLDJ4xN4GjGvI9kSWge6liRp5G80hZwNdE4aEOSIxBfxMkJzNmB1mutosGZs2PHIEu2YagtSzgxsjDx6DmRWvu7AH4+5ucac1HolEdyhJIB92fQIUvgYrbILIbpn6D2RFvcRGCrZ2w5jlIXoXft8NMQTYmcdRmcxWuB3S3bEfT4gtuBB4/Ayu3WZfG7gEnXqhmwDe1Q2oaxj6zX0OieGm+Eo2qRegYK5iVlwIXmZ1XIGwKoIZf18PcxZxpIS24cw2GTPnQi50pTpVaJ3R3aD9afxfo9LX7oO4wzI1DeCVMdsLIh2lVAZsNeByG3vYDtzpCvCL0CXkUeN2XQO3LsP5gOqIvg6yELd/bOEhdger7ITkFQ28FA7eA7UKfCPWBfmJRAjV7YUNrDjwjXBGBZ/6xyZSaglORUsCN3hnjgQnAaBYu42ITxSbq72yB/ub8XLay4dXw9CXrjflx+OUO+3/TUah5KWfPuQ6xDV5nnDQE5jwfm8d6YZVxjIbYRkiMejsp0mzz/eLXMH3aytT/CJGmQvnukJf+/MIEdl61gWZWrA4SF3zDJCtQIgHvKzBBd9ebMHEcRo94g4dWgAzn9lLXQKdK8YC5ggBB6AV/yzrYMZZfzWH0Yxg+WAIBG4TB0rCYxLK74amiUvzXF3DujRIImDT0K0Qm1badAmfGUghVQ/9ue/KbJeAWIr9SbE76wOcwsCcX4ecP2xp/cwRmqFK328eoS36J4IBnpC0Vgcxj5BKwndBZz+d4aQgk0epB0ciwf0OyNASOiF3KbX4KW7K47DO9TMFVlJ/AIAn1pNiDG9X+TWllDTScg+Rly6tyLfRttVmx4wKIvEJkCtbwu7ClA2r3F74FPe4QtXBTmpH+X9vyLAkblMduuI7gr0Gx5CCO2htoMMmSMKNZUn6AcEcz/2bVm1wSzSclj2b5tnQX9yFlK5rXgOqATphF0wGqzaTaYjq+03GeR8x4/gJaR9GiHuGO56vT+1NoMYLQAwh3PD8edDz/F5zhrmiE4ANeAAAAAElFTkSuQmCC"
              style="width: 0.4272rem; height: 0.4272rem; margin-right: 0.1602rem;"> 账户总盈利</p>
          <h6 :class="$store.state.userInfo.accountProfitAndLose >= 0 ? 'red' : 'green'" style="margin-left: 0.534rem;">{{ '¥ ' + ($store.state.userInfo.accountProfitAndLose || 0) }}</h6>
        </div>
      </div>
      <div class="congz">
        <a @click="$router.push('/zf')">银转证</a><a @click="$router.push('/withdraw')" class="tx">证转银</a>
      </div>
    </div>
    <div class="grid">
      <div class="grid-item" @click="$router.push('/account')">
        <div class="title"><i class="el-icon-tickets"></i> <span>账户资料</span></div>
        <div class="gray"><span>登录密码</span> <span>支付密码</span>
        </div>
      </div>
      <div class="grid-item" @click="$router.push('/service')">
        <div class="title"><i class="el-icon-headset"></i> <span>联系客服</span></div>
        <div class="gray"><span>如有问题</span> <span>咨询客服</span>
        </div>
      </div>
      <div class="grid-item" @click="$router.push('/warehouse')">
        <div class="title"><i class="el-icon-data-line"></i> <span>股票盈亏</span></div>
        <div class="gray"><span>我的操盘</span> <span>审核状态</span>
        </div>
      </div>
      <div class="grid-item" @click="$router.push('/FundingDetails')">
        <div class="title"><i class="el-icon-bank-card"></i> <span>资金流水</span></div>
        <div class="gray"><span>查看流水</span> <span>充值账目</span>
        </div>
      </div>
    </div>
    <div class="tile" style="font-size: 14px;">常用功能</div>
    <div class="usb">
      <div @click="$router.push('/about?e=4')" class="bl">
        <i class="el-icon-office-building"></i>
        <p>关于我们</p>
      </div>
      <div @click="$router.push('/about?e=2')" class="bl">
       <i  class="el-icon-document"></i>

        <p>用户协议</p>
      </div>
      <div class="bl" @click="$router.push('/about?e=3')">
        <i  class="el-icon-tickets"></i>

        <p>隐私协议</p>
      </div>

      <div class="bl" @click="cleanCache()">
        <i  class="el-icon-delete"></i>

        <p>清除缓存</p>
      </div>
      <!-- <div @click="$router.push('/bankCard')"
      style="display: flex; align-items: center; justify-content: space-between; margin: 0.534rem 0.267rem;"><span
        style="font-size: 14px;"> 金融卡 </span>
      <div style="font-size: 14px;"> 管理 <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAAXNSR0IArs4c6QAAAbxJREFUOE+F079rFEEUB/DvW3+g/8L8NQpBCQaMGFGL2Oj8uE0l2phCxiI2ipUWM3NgEIJyRAttksZGCy20sRL/A0HOC2owrPNkjnfBy+2d2+2+72ffY/YtpZTWmXkp51w7557gPxfFGHcBHAPwh4iWtdZPZ5kCbgK4V0LM3BDRJWPM82mISiHGeBvAHQnt5ZyXnHOv2tAQCLoL4JZ0+k1EZ40x2wfRPhD0AMB1Qbs554VOp/P6XzQGBD0CUEvoBzPPW2vfjtAEYGZKKSUAV6XTDoBT1tr35X4ClIfe+0optQ5gWd7cZ+Y5a+3HVlBCvV7v0GAw2GDmi9LpG4CTU0EJhRCOFEtEi9Lpy0zgvT+qlHoB4Ix0+TwVeO8PK6V6AM5J+GtVVSdaQZm/3+9vENHY/NbaTxNATugxgCsy9/emaebquv4wcazlG3S73cjM1yS80zTN6bqu37V+uBDCQyJakeJPIprXWr9pXY2U0n1mvjHao6qqFrTWY3u0P1IIYY2IVkebysyLzrmtg5s6BCGEVSJak+IegAvGmJdt4RH4RUTHy9/GzJedc5vTwkMQY4wAzgNYMcY8mxUutb/p+c1U0aFG2AAAAABJRU5ErkJggg=="
          style="width: 0.1602rem; height: 0.2937rem;"></div>-->
    </div>
    <div style="overflow-x: auto; display: flex; margin: 0px 0.1rem;"></div>
    <!-- <div class="tile" style="font-size: 14px;">其它功能</div>-->
    <!--    <ul class="ganh" style="font-size: 14px;">
      <li @click="$router.push('/about?e=1')">
        <div class="le"><img src="../../assets/wode/bbgx.png">
          <p>版本更新</p>
        </div><span></span>
      </li>
      <li @click="$router.push('/about?e=2')">
        <div class="le"><img src="../../assets/wode/yhxy.png">
          <p>用户协议</p>
        </div><span></span>
      </li>
      <li @click="$router.push('/about?e=3')">
        <div class="le"><img src="../../assets/wode/ystk.png">
          <p>隐私协议</p>
        </div><span></span>
      </li>
      <li @click="$router.push('/about?e=4')">
        <div class="le"><img src="../../assets/wode/gywm.png">

          <p>新手帮助</p>
        </div><span></span>
      </li>
    </ul> -->
  </div>
</template>

<script>
import * as api from "@/axios/api";
import { Toast } from "mint-ui";
import { isNull, pwdReg } from "@/utils/utils";
import { MessageBox } from 'mint-ui'
import { compress } from "@/utils/imgupload";

export default {
  name: "newUser",
  data() {
    return {
      name: "大狗子",
      selectUserFlag: true,
      settingDialog: false,
      oldPassword: "", // 旧密码
      newPassword: "", // 新密码
      cirNewPassword: "", //确认新密码
      userInfo: [],
      onlineService: "",
      currentRate: 100,
      rate: 0,
      showBtn: true,
	  phone11:"",
	  total:0,
	  yingkui:0
    };
  },
  components: {
  },
  created() {
    this.getUserInfo();
    this.getInfoSite();
	this.getListDetails();
  },
  methods: {
	  async getListDetails() {
	  	//获取沪深我的平仓列表
	  	this.loadings = true;
	  	let opt = {
	  		state: 0,
	  		stockCode: '', // 代码
	  		stockSpell: '', // 简拼
	  		pageNum: this.pages,
	  		pageSize: 15
	  	}
	  	let data = await api.getOrderList(opt)
	  	this.loadings = false;
	  	if (data.status === 0) {
			let total =0
			let yingkui =0
	  		data.data.list.forEach(element => {
				total += element.profitAndLose-element.orderFee
				
				this.total =total.toFixed(2)
				//console.log(parseFloat(element.now_price))
				yingkui +=    parseFloat(element.now_price)
				this.yingkui =yingkui.toFixed(2)
				
	  		})
	  		this.totals = data.data.total
	  	} else {
	  		Toast(data.msg)
	  	}
	  },
    cleanCache(){
      Toast("清理完成")
    },
    goOnline() {
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
      }
      this.$router.push('/service');
    },
    async getInfoSite() {
      let data = await api.getInfoSite()
      if (data.status === 0) {
        this.onlineService = data.data.onlineService
      } else {
        Toast(data.msg)
      }
    },
    goWall() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      this.$router.push('/wallet')
    },
    handleZh() {
      this.selectUserFlag = !this.selectUserFlag;

      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
      }
    },
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        // 判断是否登录
        this.$store.commit('dialogVisible', false);
        this.$store.state.userInfo = data.data;
        this.userInfo = data.data;
          this.phone11 = data.data.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        this.rate = data.data.enableAmt / data.data.userAmt * 100;
        if (data.data.isActive === 1 || data.data.isActive === 2) {
          this.showBtn = false
        }
      } else {
        this.$store.commit('dialogVisible', true);
      }
    },
    goToTopUp() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
      }
      this.$router.push("/wallet");
    },
    handleOutLoginClick() {
      // 退出登录
      MessageBox.confirm(this.$t('hj149') + '?', this.$t('hj165'), {
        confirmButtonText: this.$t('hj161'),
        cancelButtonText: this.$t('hj106'),
      }).then(() => {
        this.toRegister();
      }).catch(() => {

      });
    },
    goToSettings() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      // 每次打开dialog 清空密码数据
      this.settingDialog = !this.settingDialog;
      if (this.settingDialog) {
        this.oldPassword = "";
        this.newPassword = "";
        this.cirNewPassword = "";
      }
    },
    handleGoToTransfer() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      this.$router.push("/transfers");
    },
    handleGoToAuthentication() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      this.$router.push("/authentications");
    },
    handleGoToBankCard() {
      if (this.userInfo.length == 0) {
        this.$store.commit('dialogVisible', true);
        return;
      }
      this.$router.push("/bankCard");
    },
    async toRegister() {
      // 注销登陆
      window.localStorage.removeItem("USERTOKEN"); // 清空本地存储 USERTOKEN字段
      this.clearCookie();
      let data = await api.logout();
      if (data.status === 0) {
        // Toast(data.msg)
        this.$router.push("/login");
      } else {
        Toast(data.msg);
      }
      this.$router.push("/login");
    },
    async changeLoginPsd() {
      // 修改密码
      if (
        isNull(this.oldPassword) ||
        isNull(this.newPassword) ||
        isNull(this.cirNewPassword)
      ) {
        Toast(this.$t('hj154'));
        this.settingDialog = false;
      } else if (!pwdReg(this.newPassword)) {
        Toast(this.$t('hj19'));
        this.settingDialog = false;
      } else {
        // 修改密码
        if (this.newPassword === this.cirNewPassword) {
          let opts = {
            oldPwd: this.oldPassword,
            newPwd: this.newPassword
          };
          let data = await api.changePassword(opts);
          if (data.status === 0) {
            this.changeLoginPsdBox = false;
            Toast(data.msg);
            this.settingDialog = false;
          } else {
            Toast(data.msg);
            this.settingDialog = false;
          }
        } else {
          Toast(this.$t('hj155'));
          this.settingDialog = false;
        }
      }
      if (navigator.vibrate) {
        // 支持
        navigator.vibrate([55]);
      }
    }
  }
};
</script>

<style scoped>
	.red {
	    color: #d73d3d !important;
	}
	
	.green {
	    color: #20b844 !important;
	}
  .grid {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: .185185rem;
    grid-row-gap: .185185rem;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    padding: 0 .296296rem;
    margin: .37037rem auto;
  }

  .grid-item {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    background: #fff;
    border-radius: .185185rem;
    min-height: 2.222222rem;
    padding: .185185rem;
  }

  .grid-item .title,
  .grid-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .grid-item .title i {
    font-size: .518519rem;
  }

  .grid-item .title span {
    font-size: .407407rem;
    margin-left: .185185rem;
  }

  .grid-item .gray span {
    font-size: .37037rem;
    color: grey;
    line-height: .444444rem;
  }

  .user_page {
    background-color: #f1f1f1;
    font-size: 14px;
    padding-bottom: 1.3rem;
  }

.head {
  height: 5.67rem;
  width: 100%;
  background: url('~@/assets/imgRed/bjing.b7cbcd97.png') no-repeat 50%;
  background-size: 100%;
  position: relative;
}

.tbox {
  height: 1.1748rem;
  width: 9.345rem;
  margin: 0 auto;
  text-align: right;
}

.tbox img {
  width: 0.5073rem;
  height: 0.5073rem;
  margin-top: 0.3204rem;
  margin-left: 0.2136rem;
}

.userHead {
  display: flex !important;
  width: 8.6775rem !important;
  margin: 0 auto !important;
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
  margin-top: 0.534rem !important;
}

.tl {
  display: flex;
}

.touxiang {
  width: 1.602rem;
  height: 1.602rem;
  border-radius: 50%;
}

.tr {
  width: 0.534rem;
  height: 0.534rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAz9JREFUWEflmMuLjWEcxz9fSaFElKwIYcZtJsol17BgRVhIzUJYKVsLMprxD7CRiYXbBmHBRpFLGguaMcp1xEYWRAkl+emn953OvOd9znnf886Zjjx1Nuf9Xb7P83ue7+8iCi4zOwnsCZg5Jml/ERcqouy6ZvYEmB+w0yuppYiPegPsk7SgbgDNbDSwA7gi6XOaIzN7DcwIgOiXNDOgNwHYCpyX9CO0ieAJmtkY4DqwBugB1kv6VGrIzDy0/m1EwMFvoEVSX0JvEnDTvwF3gE2SvqfZSAWYABfr9QKbJb2N7t5y4EyF04v1+oE2SQ8ivWnANaA09EGQZQAD4GJnP4FHwBTAHeVZ74APQCswKkUxFeQggFXA5QFTq2wZyCTAXcCpWq0PkZ5fh7OxrSRAf1m3gYVD5CyvGX9wqyR9TQUYXWJ/YbcqkG9ep1nl/aWvTTJF6BX7A3gRuMxZHeaR88c3O2aIUsVKPNgNLMnjpYBst6RlmXkwCvUzYE4Bp3lUn0tqygzQzFYA93J4eBORthcOvpyE24DpOWyslHQ/KZ9G1M0R06fm0IQBA44CHZL8Hg0sM3MybgcOAFmKEs/pWyQ9HXQHzewEsDj6c1yUukK5NbnBdklHKp2SmR2OgGY5TM/dL4FvkXCPzMxPoZblO26S9KsKwJGA3+csESkzVQRgp6RDWXZmZh3AwSyyZXewwAlul3Qpi1Mz2wZczCL7XwFs+BC/ApqH45F0RUWkh38sMKtCCT/cNPM4jajnAlcz0oJTVKf/AkTtL9d/WYjaWwMn6kH9S6iaqSXVnQPiLODN1M66pLo4hmbWuMWCgzSz4Sy3HkpamsaT/17BamYTo5K/0Miihqzhffe6iiW/mY2PmqZCA58awMUq3jR5X/Il/qMR287dkgZa37TG/QawusApFFG9C2wsndOERh8hkF41exgmA1NzIvHRx3tgUaBbLAPn9isNj5Ig04ZHp71drAI0bXjkmap0OJB9eFRC1D5+i0H6qW2Q9LEUjJnNAxx4pfFbq6S4mfqrbmbFxm8lIH2A6Snrch0HmBdCs8FgiPPcrSoz6vqOgLMANTMPcYjUGwLgcWBfYDNdkvZm2WhI5g/TmWFQBGMuAAAAAABJRU5ErkJggg==) no-repeat 50%;
  background-size: 100%;
  margin-top: 0.534rem;
}

  .feae {
    width: 2.0025rem !important;
    height: 0.534rem !important;
    background: #517afa !important;
    border-radius: 10px !important;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex !important;
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
    -ms-flex-pack: distribute !important;
    justify-content: space-around !important;
    margin-top: 0.267rem !important;
  }

.feae img {
  width: 0.3738rem;
  height: 0.3738rem;
}

.tl div {}

.mingzi {
  margin-left: 0.3204rem !important;
  color: #fff !important;
  font-size: .3738rem !important;
  margin-top: 0.267rem !important;
}

.zijk {
  width: 9.345rem;
  padding-bottom: 0.1335rem;
  background: #fff;
  -webkit-box-shadow: 0 0.04626rem 0.1335rem 0 rgb(0 0 0 / 10%);
  box-shadow: 0 0.04626rem 0.1335rem 0 rgb(0 0 0 / 10%);
  border-radius: 0.267rem;
  margin: 0 auto;
  margin-top: -1.4685rem;
  z-index: 2;
  position: relative;
}

.zijk h5 {
  margin-left: 0.267rem;
  padding-top: 0.5073rem;
  font-weight: 500;
  color: #333;
  font-size: 0.3204rem;
}

.kunk {
  padding: 0.4005rem;
  margin: 0 auto;
  margin-top: 0.5073rem;
  position: relative;
}

.boxk {
  width: 8.01rem;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 0.534rem;
}

.bdan {
  width: 50%;
  margin-bottom: 0.4272rem;
}

.bdan h6 {
  color: #ea3544;
  font-size: 0.3738rem;
  margin-top: 0.0801rem;
  font-weight: 700;
  margin-left: 0.534rem;
}

.congz {
  width: 95%;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 0.2937rem;
  padding-bottom: 10px;
}

  .congz a {
    width: 48%;
    height: 1.068rem;
    background: linear-gradient(270deg, #e73241, #ff4e17);
    border-radius: 0.1335rem;
    color: #fff !important;
    font-size: 0.3738rem;
    text-align: center;
    line-height: 1.068rem;
  }

  .tx {
    background: linear-gradient(270deg, #e73241, #ff4e17);
    ;
  }

.tile {
  margin: 0.534rem 0.267rem;
}

.usb {
  width: 9.345rem;
  height: 2.5365rem;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  border-radius: 10px;
}

.bl {
  width: 25%;
  text-align: center;
}
.bl svg{
  width: 0.7743rem;
    height: 0.7743rem;
}
.bl img {
  width: 0.7743rem;
  height: 0.7743rem;
}

.bl p {
  color: #333;
  font-size: 0.3738rem;
  margin-top: 0.267rem;
}

.ganh {
  -webkit-box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  border-radius: 10px;
  margin: 0.267rem;
  padding: 0.267rem;
  list-style: none;
}

.ganh li {
  border-bottom: 0.0267rem solid #ccc;
  height: 1.2282rem;
  margin: 0 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.le {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0.3471rem;

}

.ganh li .le img {
  width: 0.534rem;
  height: 0.534rem;
}

.ganh li .le p {
  color: #333;
  font-size: 0.3738rem;
  line-height: 0.534rem;
  margin-left: 0.1602rem;
}

.ganh li span {
  width: 0.1602rem;
  height: 0.2937rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAAXNSR0IArs4c6QAAAXZJREFUOE+F0zEvBEEUB/D/OyHhU8kpiMiJHKK6Rt7MJjSiUlGpRKOatwmJQthIJKKgEAUFBYVKfAUkS+IKyc2TuSzZc3Nnup19v83Oe/8hEdkDMEtES8y8j38WicgngBEALVVtWGsP+hlyzq0S0VZR1CKiBWY+7oUovEjTdF1VN4qiLwB1Y8xZDLVBWCKyCWCthGrGmIu/6BcUaBvASlHUVNUpa+1VGXUAVQ1N2AkdK6Fxa+3ND+oAYTOgNE1TAItF0buqBnQXnrtA2MyybCDP810AjRKqWmsfoqCEwkzmC/SqqtWeIBQ55waJ6AjATIGe+4Isy4byPD8BMFmAp54g8vUX7/1ov0P//j8RvQGoMvNjF4h1iIjGmPm+q62RGXwQ0Tgz33YNLjZlIppg5utoNESkI0fe+1qSJJfR8P1Nqvd+OkmS82i8RSREOkQ7rHAX5owxp7Hi9qFFpAlgOFzR/25bGzjnXKVSqavqsjHmsNeXf/a/AbF8tU103ogbAAAAAElFTkSuQmCC) no-repeat 50%;
  background-size: 100%;
  margin-top: 0.534rem;
}

.daxiao {
  width: 100% !important;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.zican {
  padding: 1.069335rem;
  margin: 0 auto;

  position: relative;
  font-size: 14px;
}

  .yans {
    color: #F44336 !important;
    font-size: 0.3738rem !important;

}

  .zican p {
    text-align: center;
    color: #333;
    font-size: 0.3204rem;
    padding-top: 0.0835rem;
    font-weight: 700;
  }

  .bzz {
    font-weight: 700;
  }

  .bl i {
    font-size: .740741rem;
  }
</style>


