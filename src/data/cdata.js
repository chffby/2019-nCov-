// import { area } from "../api/getData";
// // import area from "../api/getData";


// const aadata=async function(){
//     const url = `https://lab.ahusmart.com/nCoV/api/area?latest=1`;
//     debugger;
//     const results =await area(url);
//     debugger;
//     const data = results.map(r => {
//         return {
//             name: r.provinceName,
//             value: r.confirmedCount
//         };
//     });
//     console.log(data);
//     return data;
// };
// const adata=aadata();
// //得到全省名称和确诊信息
// export const option1 = {
//     visualMap: {
//         //dimension:0,//取得数据维度
//         pieces: [
//             { gt: 9999, label: ">10000", color: "red" },
//             { gt: 1000, lte: 9999, color: "orangered" },
//             { gt: 99, lte: 1000, color: "orange" },
//             { gt: 10, lte: 99, color: "purple" },
//             { gt: 0, lte: 9, color: "pink" },
//             { value: 0, color: "#fff", label: "0" }
//         ]
//     },
//     tooltip: {
//         trigger: 'item',//以具体项目触发弹窗
//         // 显示策略，可选为：true（显示） | false（隐藏）
//         show: true,
//         // // tooltip主体内容显示策略，只需tooltip触发事件或显示axisPointer而不需要显示内容时可配置该项为false
//         // showContent: true,
//         // 触发类型，默认数据触发，见下图，可选为：'item' | 'axis'
//         formatter: function (adata) {
//             console.log("可以到");
//             console.log(adata);
//             return `
//             当前确诊：${adata.confirmedCount}<br>
//             当前疑似：${adata.confirmedCount}<br>
//             治愈：${adata.confirmedCount}<br>
//             死亡:${adata.confirmedCount}<br>
//             `;
//         }
//     },
//     geo: {
//         map: "world",
//         roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
//         aspectScale: 0.75,
//         zoom: 1.2, //默认的大小m
//         label: {
//             normal: {
//                 show: true,
//                 textStyle: {
//                     color: "rgba(0,0,70,1)"
//                 }
//             }
//         }
//     },
//     series: [
//         {
//             name: "2019-nCov中国疫情地图",
//             type: "map",
//             data:adata,
//         }
//     ]
// }