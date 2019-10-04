<template>
  <div>
    <el-row>
      <el-col :span="12" :offset="6">
        <h1 style="font-family: 'microsoft yahei';color: #409EFF;font-weight: 900;">数据概览</h1>
        <h5 style="font-family: 'microsoft yahei';color: #409EFF;font-weight: 900;margin-top: -15px;">Data Overview</h5>
        <hr />
      </el-col>
    </el-row>
    <el-row class="chart-row">
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <IEcharts :option="lineChart" style="width: 100%;height: 450px;" />
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <IEcharts :option="barChart" style="width: 100%;height: 450px;" />
        </el-card>
      </el-col>
    </el-row>
    <el-row class="chart-row">
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <IEcharts :option="pieChart" style="width: 100%;height: 450px;" />
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="box-card">
          <IEcharts :option="radarChart" style="width: 100%;height: 450px;" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 导入Echarts
  import IEcharts from 'vue-echarts-v3/src/full.js';
  export default {
    name: "Index",
    components: {
      IEcharts
    },
    data() {
      return {
        radarChart: {
          title: {
            text: 'Customer change',
            subtext: '2019.01-2019.9',
            top: 10,
            left: 10
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,250,0.2)'
          },
          legend: {
            type: 'scroll',
            bottom: 10,
            data: (function() {
              var list = [];
              for (var i = 1; i <= 28; i++) {
                list.push(i + 2000 + '');
              }
              return list;
            })()
          },
          visualMap: {
            top: 'middle',
            right: 10,
            color: ['red', 'yellow'],
            calculable: true
          },
          radar: {
            indicator: [{
                text: 'IE8-',
                max: 400
              },
              {
                text: 'IE9+',
                max: 400
              },
              {
                text: 'Safari',
                max: 400
              },
              {
                text: 'Firefox',
                max: 400
              },
              {
                text: 'Chrome',
                max: 400
              }
            ]
          },
          series: (function() {
            var series = [];
            for (var i = 1; i <= 28; i++) {
              series.push({
                name: '浏览器（数据纯属虚构）',
                type: 'radar',
                symbol: 'none',
                lineStyle: {
                  width: 1
                },
                emphasis: {
                  areaStyle: {
                    color: 'rgba(0,250,0,0.3)'
                  }
                },
                data: [{
                  value: [
                    (40 - i) * 10,
                    (38 - i) * 4 + 60,
                    i * 5 + 10,
                    i * 9,
                    i * i / 2
                  ],
                  name: i + 2000 + ''
                }]
              });
            }
            return series;
          })()
        },
        pieChart: {
          backgroundColor: '#2c343c',

          title: {
            text: 'Customer Proportion',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [{
                value: 335,
                name: '直接访问'
              },
              {
                value: 310,
                name: '邮件营销'
              },
              {
                value: 274,
                name: '联盟广告'
              },
              {
                value: 235,
                name: '视频广告'
              },
              {
                value: 400,
                name: '搜索引擎'
              }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }]
        },
        barChart: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            feature: {
              dataView: {
                show: true,
                readOnly: false
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          legend: {
            data: ['EC', 'AOP', 'OT']
          },
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }],
          yAxis: [{
              type: 'value',
              name: 'AOP',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml'
              }
            },
            {
              type: 'value',
              name: 'OT',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [{
              name: 'EC',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: 'AOP',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: 'OT',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        },
        lineChart: {
          legend: {},
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          dataset: {
            source: [
              ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
              ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
              ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
              ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
              ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
            ]
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            gridIndex: 0
          },
          grid: {
            top: '55%'
          },
          series: [{
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'line',
              smooth: true,
              seriesLayoutBy: 'row'
            },
            {
              type: 'pie',
              id: 'pie',
              radius: '30%',
              center: ['50%', '25%'],
              label: {
                formatter: '{b}: {@2012} ({d}%)'
              },
              encode: {
                itemName: 'product',
                value: '2012',
                tooltip: '2012'
              }
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .chart-row {
    margin-top: 50px;
  }
</style>
