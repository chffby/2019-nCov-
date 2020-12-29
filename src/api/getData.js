/**
 * 获取数据
 */
import Vue from 'vue';
// export const area = urla => {
    export const area=async function(urla){
    const adata=await Vue.axios({
        methods: "get",
        // 接口地址  api-代理+接口端口号之后的其余地址
        url: urla,
        // dataType: "json"
        //`https://lab.ahusmart.com/nCoV/api/news?province=%E6%B9%96%E5%8C%97%E7%9C%81`新闻
        //      url: `https://lab.ahusmart.com/nCoV/api/area?latest=1&province=%E6%B9%96%E5%8C%97%E7%9C%81`
    }).then(res => {
        // let data = res.data;
        let results = res.data.results;
        // let results = res;

        // 得到全国的信息
        // console.log("先到接口，打印数据如下：");
        // console.log(results);

        return results;
    });
    return adata;
}






export const news = urla => {

}
