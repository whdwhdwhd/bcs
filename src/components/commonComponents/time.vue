<template>
  <div class="time">
      <el-cascader :options="options" v-model="time" @change="timeChange"></el-cascader>
  </div>
</template>
<script>
  export default {
    props:["name","times"],
    data() {
      return {
        time:this.times,
        options:[]
      }
    },
    created(){
        var time=new Date();
        var newYear=time.getFullYear();
        for (var i = newYear; i >= newYear-60; i--) {
            this.options.push({value:i,label: i+'年',children: [{value:"1",label:"1月"},{value:"2",label:"2月"},{value:"3",label:"3月"},{value:"4",label:"4月"},{value:"5",label:"5月"},{value:"6",label:"6月"},{value:"7",label:"7月"},{value:"8",label:"8月"},{value:"9",label:"9月"},{value:"10",label:"10月"},{value:"11",label:"11月"},{value:"12",label:"12月"}]})
        }
    },
    methods: {
        timeChange(){
            this.$emit("selT",this.name,this.time)
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
