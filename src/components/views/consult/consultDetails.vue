<template>
  <div class="consultDetails">
      <v-goBack></v-goBack>
      <el-table
        :data="consultData"
        height="110"
        border
        style="width: 100%">
        <el-table-column
        align="center"
        prop="name"
        label="姓名">
        </el-table-column>
        <el-table-column
        align="center"
        prop="position"
        label="职位">
        </el-table-column>
        <el-table-column
        align="center"
        prop="company"
        label="公司">
        </el-table-column>
        <el-table-column
        align="center"
        prop="problemTypes"
        label="问题类型">
        </el-table-column>
        <el-table-column
        align="center"
        prop="problem"
        label="问题">
        </el-table-column>
    </el-table>
    <div class="consultDetails-btn">
        <el-radio v-model="answer" label="1">文字回答</el-radio>
        <el-radio v-model="answer" label="2">电话回答</el-radio>
    </div>
    <el-input v-if="answer==1" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入问题答案" v-model="textarea"></el-input>
     <div class="searchProblem">
      <el-input class="searchInp" placeholder="请输入搜索问题关键字"></el-input><el-button class="sub-btn" type="primary">搜索</el-button>
      <el-table :data="issueData" height="110" border style="width: 100%;margin-top:10px;">
          <el-table-column align="center" prop="issue" label="问题"></el-table-column>
          <el-table-column align="center" prop="answer" label="答案"></el-table-column>
      </el-table>
    </div>
    <el-button class="sub-btn" type="primary" @click="onSub">提交</el-button>
  </div>
</template>
<script>
import goBack from '@/components/goBack';
  export default {
    data() {
      return {
        consultData:[
            {
	            "clerkId": "26",   //通过clerkId获取详情
	            "name": "张三",
	            "position":"工程师",
	            "company":"百度",
	            "problemTypes":"Offer分析",  //问题类型
	            "problem":"阿里给我P9，不知道是不是合适？",   //问题     
	        }
        ],
        answer:"1",
        textarea:"",
        issueData:[]
      }
    },
    methods:{
      onSub() {
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      }
    },
    components: {
        "v-goBack":goBack
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
  .searchProblem{
    margin-top: 10px;
  }
  .searchInp{
    width: 500px;
    margin-right: 15px;
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
  .consultDetails-btn{
      line-height: 60px;
  }
  .sub-btn{
      margin-top: 30px;
  }
</style>
