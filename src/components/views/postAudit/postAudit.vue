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
          :total="1000">
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
          :total="1000">
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
          :total="1000">
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
        postToAudit: [
          {
	            "id": "1",   //通过positionId获取详情
	            "posName":"工程师",
	            "cltName":"百度",
	            "requesterName":"Offer分析",  //职位详情
	        }
        ],
        passData: [
          {
	            "id": "1",   //通过positionId获取详情
	            "posName":"工程师",
	            "cltName":"百度",
	            "requesterName":"Offer分析",  //职位详情
	        }
        ],
        noPassData: [
          {
	            "id": "1",   //通过positionId获取详情
	            "posName":"工程师",
	            "cltName":"百度",
	            "requesterName":"Offer分析",  //职位详情
	        }
        ]
      };
    },
    created () {
      this.requestList(this.checkSts)
    },
    methods: {
      




      requestList(checkSts){
        // function success(text) {
        //     var textarea = document.getElementById('test-response-text');
        // }

        // function fail(code) {
        //     var textarea = document.getElementById('test-response-text');
        // }
        // //请求列表
        // var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象

        // request.onreadystatechange = function () { // 状态发生变化时，函数被回调
        //     if (request.readyState === 4) { // 成功完成
        //         // 判断响应结果:
        //         if (request.status === 200) {
        //             console.log(request.responseText)
        //             // 成功，通过responseText拿到响应的文本:
        //             return success(request.responseText);
        //         } else {
        //           console.log(request.status)
        //             // 失败，根据响应码判断失败原因:
        //             return fail(request.status);
        //         }
        //     } else {
        //         // HTTP请求还在继续...
        //     }
        // }


        // // 发送请求:
        // request.open('GET', '/api/position/list/getCheckList.htm?checkSts=1&curPage=1&cntPerPage=10');
        // request.setRequestHeader("Content-type","application/json;charset=utf-8");
        // request.send();

        



        this.$http.get(totalPort.getCheckList()+'?checkSts='+checkSts+'&curPage='+this.currentPage+'&cntPerPage='+this.cntPerPage).then((data) => {
          if (data.code==0) {
            this.total=data.data.page.totalPage*data.data.page.cntPerPage;
            this.postToAudit=data.data.dataList;
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
</style>
