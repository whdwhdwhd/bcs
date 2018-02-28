<template>
  <div class="consult">
    <el-table
        @row-click="rowClick"
        :data="tableData3"
        height="780"
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
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        tableData3: [
           {
	            "clerkId": "26",   //通过clerkId获取详情
	            "name": "张三",
	            "position":"工程师",
	            "company":"百度",
	            "problemTypes":"Offer分析",  //问题类型
	            "problem":"阿里给我P9，不知道是不是合适？",   //问题     
	        },
          {
	            "clerkId": "26",   //通过clerkId获取详情
	            "name": "张三",
	            "position":"工程师",
	            "company":"百度",
	            "problemTypes":"Offer分析",  //问题类型
	            "problem":"阿里给我P9，不知道是不是合适？",   //问题     
	        },
          {
	            "clerkId": "26",   //通过clerkId获取详情
	            "name": "张三",
	            "position":"工程师",
	            "company":"百度",
	            "problemTypes":"Offer分析",  //问题类型
	            "problem":"阿里给我P9，不知道是不是合适？",   //问题     
	        },
          {
	            "clerkId": "26",   //通过clerkId获取详情
	            "name": "张三",
	            "position":"工程师",
	            "company":"百度",
	            "problemTypes":"Offer分析",  //问题类型
	            "problem":"阿里给我P9，不知道是不是合适？",   //问题     
	        }
        ]
      };
    },
    created () {
    //   this.$http.get('/api/getTable').then((response) => {
    //     response = response.data;
    //     if (response.code === ERR_OK) {
    //       this.tableData = response.datas;
    //     }
    //   });
    //   this.$http.get('/api/getOptions').then((response) => {
    //     response = response.data;
    //     if (response.code === ERR_OK) {
    //       this.options = response.datas;
    //       this.places = response.places;
    //     }
    //   });
    },
    methods: {
      rowClick(row){
        this.$router.push({path:'/pages/consultDetails',query:{id:row.id}})
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
</style>
