<template>
  <div class="page">
    <div class="header">
      <div class="title">2019-nCov全球疫情数据可视化系统</div>
      <div class="title-bottom">
        <div class="bottom-sidebar"></div>
      </div>
      <nav class="nav-links can-hide">
        <div class="nav-item">
          <a class="datastyle txt">当前时间：{{ time }}</a>
        </div>
      </nav>
    </div>
    <div class="row clearfix">
      <!-- clearfix是为了修复当内容过多时div错位 -->
      <div class="col-md-8 column">
        <div class="row clearfix">
          <div class="col-md-10 column">
            <div class="echarts">
              <!-- <p class="title1">中国疫情地图</p> -->
              <div class="echarts-map" ref="myMap"></div>
            </div>
          </div>
          <div class="col-md-2 column">
            <div class="echarts">
              <div class="echarts-right1">
                <div
                  :style="{
                    height: '25%',
                    background: 'rgba(50, 250, 250, 0.07)',
                    'margin-top': '10px'
                  }"
                >
                  <b :style="{ 'font-size': '.25rem', color: 'white' }">累计确诊</b>
                  <div
                    :style="{
                      'font-size': '.25rem',
                      color: 'red',
                      'font-weight': 'bold'
                    }"
                  >{{ ljqzdata }}</div>
                  <div :style="{ 'font-size': '.2rem', color: 'white' }">
                    昨日
                    <span :style="{ color: 'red' }">{{ zljqzdata }}</span>
                  </div>
                </div>
                <div
                  :style="{
                    height: '25%',
                    background: 'rgba(50, 250, 250, 0.07)',
                    'margin-top': '10px'
                  }"
                >
                  <b :style="{ 'font-size': '.25rem', color: 'white' }">现有确诊</b>
                  <div :style="{ 'font-size': '.25rem', color: 'red' }">{{ qzdata }}</div>
                  <div :style="{ 'font-size': '.2rem', color: 'white' }">
                    昨日
                    <span :style="{ color: 'red' }">{{ zqzdata }}</span>
                  </div>
                  <!-- <hr :style="{border:'3',solid:'#ff0033',width:'100%',SIZE:3}"> -->
                </div>
                <div
                  :style="{
                    height: '25%',
                    background: 'rgba(50, 250, 250, 0.07)',
                    'margin-top': '10px'
                  }"
                >
                  <b :style="{ 'font-size': '.25rem', color: 'white' }">累计治愈</b>
                  <div
                    :style="{
                      'font-size': '.25rem',
                      color: 'red',
                      'font-weight': 'bold'
                    }"
                  >{{ zydata }}</div>
                  <div :style="{ 'font-size': '.2rem', color: 'white' }">
                    昨日
                    <span :style="{ color: 'red' }">{{ zzydata }}</span>
                  </div>
                </div>
                <div
                  :style="{
                    height: '25%',
                    background: 'rgba(50, 250, 250, 0.07)',
                    'margin-top': '10px'
                  }"
                >
                  <b :style="{ 'font-size': '.25rem', color: 'white' }">累计死亡</b>
                  <div
                    :style="{
                      'font-size': '.25rem',
                      color: 'red',
                      'font-weight': 'bold'
                    }"
                  >{{ swdata }}</div>
                  <div :style="{ 'font-size': '.2rem', color: 'white' }">
                    昨日
                    <span :style="{ color: 'red' }">{{ zswdata }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 column">
        <div class="echarts">
          <p class="title2">世界确诊人数TOP12</p>
          <div class="echarts-right2" ref="myChart1"></div>
        </div>
      </div>
    </div>

    <div class="row clearfix">
      <div class="col-md-3 column">
        <div class="echarts">
          <p class="title2">当前和新增比例</p>
          <div :style="{ height: '200px' }" class="echarts1" ref="myChart2"></div>
        </div>
      </div>
      <div class="col-md-6 column">
        <div class="echarts">
          <p class="title2">近期新增趋势</p>
          <div :style="{ height: '200px' }" class="echarts1" ref="myChart3"></div>
        </div>
      </div>
      <div class="col-md-3 column">
        <div class="echarts">
          <p class="title2">新闻播报</p>
          <div :style="{ height: '200px' }" class="echarts3" ref="myChart4">
            <swiper :style="{ height: '200px' }" :options="swiperOption">
              <swiper-slide v-for="i in news" :key="i.title">
                <title>{{ i.title }}</title>
                <!-- <p>{{i.summary}}</p> -->
                <p>
                  <a :href="i.sourceUrl">
                    {{ i.summary }}
                    <!-- <p>{{upDate}}</p> -->
                  </a>
                </p>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<script type="module">
import echarts from "echarts";
import "../../node_modules/echarts/map/js/world.js";
import "../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
import "../../node_modules/echarts/dist/echarts.min";
import { area } from "../api/getData";
import { converCountry, countryList, proviceList } from "../api/config/utils";
import "vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css";

export default {
  name: "echarts",
  data() {
    return {
      time: "",
      qzdata: "",
      zqzdata: "",
      ljqzdata: "",
      zljqzdata: "",
      zydata: "",
      zzydata: "",
      swdata: "",
      zswdata: "",
      ysdata: "",
      // upDate:"",
      swiperOption: {
        direction: "vertical",
        observer: true,
        loop: true,
        observeParents: false,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        onslidechangeend: function(swiper) {
          swiper.update();
          mySwiper.startAutoplay();
          mySwiper.reLoop();
        },
        height: window.innerHeight
      },
      news: [{ title: "", summary: "" }]
    };
  },
  watch: {},
  created() {
    this.currentTime(); //在生命周期函数中触发定时器
  },
  mounted() {
    this.mapConfigure();
  },
  provide() {
    return {
      reload: this.refresh
    };
  },
  methods: {
    getTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      _this.time = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
    },
    currentTime() {
      //创建定时器
      setInterval(this.getTime, 500);
    },
    async initData(url) {
      const url2 = url + `/area?latest=1`;
      const res = await area(url2);
      return res;
    },
    async initData2(url) {
      const url2 = url + `/overall`;
      const res = await area(url2);
      return res;
    },
    async initData3() {
      const url = `http://58.87.66.50:5005/`;
      const res = await area(url);
      return res;
    },
    async initData4(url) {
      const url2 = url + "/news";
      const res = await area(url2);
      return res;
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async mapConfigure() {
      let loading = {
        text: "loading",
        color: "#c23531",
        textColor: "#000",
        maskColor: "rgba(255, 255, 255, 0)",
        zlevel: 0
      };
      let myChart1 = echarts.init(this.$refs.myChart1);
      myChart1.showLoading(loading);

      const myChart = echarts.init(this.$refs.myMap);
      myChart.showLoading(loading);

      let myChart2 = echarts.init(this.$refs.myChart2);
      myChart2.showLoading(loading);

      let myChart3 = echarts.init(this.$refs.myChart3);
      myChart3.showLoading(loading);
      let server_url = "https://lab.isaaclin.cn/nCoV/api";
      // let server_url = 'http://58.87.66.50'
      const news = await this.initData4(server_url);
      const logindata3 = await this.initData3();
      await this.sleep(500);
      const logindata = await this.initData(server_url);
      await this.sleep(500);
      const logindata2 = await this.initData2(server_url);
      

      // console.log(logindata3);
      this.news = news;
      this.qzdata = logindata2[0].globalStatistics.currentConfirmedCount;
      this.zqzdata = logindata3.num.othertotal.ecertain_inc;

      this.ljqzdata = logindata2[0].globalStatistics.confirmedCount;
      this.zljqzdata = logindata3.num.othertotal.certain_inc;

      this.zydata = logindata2[0].globalStatistics.curedCount;
      this.zzydata = logindata3.num.othertotal.recure_inc;

      this.swdata = logindata2[0].globalStatistics.deadCount;
      this.zswdata = logindata3.num.othertotal.die_inc;

      //需要添加疑似数据,为了饼图用添加
      let susp = logindata.map(r => {
        return r.suspectedCount;
      });
      this.ysdata = susp.reduce((acc, cur) => {
        return acc + cur;
      }, 0);

      const data = logindata.map(r => {
        // let enname = converCountry(r.provinceName);
        return {
          // name: r.provinceName,
          // value:r.confirmedCount,
          // name:r.country,
          name: r.provinceShortName,
          value: [
            r.currentConfirmedCount,
            r.deadCount,
            r.curedCount,
            r.suspectedCount,
            new Date(r.updateTime).toLocaleDateString().replace(/\//g, "-") +
              " " +
              new Date(r.updateTime).toTimeString().substr(0, 8)
          ]
          // value: [r.confirmedCount,r.deadCount,r.curedCount,r.suspectedCount]
        };
      });
      const agdata = logindata.map(r => {
        // let enname = converCountry(r.provinceName);
        if (r.countryName == "中国") {
          return {
            // name: r.provinceName,
            name: r.provinceShortName,
            value: [
              r.currentConfirmedCount,
              r.deadCount,
              r.curedCount,
              r.suspectedCount,
              new Date(r.updateTime).toLocaleDateString().replace(/\//g, "-") +
                " " +
                new Date(r.updateTime).toTimeString().substr(0, 8)
            ]
          };
        }
      });
      const optionchinamap = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            //不能传入自己写的，得是这个地图全部信息
            // console.log(params);
            let { data } = params;
            return (
              data.name +
              "<br/>" +
              "确诊人数 : " +
              data.value[0] +
              "<br/>" +
              "死亡人数 : " +
              data.value[1] +
              "<br/>" +
              "治愈人数 : " +
              data.value[2] +
              "<br/>" +
              "疑似患者人数 : " +
              data.value[3] +
              "<br/>" +
              "获取时间 : " +
              data.value[4]
            );
          } //数据格式化
        },
        title: {
          text: "中国疫情地图",
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 24
            // fontWeight:"normal",
          }
        },

        visualMap: {
          textStyle: { color: "grey" },
          type: "piecewise",
          dimension: 0,
          pieces: [
            {
              min: 10000,
              max: 10000000,
              label: "大于等于10000人",
              color: "#372a28" //
            },
            {
              min: 1000,
              max: 9999,
              label: "确诊1000-9999人",
              color: "#4e160f"
            },
            {
              min: 100,
              max: 999,
              label: "确诊100-999人",
              color: "#974236"
            },
            { min: 10, max: 99, label: "确诊10-99人", color: "#ee7263" },
            { min: 1, max: 9, label: "确诊1-9人", color: "#f5bba7" },
            { min: 0, max: 0, label: "确诊0人", color: "white" }
          ],
          color: ["#E0022B", "#E09107", "#A3E00B"]
        },
        toolbox: {
          // 工具栏
          show: true,
          orient: "vertical", //两种横向和竖向
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            // name: "确诊数",
            type: "map",
            mapType: "china",
            // nameMap: proviceList, //此处必须有，将英文国家名称转换为中文
            zoom: 1.2, //默认的大小m
            roam: true, //可以缩放
            label: {
              //show: true,// 地图区域文字显示
              // color: "rgb(249, 249, 249)"
            },
            data: agdata
          }
        ]
      };
      const optionmap = {
        tooltip: {
          //提示框内容
          trigger: "item",
          formatter: function(params) {
            //不能传入自己写的，得是这个地图全部信息
            let { data } = params;
            return (
              data.name +
              "<br/>" +
              "确诊人数 : " +
              data.value[0] +
              "<br/>" +
              "死亡人数 : " +
              data.value[1] +
              "<br/>" +
              "治愈人数 : " +
              data.value[2] +
              "<br/>" +
              "疑似患者人数 : " +
              data.value[3] +
              "<br/>" +
              "获取时间 : " +
              data.value[4]
            );
          } //数据格式化
        },
        title: {
          text: "世界疫情地图",
          //可以在这定义标题，也可以自己写一个
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 24
            // fontWeight:"normal",
          }
        },
        visualMap: {
          textStyle: { color: "grey" },
          type: "piecewise",
          dimension: 0,
          //取得数据的第0维
          pieces: [
            {
              min: 10000,
              max: 10000000,
              label: "大于等于10000人",
              color: "#372a28" //
            },
            {
              min: 1000,
              max: 9999,
              label: "确诊1000-9999人",
              color: "#4e160f"
            },
            {
              min: 100,
              max: 999,
              label: "确诊100-999人",
              color: "#974236"
            },
            { min: 10, max: 99, label: "确诊10-99人", color: "#ee7263" },
            { min: 1, max: 9, label: "确诊1-9人", color: "#f5bba7" },
            { min: 0, max: 0, label: "确诊0人", color: "grey" }
          ],

          color: ["#E0022B", "#E09107", "#A3E00B"]
        },
        toolbox: {
          // 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            // name: "确诊数",
            type: "map",
            mapType: "world",
            nameMap: countryList, //此处必须有，将英文国家名称转换为中文
            zoom: 1.1, //默认的大小m
            roam: true, //可以缩放
            label: {
              //show: true,// 地图区域文字显示
              // color: "rgb(249, 249, 249)"
            },
            data: data
          }
        ]
      };

      function sortRule(a, b) {
        return b.value[0] - a.value[0];
      }
      const iname = ["新增确诊", "新增疑似", "新增治愈", "新增死亡"];
      const option2_data = [];
      const newlogindata2 = [
        logindata3.num.othertotal.ecertain_inc,
        logindata3.num.othertotal.uncertain_inc,
        logindata3.num.othertotal.recure_inc,
        logindata3.num.othertotal.die_inc
      ];
      for (let i in iname) {
        option2_data.push({ value: newlogindata2[i], name: iname[i] });
      }

      // console.log(option2_data);
      const iname2 = ["确诊", "疑似", "治愈", "死亡"];
      const newlogindata22 = [
        this.qzdata,
        this.ysdata,
        this.zydata,
        this.swdata
      ];
      const option22_data = [];
      for (let i in iname) {
        option22_data.push({ value: newlogindata22[i], name: iname2[i] });
      }
      let sort_foreign = data.sort(sortRule);
      let option1 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          right: "8%",
          bottom: "3%",
          top: "3%",
          left: "12%"
        },
        xAxis: {
          show: false
        },
        yAxis: {
          type: "category",
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            fontSize: "13",
            color: "white"
          },
          data: sort_foreign
            .slice(0, 12)
            .reverse()
            .map(item => item.name)
        },
        // dataZoom:[{
        //   type: 'slider',//图表下方的伸缩条
        //   show : true, //是否显示
        //   orient:"vertical",
        //   realtime : true, //拖动时，是否实时更新系列的视图
        //   start : 0, //伸缩条开始位置（1-100），可以随时更改
        //   end : 12, //伸缩条结束位置（1-100），可以随时更改
        //   }],
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              color: "white"
            },
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                { offset: 0, color: "#f6070d" },
                { offset: 1, color: "#f6822b" }
              ]),
              barBorderRadius: 5
            },
            data: sort_foreign
              .slice(0, 12)
              .reverse()
              .map(item => item.value[0])
          }
        ]
      };
      let option2 = {
        bottom: "1%",
        tooltip: {
          trigger: "item" //触发类型。
          // formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // grid:{
        //   left: '-80%',
        //   bottom: '300'
        // },
        series: [
          //系列列表。通过 type 决定自己的图表类型
          {
            type: "pie", //饼图
            selectedMode: "single", //选中模式，表示是否支持多个选中，
            radius: [0, "35%"],
            //数组的第一项是内半径，第二项是外半径。

            label: {
              position: "inner" //饼图的文本标签位置居中
            },
            labelLine: {
              //标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
              show: false
            },
            data: option2_data
          },
          {
            // name: "访问来源",
            type: "pie",
            radius: ["50%", "75%"],
            labelLine: {
              //标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线。
              smooth: false
            },
            label: {
              backgroundColor: "rgba(255, 255, 255, 0.3)",

              borderColor: "#aaa",
              // borderWidth: 1,
              borderRadius: 2,
              fontSize: 15,
              fontWeight: 600,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              padding: [4, 4]
            },
            data: option22_data
          }
        ]
      };
      let option3 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: { top: "15%", left: "8%", right: "3%" },
        dataZoom: [
          {
            top: "90%",
            right: "14%",
            left: "11%",
            bottom: "1%",
            textStyle: {
              color: "white"
            },
            handleStyle: { border: 0 },
            type: "slider", //伸缩条
            show: true, //是否显示
            // orient:"vertical",
            realtime: true, //拖动时，是否实时更新系列的视图
            start: 60, //伸缩条开始位置（1-100），可以随时更改
            end: 100 //伸缩条结束位置（1-100），可以随时更改
          }
        ],
        legend: {
          data: ["确诊人数"],
          textStyle: {
            fontSize: "11",
            color: "white"
          }
        },
        xAxis: [
          {
            type: "category",
            data: logindata3.timeserious.reverse().map(item => item.time),
            axisTick: { lineStyle: { color: "white" } },
            axisLabel: {
              color: "white"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: { show: false },
            axisLabel: {
              color: "white"
            }
          }
        ],
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: "none"
            // }, //区域缩放，区域缩放还原
            // dataView: {
            //   readOnly: false
            // }, //数据视图
            magicType: {
              type: ["line", "bar"]
            } //切换为折线图，切换为柱状图
            // restore: {}, //还原
            // saveAsImage: {} //保存为图片
          }
        },
        series: [
          {
            name: "确诊人数",
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#f6070d" },
                { offset: 1, color: "#f6822b" }
              ]),
              barBorderRadius: 3
            },
            data: logindata3.timeserious.map(item => item.value)
          }
        ]
      };

      myChart.setOption(optionmap);
      myChart.hideLoading();
      window.addEventListener("resize", function() {
        myChart.resize();
      });

      myChart1.setOption(option1);
      myChart1.hideLoading();
      window.addEventListener("resize", function() {
        myChart1.resize();
      });

      myChart2.setOption(option2);
      myChart2.hideLoading();
      window.addEventListener("resize", function() {
        myChart2.resize();
      });

      myChart3.setOption(option3);
      myChart3.hideLoading();
      window.addEventListener("resize", function() {
        myChart3.resize();
      });
      let that = this;
      myChart.on("click", function(params) {
        if (params.name == "中国") {
          // myChart.showLoading(loading);
          myChart.setOption(optionchinamap);
          myChart.setOption(optionchinamap);
          // myChart.hideLoading();
          // this.refresh();
          that.qzdata = logindata2[0].currentConfirmedCount;
          that.zqzdata = logindata3.num.add_daily.addcon_new;

          that.ljqzdata = logindata2[0].confirmedCount;
          that.zljqzdata = logindata3.num.add_daily.addecon_new;

          that.zydata = logindata2[0].curedCount;
          that.zzydata = logindata3.num.add_daily.addcure_new;

          that.swdata = logindata2[0].deadCount;
          that.zswdata =logindata3.num.add_daily.adddeath_new;
        }
      });

      myChart.getZr().on("click", function() {
        myChart.setOption(optionmap);
        that.qzdata = logindata2[0].globalStatistics.currentConfirmedCount;
        that.zqzdata = logindata3.num.othertotal.ecertain_inc;

        that.ljqzdata = logindata2[0].globalStatistics.confirmedCount;
        that.zljqzdata = logindata3.num.othertotal.certain_inc;

        that.zydata = logindata2[0].globalStatistics.curedCount;
        that.zzydata = logindata3.num.othertotal.recure_inc;

        that.swdata = logindata2[0].globalStatistics.deadCount;
        that.zswdata = logindata3.num.othertotal.die_inc;

        // that.qzdata = logindata2[0].globalStatistics.currentConfirmedCount;
        // that.zqzdata = logindata2[0].globalStatistics.currentConfirmedIncr;

        // that.ljqzdata = logindata2[0].globalStatistics.confirmedCount;
        // that.zljqzdata = logindata2[0].globalStatistics.confirmedIncr;

        // that.zydata = logindata2[0].globalStatistics.curedCount;
        // that.zzydata = logindata2[0].globalStatistics.curedIncr;

        // that.swdata = logindata2[0].globalStatistics.deadCount;
        // that.zswdata = logindata2[0].globalStatistics.deadIncr;
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~@/style/index.less";
// .title1 {
//   // background: white;
//   font-size: 24px;
//   text-align: center;
//   color: #fff;
//   margin: 0;
// }
.title2 {
  font-size: 20px;
  color: #fff;
  margin: 0;
}

.echarts-map {
  height: 8rem;
  // background: pink;
}

.echarts-right1 {
  height: 7.5rem;
  margin: 0.125rem 0 0.125rem;
  // background: pink;
}

.echarts-right2 {
  height: 7.5rem;
  // background: pink;
}

.echarts1 {
  height: 3rem;
  // background: pink;
}

.echarts2 {
  height: 3rem;
  // background: pink;
}

.echarts3 {
  height: 3rem;
  color: white;
  background-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.07);
  box-shadow: 2px 2px 5px #343a40;
  margin: 10px 3px 0 3px;
  border-radius: 4px;
  // background: pink;
  padding: 5px;
  text-align: left;
}

.echarts3 p {
  height: 130px;
  font-size: 0.27rem;
  overflow: hidden;
}

.echarts3 title {
  font-weight: bold;
  font-size: 0.31rem;
  display: inline;
}

.echarts4 {
  height: 2.5rem;
  background: pink;
}
</style>
