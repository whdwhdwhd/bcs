<template>
  <div class="consult">
    <el-tabs :tab-position="tabPosition"  type="card" @tab-click="tabClick">
      <el-tab-pane label="待审核">
          <el-table
          @row-click="rowClick"
          :data="postToAudit"
          height="780"
          border
          style="width: 100%"
          v-if="postToAudit">
            <el-table-column
            align="center"
            prop="posName"
            label="职位名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="cltName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="requesterName"
            label="职位详情">
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
      <el-tab-pane label="通过">
        <el-table
          @row-click="rowClick"
          :data="passData"
          height="780"
          border
          style="width: 100%"
          v-if="passData">
            <el-table-column
            align="center"
            prop="posName"
            label="职位名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="cltName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="requesterName"
            label="职位详情">
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
      <el-tab-pane label="不通过">
        <el-table
          @row-click="rowClick"
          :data="noPassData"
          height="780"
          border
          style="width: 100%"
          v-if="noPassData">
            <el-table-column
            align="center"
            prop="posName"
            label="职位名">
            </el-table-column>
            <el-table-column
            align="center"
            prop="cltName"
            label="公司">
            </el-table-column>
            <el-table-column
            align="center"
            prop="requesterName"
            label="职位详情">
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
<script type="text/ecmascript-6">
import axios from 'axios';
  export default {
    data () {
      return {
        tabPosition: "top",
        checkSts: 1,
        currentPage: 1,
        cntPerPage: 10,
        total: 100,
        postToAudit: [],
        passData: [],
        noPassData: []
      };
    },
    created () {
      this.requestList(this.checkSts)
    },
    methods: {
      requestList(checkSts){
        this.$http({
          url: totalPort.getCheckList(),
           method: 'post', 
           data: this.$qs.stringify({
             checkSts:checkSts,
             curPage:this.currentPage,
             cntPerPage:this.cntPerPage,
             infoFlag:147459
           })})
        .then((data) => {
          console.log(data)
          if (data.data.code==0) {
            this.total=data.data.data.page.totalPage*data.data.data.page.cntPerPage;
            if (checkSts===1) {
              this.postToAudit=data.data.data.dataList;
            } else if(checkSts===2) {
              this.passData=data.data.data.dataList;
            } else if(checkSts===3) {
              this.noPassData=data.data.data.dataList;
            }
          }else{
            console.log("报错")
          }
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
        console.log(row)
        this.$router.push({path:'/pages/postAuditDetails',query:{id:row.id}})
      },
      tabClick(e){
        this.checkSts=parseInt(e.index)+1;
        this.requestList(this.checkSts)
      }
    }
  };
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .consultPages{
    margin-top: 0;
  }
  .el-tab-pane{
    margin-bottom: 60px;
  }
</style>
