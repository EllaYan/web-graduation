<template>
  <div id="app">
      <el-container>
          <side-bar></side-bar>
            <el-main>
                <router-view></router-view>
            </el-main>
      </el-container>
      
      
  </div>
</template>

<script>
import sideBar from './components/sideBar.vue'
export default {
    components: {
        sideBar,
    },
    name: 'app',
}
</script>

<style>
body{
    margin:0;
}
.el-main{
    background-color: #f5f5f5;;
}
.pagination{
    display: flex;
    justify-content: flex-end;
}
.card-box{
    width:97%;
    margin: 15px 0 0 20px;
    position: relative;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@font-face {
  font-family: 'iconfont';  /* project id 1094673 */
  src: url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.eot');
  src: url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.woff') format('woff'),
  url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1094673_h4k6pj9p4he.svg#iconfont') format('svg');
}

.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
</style>
