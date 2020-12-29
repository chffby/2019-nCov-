<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html ::-webkit-scrollbar {
    width: 0 !important
  }
body{
/* background: rgba(0, 0, 0, 0.8); */
/* margin: 8px; */
background: url("./assets/background.png") 0 0 / 100% 100% no-repeat;
/* 设置背景图片 */
}
body ::-webkit-scrollbar {
    width: 0 !important
  }
#app {
  font-family: "Microsoft YaHei", "微软雅黑",serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 0; */
}
</style>
