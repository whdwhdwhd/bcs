<template>
  <div class="toAudit">
    <el-tabs :tab-position="tabPosition"  type="card">
      <el-tab-pane label="待审核">
          <el-table
          @row-click="rowClick"
          :data="tableData3"
          height="780"
          border
          style="width: 100%">
            <el-table-column
            align="center"
            prop="date"
            label="姓名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="name"
            label="电话">
            </el-table-column>
            <el-table-column
            align="center"
            prop="address"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="address"
            label="职位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="address"
            label="级别">
            </el-table-column>
            <el-table-column
            align="center"
            prop="address"
            label="薪水">
            </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="普通会员">普通会员</el-tab-pane>
      <el-tab-pane label="精英会员">精英会员</el-tab-pane>
      <el-tab-pane label="已拒绝">已拒绝</el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top',
        tableData3: [{
          id:"1",
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"2",
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"3",
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"4",
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"5",
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"6",
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:"7",
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ]
      }
    },
    methods: {
      rowClick(row){
        this.$router.push({path:'/pages/toAuditDetails',query:{id:row.id}})
      }
    },
    components: {
    }
  };
</script>
<style>
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
