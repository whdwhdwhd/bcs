<template>
  <div class="toAuditDetails">
    <v-goBack></v-goBack>
    <div class="toAuditDetailsMain">
        <el-row type="flex" class="row-bg zCenter" justify="space-between">
            <el-col>
                姓名：<span></span>
            </el-col>
            <el-col>
                <span class="fl">简历附件：</span>
                <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeAvatarUpload"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary" v-if="uploadShow">点击上传</el-button>
                <div slot="tip" class="el-upload__tip" v-if="uploadShow">文件大小不超过10M</div>
                </el-upload>
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
            <el-form :model="data" :label-position="labelPosition" label-width="120px">
                <h3 class="formTitle">基本信息</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性别：">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生年月：">
                            <el-date-picker
                            v-model="ruleForm.date"
                            type="month"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生地：">
                            <el-select v-model="value2" filterable placeholder="请选择出生地">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性取向：">
                            <el-radio-group v-model="ruleForm.resource">
                            <el-radio label="正常"></el-radio>
                            <el-radio label="不正常"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外形：">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="气质：">
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="体重：">
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高：">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特征：">
                            
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="语速：">
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="思维：">
                           
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风格：">
                            
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="24">
                        <el-form-item label="语言：">
                            <ul class="language">
                                <li>英语   一般<i class="el-icon-close"></i></li>
                                <li>英语   一般<i class="el-icon-close"></i></li>
                            </ul>
                            <div class="fl">
                                <el-select v-model="value" placeholder="语言类型">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-select v-model="value" placeholder="熟练程度">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <el-button type="primary">添加语言</el-button>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item
                            prop="phone"
                            label="手机"
                            :rules="[{ pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur,change' }]">
                            <el-input v-model="data.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item
                            prop="email"
                            label="邮箱"
                            :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
                            <el-input v-model="data.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="formTitle">家庭情况</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="婚姻：">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">已婚</el-radio>
                                <el-radio label="2">未婚</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房产：">
                           <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="2">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt" v-if="1">
                    <el-col :span="8">
                        <el-form-item label="对象城市：">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对象出生地：">
                            <el-select v-model="value2" filterable placeholder="请选择对象出生地">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="对象工作公司：">
                            <el-select v-model="value2" filterable placeholder="请选择对象工作公司">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt" v-if="1">
                    <el-col :span="8">
                        <el-form-item label="对象工作职位：">
                            <el-select v-model="value2" placeholder="请选择对象工作职位">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="孩子：">
                           <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="1">有</el-radio>
                                <el-radio label="2">无</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-if="">
                        <el-form-item label="孩子年龄：">
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
                            <el-form-item label="学历：">
                                <el-select v-model="value2" placeholder="请选择学历">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="毕业学校：">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入毕业学校" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="专业：">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入专业" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="16">
                            <el-form-item label="就读时间：">
                                <el-date-picker v-model="value6" type="month" placeholder="开始日期"></el-date-picker><span>至</span>
                                <el-date-picker v-model="value6" type="month" placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否统招：">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                            </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="获奖情况：">
                                <el-select v-model="value2" placeholder="请选择获奖情况">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
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
                            <el-form-item label="公司名：">
                                <el-select v-model="value9" filterable remote reserve-keyword placeholder="请输入公司名" :remote-method="remoteMethod">
                                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="入职时间：">
                                <el-date-picker v-model="ruleForm.date" type="month" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="离职时间：">
                                <el-date-picker v-model="ruleForm.date" type="month" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="职位方向：">
                                <el-select v-model="value2" placeholder="请选择职位方向">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="职位：">
                                <el-select v-model="value2" placeholder="请选择职位">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工作城市：">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="薪水：">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="24">
                            <el-form-item label="工作内容：">
                                <el-input type="textarea" autosize placeholder="请输入工作内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="搭建团队经验：">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio label="有"></el-radio>
                                    <el-radio label="无"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="团队规模：">
                                <el-input class="aut"></el-input><span>人</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证书：">
                                <el-select v-model="value2" placeholder="请选择证书">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="工具：">
                                <el-select v-model="value2" placeholder="请选择工具">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="参与产品：">
                                <el-select v-model="value2" filterable placeholder="请选择参与产品">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="参与周期：">
                                <el-select v-model="value2" placeholder="请选择参与周期">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="重要性：">
                                <el-select v-model="value2" placeholder="请选择重要性">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <h3 class="formTitle">期望</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="薪水：">
                            <el-select v-model="value2" filterable placeholder="请选择薪水">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位：">
                            <el-select v-model="value11" multiple placeholder="请选择职位">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作城市：">
                            <el-select v-model="value11" multiple placeholder="工作城市">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="离家距离：">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作强度：">
                            <el-select v-model="value2" placeholder="请选择工作强度">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司类型：">
                            <el-select v-model="value2" filterable placeholder="请选择公司类型">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="公司行业：">
                            <el-select v-model="value2" filterable placeholder="请选择公司行业">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司规模：">
                            <el-select v-model="value2" filterable placeholder="请选择公司规模">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="当前状态：">
                            <el-select v-model="value2" placeholder="请选择当前状态">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-button class="modification" type="primary" >修改</el-button>
    </div>
    
  </div>
</template>
<script>
  import goBack from '@/components/goBack';
  export default {
    data() {
      return {
        data:{
            email:"",
            phone:""
        },
        //简历附件
        uploadShow:true,
        fileList:[],
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
        value3:"",
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
        value11:[],
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
        this.uploadFile()
        
    },
    watch:{
        
    },
    methods: {
      //简历上传
      uploadFile(){
        
      },
      //上传成功
      handleSuccess(response, file, fileList){
        this.fileList.push({"name":file.name,"url":file.url})
      },
      //文件列表移除文件时的钩子
      handleRemove(file, fileList) {
        this.fileList=[]
        // console.log(file, fileList);
      },
      //点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
      handlePreview(file) {
        // console.log(file);
      },
      //文件上传失败时的钩子
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件`);
      },
      //删除文件之前
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //上传文件之前
      beforeAvatarUpload (file) {
        // console.log(file)
        // const extension = file.name.split('.')[1] === 'xls'
        // const extension2 = file.name.split('.')[1] === 'xlsx'
        // const extension3 = file.name.split('.')[1] === 'doc'
        // const extension4 = file.name.split('.')[1] === 'docx'
        const isLt2M = file.size / 1024 / 1024 < 10
        // if (!extension && !extension2 && !extension3 && !extension4) {
        //     console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
        // }
        if (!isLt2M) {
            console.log('上传文件大小不能超过 10MB!')
        }
        return isLt2M
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
      margin-bottom: 20px;
  }
  .mt{
      margin-top: 0px;
  }
  .fl{
      float: left;
  }
  .el-upload__tip{
      display: inline-block;
      margin-left: 10px;
  }
  .fr{
    float:right;
  }
  .language{
      text-align: left;
  }
  .language li{
      display: inline-block;
      margin-right: 50px;
  }
  .modification{
      margin-bottom: 60px;
  }
  .el-icon-close{
      cursor: pointer;
  }
  .aut{
      width:auto;
  }
</style>
