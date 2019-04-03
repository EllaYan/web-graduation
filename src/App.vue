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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
