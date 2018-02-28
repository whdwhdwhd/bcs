<template>
  <div class="goBack">
      <div class="goBackCh" @click.stop="goBack"><i class="el-icon-back"></i>回退</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      goBack(){
        window.history.back(-1);
      }
    },
    components: {
    }
  };
</script>
<style>
  .goBack{
      height: 30px;
      line-height: 30px;
  }
  .goBackCh{
      float: left;
      cursor: pointer;
  }
</style>
