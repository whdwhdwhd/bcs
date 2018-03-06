<template>
  <div class="consult" v-if="posInfo">
    <v-goBack></v-goBack>
    <el-row type="flex" class="row-bg zCenter" justify="space-between">
        <el-col class="lh">
            职位：<span>{{posInfo.posName}}</span>
        </el-col>
        <el-col>
            审核：
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="(item,index) in options"
                :key="item.index"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="onSub">提交</el-button>
        </el-col>
    </el-row>
    <el-input
    class="input-text"
    v-if="value==2"
    type="textarea"
    :autosize="{ minRows: 2, maxRows: 4}"
    placeholder="请输入不通过原因"
    v-model="comment">
    </el-input>
    <el-form label-position="right" label-width="150px">
    <h3 class="formTitle">职位简介</h3>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="公司名:">
                    <a :href="posInfo.cltWebsite">{{posInfo.cltName}}</a>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="部门:">
                    <span>{{posInfo.depart}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="职位级别:">
                    <span>{{posInfo.posLevel}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="职位名:">
                    <span>{{posInfo.posName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="是否保密职位:">
                    <span>{{posInfo.isSecret?"是":"否"}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="行业码:">
                    <span>{{posInfo.industryCode}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="最低年薪（万元）:">
                    <span>{{posInfo.salaryStart}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="最高年薪（万元）:">
                    <span>{{posInfo.salaryEnd}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="职位负责人姓名:">
                    <span>{{posInfo.pmName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="性别要求:">
                    <span>{{posInfo.reqSex?"男":"女"}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="年龄最低要求:">
                    <span>{{posInfo.reqAgeStart}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="年龄最高要求:">
                    <span>{{posInfo.reqAgeEnd}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="学历需求码:">
                    <span>{{posInfo.reqDiploma}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="工作地址:">
                    <span>{{posInfo.workAddress}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="24">
                <el-form-item label="职位简介:">
                    <el-input type="textarea" disabled v-model="posInfo.jd" autosize placeholder="请输入工作内容"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="更新日期:">
                    <span>{{posInfo.updateTime}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="申请日期:">
                    <span>{{posInfo.requestTime}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="审核日期:">
                    <span>{{posInfo.checkTime}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="当前审核状态:">
                    <span>{{posInfo.checkStatus}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="申请者姓名:">
                    <span>{{posInfo.requesterName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="审核者姓名:">
                    <span>{{posInfo.checkerName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="学历:">
                    <span>{{posInfo.reqDiplomaName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="行业名:">
                    <span>{{posInfo.industryName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="职业所在城市:">
                    <span>{{posInfo.workCityName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
    <h3 class="formTitle">审核记录</h3>
        <el-row class="mt">
            <el-col :span="8">
                <el-form-item label="审核人姓名:">
                    <span>{{posInfo.userName}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="审核日期:">
                    <span>{{posInfo.date}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="mt mb">
            <el-col :span="24">
                <el-form-item label="操作内容:">
                    <span>{{posInfo.content}}</span>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <el-button class="modification" type="primary" >修改</el-button>
  </div>
</template>
<script>
import goBack from '@/components/goBack';
  export default {
    data () {
      return {
        options: [
            {
                value: '1',
                label: '请选择'
            },
            {
                value: '2',
                label: '通过'
            },
            {
                value: '3',
                label: '不通过'
            }
        ],
        value:"",
        comment:"",
        posInfo:{}
      };
    },
    created () {
        this.requestList()
    },
    methods: {
      //请求职位详情
      requestList(){
          var _this=this;
          this.$http.get(totalPort.getPosInfo()+'?posId='+this.$route.query.id+'&infoFlag=7').then((data) => {
          if (data.data.code==0) {
            this.posInfo=data.data.data.posInfo;
            this.value=this.posInfo.checkStatus.toString()
          }else{
            console.log("报错")
          }
        }).catch(function(err){
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      onSub() {
        var _this=this;
        if (this.value==="") {
            _this.$message({
                showClose: true,
                message: '请选择审核结果',
                type: 'warning'
            });
            return false;
        }
        this.$confirm('确认提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            if (this.value==="2") {     //审核通过
                this.comment=""
            }else if(this.value==="3") {   //审核不通过
                _this.$message({
                    showClose: true,
                    message: '请填写审核不通过原因',
                    type: 'warning'
                });
                return false;
            };
            _this.$http.get(totalPort.subCheck()+"?posId="+this.posInfo.id+"&checkSts="+this.value+"&comment="+this.comment)
            .then(function(res){
                console.log(res)
                if (res.data.code==0) {
                    _this.$message({
                        showClose: true,
                        type: 'success',
                        message: '提交成功!'
                    });
                }else{
                    console.log("报错")
                }
            })
            .catch(function(err){
                _this.$message.error('提交失败');
            });
          
        }).catch(() => {
          _this.$message({
            showClose: true,
            type: 'info',
            message: '取消提交'
          });          
        });
      }
    },
    components: {
        "v-goBack":goBack
    }
  };
</script>
<style scoped>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .input-text{
      margin-top: 30px;
  }
  .formTitle{
      text-align: left;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
  }
  .mt{
      margin-top: 10px;
  }
  .mb{
      margin-bottom: 10px;
  }
  .lh{
      line-height: 40px;
  }
  .el-form-item{
      margin-bottom: 0px;
  }
  .modification{
      margin-bottom: 60px;
  }
</style>
