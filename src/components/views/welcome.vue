<template>
  <div class="hello">
    <h1>欢迎进入博才社后台管理系统</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Home'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  height: 100%;
  position: relative;
}
.hello h1{
  font-size: 26px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%)
}
</style>
