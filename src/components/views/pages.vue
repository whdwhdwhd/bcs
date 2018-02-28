<template>
  <div id="pages">
    <v-header :user="1"></v-header>
    <el-container style="height:100%" direction="horizontal">
        <el-aside width="180px">
            <el-menu class="mar-l el-menu-vertical-demo el-col el-col-3 sidebar" router>
            <template class="sidebarUl" v-for="(item,index) in $router.options.routes[2].children" v-if="item.jurisdiction==jurisdiction">
                <el-menu-item :index="item.path" ><i class="fa"></i>{{item.name}}</el-menu-item>
            </template>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
  </div>
</template>

<script>
import header from '@/components/header';
export default {
    data (){
        return {
            jurisdiction:1
        }
    },
    components: {
    'v-header': header
    }
}
</script>

<style scoped>
#pages {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
  overflow: hidden;
}
.sidebar{
    width: 180px;
    height:100%;
}
.sidebar .ul{
    background: #20a0ff;
}
.sidebar .li{
    
}
.context{

}
</style>
