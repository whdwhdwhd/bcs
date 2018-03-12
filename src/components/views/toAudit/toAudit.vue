<template>
  <div class="toAudit">
    <el-tabs :tab-position="tabPosition"  type="card" @tab-click="tabClick">
      <el-tab-pane label="待审核">
          <el-table
          @row-click="rowClick"
          :data="tableData1"
          border
          style="width: 100%">
            <el-table-column
            align="center"
            prop="cddName"
            label="姓名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column
            align="center"
            prop="companyName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="title"
            label="职位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="titleLevel"
            label="级别">
            </el-table-column>
            <el-table-column
            align="center"
            prop="salary"
            label="薪水">
            </el-table-column>
        </el-table>
        <el-pagination class="consultPages"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="cntPerPage"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="普通会员">
        <el-table
          @row-click="rowClick"
          :data="tableData2"
          border
          style="width: 100%">
            <el-table-column
            align="center"
            prop="cddName"
            label="姓名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column
            align="center"
            prop="companyName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="title"
            label="职位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="titleLevel"
            label="级别">
            </el-table-column>
            <el-table-column
            align="center"
            prop="salary"
            label="薪水">
            </el-table-column>
        </el-table>
        <el-pagination class="consultPages"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="cntPerPage"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="精英会员">
        <el-table
          @row-click="rowClick"
          :data="tableData3"
          border
          style="width: 100%">
            <el-table-column
            align="center"
            prop="cddName"
            label="姓名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column
            align="center"
            prop="companyName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="title"
            label="职位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="titleLevel"
            label="级别">
            </el-table-column>
            <el-table-column
            align="center"
            prop="salary"
            label="薪水">
            </el-table-column>
        </el-table>
        <el-pagination class="consultPages"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="cntPerPage"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="已拒绝">
        <el-table
          @row-click="rowClick"
          :data="tableData4"
          border
          style="width: 100%">
            <el-table-column
            align="center"
            prop="cddName"
            label="姓名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="mobile"
            label="电话">
            </el-table-column>
            <el-table-column
            align="center"
            prop="companyName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="title"
            label="职位">
            </el-table-column>
            <el-table-column
            align="center"
            prop="titleLevel"
            label="级别">
            </el-table-column>
            <el-table-column
            align="center"
            prop="salary"
            label="薪水">
            </el-table-column>
        </el-table>
        <el-pagination class="consultPages"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="cntPerPage"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top',
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        //分页
        checkSts: 3,
        currentPage: 1,
        cntPerPage: 10,
        total: 100,
      }
    },
    created () {
      this.getUserList(this.checkSts)
    },
    methods: {
      //获取列表
      getUserList(checkSts){
        var _this=this;
        _this.$http({
          url: totalPort.getUserList(),
           method: 'post', 
           data: _this.$qs.stringify({
             checkSts:checkSts,
             curPage:_this.currentPage,
             cntPerPage:_this.cntPerPage
           })})
        .then((data) => {
            if (data.data.code==0) {
              this.total=data.data.data.page.totalPage*data.data.data.page.cntPerPage;
              if (checkSts===3) {
                this.tableData1=data.data.data.dataList;
              } else if(checkSts===4) {
                this.tableData2=data.data.data.dataList;
              } else if(checkSts===5) {
                this.tableData3=data.data.data.dataList;
              } else if(checkSts===6) {
                this.tableData4=data.data.data.dataList;
              }
            }else{
              console.log("报错")
            }
        }).catch(function(err){
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.cntPerPage=val;
        this.requestList(this.checkSts)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val;
        this.requestList(this.checkSts)
      },
      rowClick(row){
        this.$router.push({path:'/pages/toAuditDetails',query:{id:row.cddId}})
      },
      tabClick(e){
        this.checkSts=parseInt(e.index)+3;
        this.getUserList(this.checkSts)
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
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .consultPages{
    margin-top: 20px;
  }
  .el-tab-pane{
    margin-bottom: 60px;
  }
</style>
