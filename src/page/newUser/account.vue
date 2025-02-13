<template>
  <div class="wrap">
    <div class="head">
      <div rech="true">
        <h2><span class="hbnh"><a class="fan" @click="$router.go(-1)"></a></span> 充值 </h2>
      </div>
    </div>
    <ul  class="ganh" style="font-size: 14px;">
      <li @click="$router.push('/loginPassword')">
        <div  class="le" ><img
            src="data:image/png;base64,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">
          <p >登录密码</p>
        </div><span ></span>
      </li>
      <li @click="$router.push('/setPassword')">
        <div  class="le"><img
            src="data:image/png;base64,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">
          <p >支付密码</p>
        </div><span ></span>
      </li>
      <li @click="$router.push('/bankCard')">
        <div  class="le"><img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABKVBMVEVHcEzzQjfzSTHzQzfwPDz1RDf0Qzb1RDb0RDbzRDbzRDX0Qzf0Qzb/Ri7zQzb0Qzb0RDn/QED1RDf/TTP0Qzb0Qzb1QTj0QzbzQzbzQTX0RDb0Qjf1Qjb0QzbzRDb0QzbyQDP0QzX0Qzb0QzfzQzb0RDb1Qzb0Qzb0Qzb/VSvuRDP0Qzb/AADzQzXzQzf0Qzb0QzbzQzfzRDfzQzb0Qzb0QzX/MzP/OTn/SST0RDbzQzbzQjb1QzbzQzX0Qjb/VVX0RDbyQzb2QjbzRjrzRDb0Qzb0QzX1RDb0Qzb0Qjf0QzbyRDf0QjfzQjb0QzbqQED0Qzf/gAD0Qzb0Qzb0QjbrOzv0Qzf0Qzb0Qzb0RTXzQzXzQjX1RTbzQzf1QjX1Qzb2Qjn0RDb0QzbKz3K+AAAAYnRSTlMAgxVrEWb7qsyAUi7xC8b4LQRiCr6zTvCYK4hGZNCX9BS/5EXF7vP3/AYP+gFXguPoKlOv8tIFCQdHhUJMaqkDdRNRFoTm5UvRcNY811VfDKgC743qDRf+nEOBPjRUTWcbpuagDToAAAFwSURBVGje7ZlnU8JAFEUDIhENELogKlWK2Hvvvffe9v//CPcFM7Nk/OL4osPMPV/27c3MntmQhMyLpgEAAACMBLN6qIuRkJ6NOR0LO4Kd3b5WR7IqXMC/rDq2DOEKlzlFsk1JJa4zEg/TmqOKZEbOUxO8V1Kazk6/EgzK+QD39dorFx1S5rSzALckQKtCAgkkP5ZkfMxkvpG4AyS/kSQ6mUngZmwfSS1oR5Ebu1qr80reKtXFZvJi3N03rGrpWkzNMkrqw3I0Kbgoy6r5lnksq1NGiUnjJgU5qlasY35ZeRglPTR2U+ClqgMSSNpM8k7jEwXzdFuOWMfGZXXA+Vj5EKIUsZIrIQ7PrGpdiMItp6RRTNa+oqNJ+1n5fOLD/wkkkEACCSSQQPK/kj9p2e7LuZHmdZjTjuazh3YWznO20fNWG/1RkXhT7nRWyhvq3l79rnza2Gs9g8UCv2Pswfk7xaKrrJ+bSufROQ0AAABg5BOZR0VdmfUUIAAAAABJRU5ErkJggg==">
          <p >银行卡</p>
        </div><span ></span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="less" scoped>
  .wrap {

    .head {
      width: 100%;
      height: 1.1748rem;
      background: -webkit-gradient(linear, right top, left top, from(#e73241), to(#ff4e17));
      background: linear-gradient(270deg, #e73241, #ff4e17);


    }

    .hbnh {
      position: absolute;
      left: 0.4005rem;
      font-size: 0.4272rem;
      font-weight: 500;

    }

    .head h2 {
      text-align: center;
      height: 1.2549rem;
      width: 100%;
      position: relative;
      line-height: 1.2549rem;
      font-size: .4806rem;
      color: #fff;
      background: transparent;
      font-weight: 500;
      z-index: 3;
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

    .jut {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .ganh {
      -webkit-box-shadow: 0 .037037rem .092593rem 0 rgba(0, 0, 0, .1);
      box-shadow: 0 .037037rem .092593rem 0 rgba(0, 0, 0, .1);
      border-radius: .185185rem;
      margin: .267rem;
      padding: .267rem;
      list-style: none;
  }
  .le {
      margin-top: .3471rem;
      display: flex;
  }
  .ganh li .le p {
      color: #333;
      font-size: .3738rem;
      line-height: .534rem;
      margin-left: .1602rem;
  }
  .ganh li .le img {
      width: .534rem;
      height: .534rem;
  }
  .ganh li {
      border-bottom: .0267rem solid #ccc;
      height: 1.2282rem;
      margin: 0 auto;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      display: flex;
  }
  .ganh li span {
      width: .1602rem;
      height: .2937rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAYAAAD0OH0aAAAAAXNSR0IArs4c6QAAAXZJREFUOE+F0zEvBEEUB/D/OyHhU8kpiMiJHKK6Rt7MJjSiUlGpRKOatwmJQthIJKKgEAUFBYVKfAUkS+IKyc2TuSzZc3Nnup19v83Oe/8hEdkDMEtES8y8j38WicgngBEALVVtWGsP+hlyzq0S0VZR1CKiBWY+7oUovEjTdF1VN4qiLwB1Y8xZDLVBWCKyCWCthGrGmIu/6BcUaBvASlHUVNUpa+1VGXUAVQ1N2AkdK6Fxa+3ND+oAYTOgNE1TAItF0buqBnQXnrtA2MyybCDP810AjRKqWmsfoqCEwkzmC/SqqtWeIBQ55waJ6AjATIGe+4Isy4byPD8BMFmAp54g8vUX7/1ov0P//j8RvQGoMvNjF4h1iIjGmPm+q62RGXwQ0Tgz33YNLjZlIppg5utoNESkI0fe+1qSJJfR8P1Nqvd+OkmS82i8RSREOkQ7rHAX5owxp7Hi9qFFpAlgOFzR/25bGzjnXKVSqavqsjHmsNeXf/a/AbF8tU103ogbAAAAAElFTkSuQmCC) no-repeat 50%;
      background-size: 100%;
      margin-top: .534rem;
  }
</style>
