<template>
  <div class="container">
    <div class="subTitle"><span></span>基本概况</div>
    <div class="box">
      <!-- {{statistics}} -->
      <div class="card">
        <div class="item">
          <img src="@/assets/img/person.png">
          <div class="right">
            <div>用户</div>
            <div>{{statistics.person}}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/img/person.png">
          <div class="right">
            <div>会员</div>
            <div>{{statistics.vip}}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="item">
          <img src="@/assets/img/order.png">
          <div class="right">
            <div>今日订单</div>
            <div>{{statistics.todayOrder}}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/img/order.png">
          <div class="right">
            <div>本月订单</div>
            <div>{{statistics.monthOrder}}</div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="item">
          <img src="@/assets/img/money.png">
          <div class="right">
            <div>今日流水</div>
            <div>¥{{statistics.todayMoney}}</div>
          </div>
        </div>
        <div class="item">
          <img src="@/assets/img/money.png">
          <div class="right">
            <div>本月流水</div>
            <div>¥{{statistics.monthMoney}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="subTitle"><span></span>统计图<el-button type="success" @click="toMore" plain size="small">更多图表</el-button>
    </div>
    <div class="echartsBox">
      <!-- 扇形图 -->
      <div class="pieEcharts" ref="pieRef"></div>
      <!-- 柱形图 -->
      <div class="barEcharts" ref="barRef"></div>
      <!-- 折线图 -->
      <div class="lineEcharts" ref="lineRef"></div>
      <!-- 仪表盘 -->
      <div class="gaugeEcharts" ref="gaugeRef"></div>
    </div>
  </div>
</template>
<script lang="ts">
  import * as echarts from "echarts"
  import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from "vue"
  import { ElMessage } from "element-plus"
  export default defineComponent({
    setup() {
      const that = getCurrentInstance().appContext.config.globalProperties
      const pieRef = ref < HTMLElement > ()
      const barRef = ref < HTMLElement > ()
      const lineRef = ref < HTMLElement > ()
      const gaugeRef = ref < HTMLElement > ()
      let statistics = reactive({
        person: 0,
        vip: 0,
        todayOrder: 0,
        todayMoney: 0,
        monthOrder: 0,
        monthMoney: 0
      })
      const toMore = () => {
        window.open("https://echarts.apache.org/examples/zh/index.html")
      }
      onMounted(() => {
        var pieEcharts = echarts.init(pieRef.value as HTMLElement);
        pieEcharts.setOption({
          title: {
            text: "扇形图",
            left: "center",
            top: 0,
            textStyle: {
              color: "#2c343c"
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '90%',
            left: 'center'
          },
          series: [{
            name: '月账单统计',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [{
              value: 900,
              name: '服装'
            }, {
              value: 700,
              name: '出行'
            }, {
              value: 500,
              name: '住宿'
            }, {
              value: 300,
              name: '饮食'
            }]
          }]
        })
        var barEcharts = echarts.init(barRef.value as HTMLElement);
        barEcharts.setOption({
          title: {
            text: "柱形图",
            left: "center",
            top: 0,
            textStyle: {
              color: "#2c343c"
            }
          },
          xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        })
        var lineEcharts = echarts.init(lineRef.value as HTMLElement);
        lineEcharts.setOption({
          title: {
            text: "折线图",
            left: "center",
            top: 0,
            textStyle: {
              color: "#2c343c"
            }
          },
          xAxis: {
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line',
            smooth: true
          }]
        })
        var gaugeEcharts = echarts.init(gaugeRef.value as HTMLElement);
        gaugeEcharts.setOption({
          title: {
            text: "仪表盘",
            left: "center",
            top: 0,
            textStyle: {
              color: "#2c343c"
            }
          },
          series: [{
            type: 'gauge',
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, '#67e0e3'],
                  [0.7, '#37a2da'],
                  [1, '#fd666d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'inherit'
              }
            },
            axisTick: {
              distance: -30,
              length: 8,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 20,
              fontSize: 14
            },
            detail: {
              valueAnimation: true,
              formatter: '{value} 分',
              color: 'inherit'
            },
            data: [{
              value: 80
            }]
          }]
        })
        // 获取首页数据
        that.$get('sys/statistics').then((res) => {
          if (res.code == 200) {
            const{person,vip,todayOrder,todayMoney,monthOrder,monthMoney}=res.data
            statistics.person=8
            statistics.vip=vip
            statistics.todayOrder=todayOrder
            statistics.todayMoney=todayMoney
            statistics.monthOrder=monthOrder
            statistics.monthMoney=monthMoney
          } else {
            ElMessage.error(res.msg)
          }
        })
      })
      return {
        statistics,
        pieRef,
        barRef,
        lineRef,
        gaugeRef,
        toMore
      }
    }
  })
</script>
<style lang="scss" scoped>
  .container {
    background-color: #fff;
    min-width: 660px;
    .subTitle {
      display: flex;
      align-items: center;
      height: 60px;
      font-weight: bold;
      font-size: 16px;
      padding: 0 20px;
      span {
        background-color: #409EFF;
        width: 4px;
        height: 18px;
        border-radius: 4px;
        display: inline-block;
        margin: 0 10px 0 0;
      }
      .el-button {
        margin: 0 0 0 10px;
      }
    }
    .box {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding: 0 20px;
      .card {
        background: #FFFFFF;
        box-shadow: 0px 3px 17px 0px rgba(235, 240, 247, 0.9);
        border-radius: 14px;
        margin: 0 10px 10px 0;
        min-width: 160px;
        padding: 0 20px;
        box-sizing: border-box;
        height: 180px;
        width: 100%;
        .item {
          display: flex;
          align-items: center;
          height: 90px;
          img {
            height: 44px;
          }
          .right {
            margin: 0 0 0 10px;
            height: 42px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            div:nth-child {
              font-size: 14px;
              color: #666;
            }
            div:last-child {
              font-weight: bold;
              font-size: 18px;
            }
          }
        }
      }
    }
    .echartsBox {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow-x: hidden;
      div {
        text-align: center;
        width: 50%;
        height: 360px;
        min-width: 320px;
        padding: 10px;
        box-sizing: border-box;
      }
    }
  }
</style>
