<template>
  <div class="toAuditDetails">
    <v-goBack></v-goBack>
    <div class="toAuditDetailsMain">
        <el-row type="flex" class="row-bg zCenter" justify="space-between">
            <el-col>
                姓名：<span></span>
            </el-col>
            <el-col>
                简历附件：<span></span>
            </el-col>
            <el-col>
                审核结果：
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
        <div class="bottomBorder">详细简历</div>
        <div class="resume">
            <!--<el-tabs v-model="activeName">
                <el-tab-pane label="基本信息" name="first">
                    <table class="resumeTable" width="100%"  border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="25%">性别</td>
                            <td width="25%">
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td width="25%">出生年月</td>
                            <td width="25%">
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>出生地</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td>性取向</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">形象</td>
                        </tr>
                        <tr>
                            <td>外形</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td>气质</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>体重</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td>身高</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">性格</td>
                        </tr>
                        <tr>
                            <td>特征</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td>语速</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>思维</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                            <td>风格</td>
                            <td>
                                <el-input placeholder="" size="small" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>语言</td>
                            <td colspan="3">
                                <el-input type="textarea" autosize placeholder="请输入内容"></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">联系方式</td>
                        </tr>
                        <tr>
                            <td>手机号</td>
                            <td></td>
                            <td>邮箱</td>
                            <td></td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="家庭情况" name="second">
                    <table class="resumeTable" width="100%"  border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="25%">婚姻</td>
                            <td colspan="3" width="75%">
                                <el-radio v-model="marriage" label="1">已婚</el-radio>
                                <el-radio v-model="marriage" label="2">未婚</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">对象城市</td>
                            <td width="25%"></td>
                            <td width="25%">对象出生地</td>
                            <td width="25%"></td>
                        </tr>
                        <tr>
                            <td>对象工作公司</td>
                            <td></td>
                            <td>对象工作职位</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td width="25%">孩子</td>
                            <td colspan="3" width="75%">
                                <el-radio v-model="child" label="1">有</el-radio>
                                <el-radio v-model="child" label="2">无</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>孩子年龄</td>
                            <td></td>
                            <td>孩子户口</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td width="25%">房产</td>
                            <td colspan="3" width="75%">
                                <el-radio v-model="houseProperty" label="1">有</el-radio>
                                <el-radio v-model="houseProperty" label="2">无</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td>手机号</td>
                            <td></td>
                            <td>邮箱</td>
                            <td></td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="教育背景" name="third">
                    <table class="resumeTable" width="100%"  border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="25%">学历</td>
                            <td width="25%"></td>
                            <td width="25%">毕业学院</td>
                            <td width="25%"></td>
                        </tr>
                        <tr>
                            <td>专业</td>
                            <td></td>
                            <td>就读时间</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td width="25%">是否统招</td>
                            <td colspan="3" width="75%">
                                <el-radio v-model="child" label="1">是</el-radio>
                                <el-radio v-model="child" label="2">否</el-radio>
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">获奖情况</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="工作" name="fourth">
                    <table class="resumeTable" width="100%"  border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td colspan="4">基本信息</td>
                        <tr>
                            <td width="25%">公司名</td>
                            <td width="25%"></td>
                            <td width="25%">入职时间</td>
                            <td width="25%"></td>
                        </tr>
                        <tr>
                            <td>离职时间</td>
                            <td></td>
                            <td>职位方向</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>职位</td>
                            <td></td>
                            <td>工作内容</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>薪水</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                              工作能力
                            </td>
                        <tr>
                            <td width="25%">搭建团队经验</td>
                            <td colspan="3" width="75%">
                                    
                            </td>
                        <tr>
                            <td width="25%">团队规模</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">证书</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">工具</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4">
                              工作业绩
                            </td>
                        <tr>
                            <tr>
                            <td width="25%">参与产品</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">参与周期</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                        <tr>
                            <td width="25%">重要性</td>
                            <td colspan="3" width="75%">
                                
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="期望" name="fifth">
                    <table class="resumeTable" width="100%"  border="1" cellspacing="0" cellpadding="0">
                        <tr>
                            <td width="25%">薪水</td>
                            <td width="25%"></td>
                            <td width="25%">职位</td>
                            <td width="25%"></td>
                        </tr>
                        <tr>
                            <td>工作城市</td>
                            <td></td>
                            <td>离家距离</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>工作强度</td>
                            <td></td>
                            <td>公司类型</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>公司行业</td>
                            <td></td>
                            <td>公司规模</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>当前状态</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </el-tab-pane>
            </el-tabs>-->
            <el-form :label-position="labelPosition" label-width="120px">
                <h3 class="formTitle">基本信息</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性别">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生年月">
                            <el-date-picker
                            v-model="ruleForm.date"
                            type="date"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生地">
                            <el-input placeholder="请输入内容" v-model="ruleForm.resource" clearable>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性取向">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="正常"></el-radio>
                            <el-radio label="不正常"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外形">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="气质">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="体重">
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特征">
                            
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="语速">
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="思维">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风格">
                            
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="24">
                        <el-form-item label="语言">
                            <el-input type="textarea" autosize placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="手机">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="formTitle">家庭情况</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="婚姻">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">已婚</el-radio>
                                <el-radio label="2">未婚</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房产">
                           <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="2">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt" v-if="1">
                    <el-col :span="8">
                        <el-form-item label="对象城市">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对象出生地">
                           <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对象工作公司">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt" v-if="1">
                    <el-col :span="8">
                        <el-form-item label="对象工作职位">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="孩子">
                           <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="2">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="">
                        <el-form-item label="孩子年龄">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="formTitle">
                    <span>教育背景</span>
                    <el-button class="fr" type="primary" icon="el-icon-plus" round></el-button>
                </h3>
                <!--教育背景-->
                <div class="education">
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="学历">
                                <el-select v-model="value2" placeholder="请选择学历">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毕业学校">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="专业">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="就读时间">
                                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否统招">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="24">
                            <el-form-item label="获奖情况">
                                <el-input type="textarea" autosize placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                
                <h3 class="formTitle">
                    <span>工作</span>
                    <el-button class="fr" type="primary" icon="el-icon-plus" round></el-button>
                </h3>
                <!--工作-->
                <div class="job">
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="公司名">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入职时间">
                                <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="离职时间">
                                <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="职位方向">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="职位">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工作城市">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="薪水">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="24">
                            <el-form-item label="工作内容">
                                <el-input type="textarea" autosize placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="搭建团队经验">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="团队规模">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证书">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="工具">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="参与产品">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="参与周期">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="重要性">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <h3 class="formTitle">期望</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="薪水">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作城市">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="离家距离">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作强度">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司类型">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="公司行业">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司规模">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="当前状态">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-button class="modification" type="primary" @>修改</el-button>
    </div>
    
  </div>
</template>
<script>
  import goBack from '@/components/goBack';
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '不通过'
        }, {
          value: '选项2',
          label: '会员'
        }, {
          value: '选项3',
          label: '精英会员'
        }],
        value:"",
        activeName:"first",
        marriage: '',
        child: '',
        houseProperty: '',
        //学历
        options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: '',
        //毕业学员
        options4:[],
        value9:"",
        //毕业时间
        value6:"",

        labelPosition:"right",
        ruleForm:{
            resource:"",
            date:""
        }
      }
    },
    created: function () {
        // `this` 指向 vm 实例
        
    },
    methods: {
      rowClick(row){

      },
      remoteMethod(){
          //毕业学员和专业 
      },
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
<style scoped>
  .zCenter{
      line-height: 40px;
  }
  .bottomBorder{
      height: 40px;
      line-height: 40px;
      text-align: left;
      border-bottom: 1px solid #ccc;
  }
  .resume{
      padding: 10px;
  }
  .formTitle{
      text-align: left;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
  }
  .mt{
      margin-top: 10px;
  }
  .fr{
    float:right;
  }
  .modification{
      margin-bottom: 60px;
  }
</style>
