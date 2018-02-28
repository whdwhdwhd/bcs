<template>
  <div class="post">
      职位列表
      <el-table
        @cell-click="cellClick"
        :data="tableData1"
        height="250"
        border
        style="width: 100%">
        <el-table-column
        align="center"
        prop="position"
        label="职位名称">
        </el-table-column>
        <el-table-column
        align="center"
        prop="company"
        label="公司">
        </el-table-column>
        <el-table-column
        align="center"
        prop="state"
        label="状态">
        </el-table-column>
        <el-table-column 
        align="center"
        prop="pending"
        label="待处理会员">
        </el-table-column>
        <el-table-column
        align="center"
        prop="processed"
        label="已处理会员">
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
//   import charts from './echarts.vue';
  export default {
    data() {
      return {
        tableData1: [
            {
	            "positionId": "26",
	            "position":"工程师",
	            "company":"百度",
	            "state":"进行中",
              "pending":"4",
              "processed":"9"	
	          },
            {
	            "positionId": "26",
	            "position":"工程师",
	            "company":"百度",
	            "state":"进行中",
              "pending":"4",
              "processed":"9"	
	          }
        ]
      }
    },
    methods:{
      cellClick(row,column,cell,event){
        if (column.property=="pending") {
          this.$router.push({"path":"/pages/postDetails",query:{dispose:1}})
        }else if(column.property=="processed") {
          this.$router.push({"path":"/pages/postDetails",query:{dispose:2}})
        }
      }
    },
    components: {
    }
  };
</script>
<style>
  .post{

  }
  .chart-container{
    background-color: #F2F2F2;
  }
  .show-section {
    margin: 10px;
    border-radius: 4px;
  }

  /*.show-section.top {
    background-color: white;
    padding: 10px;
    margin-top: 0;
  }*/

  .show-section span {
    font-weight: bold;
    font-size: 18px;
    color: #333333;
  }
  .el-rate{
    display:inline;
  }
</style>
