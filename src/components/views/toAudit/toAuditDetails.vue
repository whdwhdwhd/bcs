<template>
  <div class="toAuditDetails">
    <v-goBack></v-goBack>
    <div class="toAuditDetailsMain">
        <el-row type="flex" class="row-bg zCenter" justify="space-between">
            <el-col>
                姓名：<span>{{cddInfoData.name}}</span>
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
            <el-form :model="cddInfoData" :label-position="labelPosition" label-width="120px">
                <h3 class="formTitle">基本信息</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性别：">
                            <el-radio-group v-model="cddInfoData.sex">
                                <el-radio label="1">男</el-radio>
                                <el-radio label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出生年月：">
                            <sel-time :name="'birthDay'" :times="cddInfoData.birthDay" v-model="cddInfoData.birthDay" @selT="setTime"></sel-time>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <!--<el-form-item label="出生地：">
                            <el-cascader :options="option3" change-on-select v-model="cddInfoData.birthPlace"></el-cascader>
                        </el-form-item>-->
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="性取向：">
                            <el-radio-group v-model="cddInfoData.sexInterest">
                                <el-radio v-for="item in dataList.sexual" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="外形：">
                           <el-radio-group v-model="cddInfoData.personImage">
                                <el-radio v-for="item in dataList.outlineList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="气质：">
                            <el-radio-group v-model="cddInfoData.personQuality">
                                <el-radio v-for="item in dataList.temperamentList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="体重（斤）：">
                            <el-input v-model="cddInfoData.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="身高（cm）：">
                            <el-input v-model="cddInfoData.height"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特征：">
                            <el-radio-group v-model="cddInfoData.feature">
                                <el-radio v-for="item in dataList.traitList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="语速：">
                            <el-radio-group v-model="cddInfoData.talkSpeed">
                                <el-radio v-for="item in dataList.speed" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="思维：">
                           <el-radio-group v-model="cddInfoData.thinkWay">
                                <el-radio v-for="item in dataList.thought" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="风格：">
                            <el-radio-group v-model="cddInfoData.style">
                                <el-radio v-for="item in dataList.styleList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="24">
                        <el-form-item label="语言：">
                            <ul class="language">
                                <li v-for="lang in languagesList">{{lang.value1}}&sbnp;{{lang.value2}}&sbnp; <el-button size="mini" type="text" @click="dialogShow = false">修改</el-button>&sbnp;<el-button size="mini" type="text" @click="dialogShow = false">删除</el-button></li>
                            </ul>
                            <div class="fl">
                                <el-button type="primary" @click="dialogShow = true">添加语言</el-button>
                            </div>
                            <el-dialog title="语言" :visible.sync="dialogShow" width="40%">
                                <div class="mar-bot-tit">
                                    <span class="fl-lh">语言类型：</span>
                                </div>
                                <div class="mar-bot">
                                    <el-radio-group v-model="languages">
                                        <el-radio class="lh" v-for="item in dataList.languageList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="mar-bot-tit" v-if="dataList.degreeList.length">
                                    <span class="fl-lh">熟练程度：</span>
                                </div>
                                <div class="mar-bot">
                                    <el-radio-group v-model="lang.readWriteCode">
                                        <el-radio class="lh" v-for="item in dataList.degreeList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="mar-bot-tit" v-if="languages">
                                    <span class="fl-lh">语言等级：</span>
                                </div>
                                <div class="mar-bot" v-if="languages">
                                    <el-radio-group v-model="lang.levelCode">
                                        <el-radio class="lh" v-for="item in dataList.levelList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="btn-center">
                                    <el-button size="mini" type="text" @click="dialogShow = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="langusgeSub">保存</el-button>
                                </div>
                            </el-dialog>
                            
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item
                            prop="mobile"
                            label="手机"
                            :rules="[{ pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur,change' }]">
                            <el-input v-model="cddInfoData.mobile"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item
                            prop="Email"
                            label="邮箱"
                            :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]">
                            <el-input v-model="cddInfoData.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="QQ">
                            <el-input v-model="cddInfoData.qq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="微信">
                            <el-input v-model="cddInfoData.weixin"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="formTitle">家庭情况</h3>
                <el-row class="mt">
                    <el-col :span="8">
                        <el-form-item label="婚姻：">
                            <el-radio-group v-model="cddInfoData.marriage">
                                <el-radio v-for="item in dataList.marriage" :key="item.id" :label="item.code">{{item.name}}</el-radio>
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
                            <el-select v-model="value2" filterable placeholder="请选择对象城市">
                                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
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
                            <el-input class="aut"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3 class="formTitle">
                    <span>教育背景</span>
                    <el-button class="fr" type="primary" icon="el-icon-plus" round @click="addEducationExperience"></el-button>
                </h3>
                <!--教育背景-->
                <div class="education">
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="学历：">
                                <el-select v-model="cddInfoData.diplomaCode" placeholder="请选择学历">
                                    <el-option v-for="item in dataList.education" :key="item.id" :label="item.name" :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <!--<el-form-item label="毕业学校：">
                                <el-select v-model="ruleForm.eduExpList.school" filterable remote reserve-keyword placeholder="请输入毕业学校" :remote-method="schoolMethod">
                                    <el-option v-for="item in schoolList" :key="item.id" :label="item.name" :value="item.code"></el-option>
                                </el-select>
                            </el-form-item>-->
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
                                <el-cascader :options="options5" v-model="time"></el-cascader><span>至</span>
                                <el-cascader :options="options5" v-model="time"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="是否统招：">
                            <el-radio-group v-model="cddInfoData.eduTypeCode">
                                <el-radio v-for="item in dataList.eduTypeList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
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
                                <el-cascader :options="options5" v-model="time"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="离职时间：">
                                <el-cascader :options="options5" v-model="time"></el-cascader>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="mt">
                        <el-col :span="8">
                            <el-form-item label="职位：">
                                <el-select v-model="value2" placeholder="请选择职位">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="工作城市：">
                                <el-select v-model="value2" filterable placeholder="请选择工作城市">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
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
                            <el-form-item label="证书：">
                                <el-select v-model="value2" placeholder="请选择证书">
                                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
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
                            <el-form-item label="薪水（万元）：">
                                <el-input class="aut"></el-input>
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
                                    <el-radio label="1">有</el-radio>
                                    <el-radio label="0">无</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-if="ruleForm.resource==='1'">
                            <el-form-item label="团队规模：">
                                <el-input class="aut"></el-input><span>人</span>
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
                        <el-form-item label="薪水（万元）：">
                            <span>不低于</span><el-input class="aut"></el-input>
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
                            <el-radio-group v-model="cddInfoData.hopeWorkDistance">
                                <el-radio v-for="item in dataList.distanceList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工作强度：">
                            <el-radio-group v-model="cddInfoData.hopeWorkStress">
                                <el-radio v-for="item in dataList.strengthList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="公司类型：">
                            <el-select v-model="value2" filterable placeholder="请选择公司类型">
                                <el-option v-for="item in dataList.options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                            <el-radio-group v-model="cddInfoData.jobStatus">
                                <el-radio v-for="item in dataList.jobStatusList" :key="item.id" :label="item.code">{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <el-button class="modification" type="primary" @click="modification">修改</el-button>
    </div>
    
  </div>
</template>
<script>
  import goBack from '@/components/goBack';
  import selTime from '@/components/commonComponents/time';
  import resumeData from '../../../../static/common/resumeData.json';
  export default {
    data() {
      return {
        cddInfoData:{},
        literacyList:[],
        resumeData:resumeData,
        
        gradeList:[],
        //语言
        dialogShow:false,
        languageRoot:[],
        languages:"",
        languagesList:[],
        lang:{
            "id":"",    //标识ID
            "cddId":"",   //人选标识ID
            "languageCode":"",    //语言码值
            "readWriteCode":"",    //读写能力码值
            "listenCode":"",    //听能力码值
            "speakCode":"",    //说能力码值
            "levelCode":""   //考试等级码值
        },
        dataList:{
            sexual:[],
            education:[],
            marriage:[],
            mortgage:[],
            languageList:[],
            degreeList:[],
            listenList:[],
            speakList:[],
            levelList:[],
            speed:[],
            thought:[],
            styleList:[],
            traitList:[],
            outlineList:[],
            temperamentList:[],
            distanceList:[],
            strengthList:[],
            productCycleList:[],
            significanceList:[],
            certificateList:[],
            jobStatusList:[],
            schoolList:[],
            eduTypeList:[],
        },
        //接口列表   改改改
        educationList:[],
        ajaxListArray:[
            {
                dataType:1,
                listName:"sexual"
            },{
                dataType:2,
                listName:"education"
            },
            {
                dataType:3,
                listName:"marriage"
            },{
                dataType:4,
                listName:"mortgage"
            },
            {
                dataType:5,
                listName:"languageList"
            },{
                dataType:6,
                listName:"degreeList"
            },
            {
                dataType:7,
                listName:"listenList"
            },{
                dataType:8,
                listName:"speakList"
            },
            {
                dataType:9,
                listName:"levelList",
                relevance:"1",
                relatedItems:"5",
                stairName:"languages"
            },{
                dataType:10,
                listName:"speed"
            },
            {
                dataType:11,
                listName:"thought"
            },{
                dataType:12,
                listName:"styleList"
            },
            {
                dataType:13,
                listName:"traitList"
            },{
                dataType:14,
                listName:"outlineList"
            },
            {
                dataType:15,
                listName:"temperamentList"
            },{
                dataType:16,
                listName:"distanceList"
            },
            {
                dataType:17,
                listName:"strengthList"
            },{
                dataType:18,
                listName:"productCycleList"
            },
            {
                dataType:19,
                listName:"significanceList"
            },
            // {
            //     dataType:20,
            //     listName:"certificateList",
            //     relevance:"1",
            //     relatedItems:"27"
            // },
            {
                dataType:21,
                listName:"jobStatusList"
            },{
                dataType:22,
                listName:"schoolList"
            },
            {
                dataType:23,
                listName:"eduTypeList"
            },
            // {
            //     dataType:6,
            //     listName:"degreeList"
            // },
            // {
            //     dataType:7,
            //     listName:"listenList"
            // },{
            //     dataType:8,
            //     listName:"speakList"
            // },
        ],
        related:"",








        data:{
            email:"",
            phone:""
        },
        //简历附件
        uploadShow:true,
        language:{
            value1:"",
            value2:""
        },
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
        options5: [],
        time:[],
        labelPosition:"right",
        ruleForm:{
            resource:"",
            date:""
        },
        option3: [{
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                value: 'yizhi',
                label: '一致'
                }, {
                value: 'fankui',
                label: '反馈'
                }, {
                value: 'xiaolv',
                label: '效率'
                }, {
                value: 'kekong',
                label: '可控'
                }]
            }, {
                value: 'daohang',
                label: '导航',
                children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
                }, {
                value: 'dingbudaohang',
                label: '顶部导航'
                }]
            }]
            }, {
            value: 'zujian',
            label: '组件',
            children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                value: 'layout',
                label: 'Layout 布局'
                }, {
                value: 'color',
                label: 'Color 色彩'
                }, {
                value: 'typography',
                label: 'Typography 字体'
                }, {
                value: 'icon',
                label: 'Icon 图标'
                }, {
                value: 'button',
                label: 'Button 按钮'
                }]
            }, {
                value: 'form',
                label: 'Form',
                children: [{
                value: 'radio',
                label: 'Radio 单选框'
                }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
                }, {
                value: 'input',
                label: 'Input 输入框'
                }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
                }, {
                value: 'select',
                label: 'Select 选择器'
                }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
                }, {
                value: 'switch',
                label: 'Switch 开关'
                }, {
                value: 'slider',
                label: 'Slider 滑块'
                }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
                }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
                }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
                }, {
                value: 'upload',
                label: 'Upload 上传'
                }, {
                value: 'rate',
                label: 'Rate 评分'
                }, {
                value: 'form',
                label: 'Form 表单'
                }]
            }, {
                value: 'data',
                label: 'Data',
                children: [{
                value: 'table',
                label: 'Table 表格'
                }, {
                value: 'tag',
                label: 'Tag 标签'
                }, {
                value: 'progress',
                label: 'Progress 进度条'
                }, {
                value: 'tree',
                label: 'Tree 树形控件'
                }, {
                value: 'pagination',
                label: 'Pagination 分页'
                }, {
                value: 'badge',
                label: 'Badge 标记'
                }]
            }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                value: 'alert',
                label: 'Alert 警告'
                }, {
                value: 'loading',
                label: 'Loading 加载'
                }, {
                value: 'message',
                label: 'Message 消息提示'
                }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
                }, {
                value: 'notification',
                label: 'Notification 通知'
                }]
            }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
                }, {
                value: 'tabs',
                label: 'Tabs 标签页'
                }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
                }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
                }, {
                value: 'steps',
                label: 'Steps 步骤条'
                }]
            }, {
                value: 'others',
                label: 'Others',
                children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
                }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
                }, {
                value: 'popover',
                label: 'Popover 弹出框'
                }, {
                value: 'card',
                label: 'Card 卡片'
                }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
                }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
                }]
            }]
            }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
                value: 'axure',
                label: 'Axure Components'
            }, {
                value: 'sketch',
                label: 'Sketch Templates'
            }, {
                value: 'jiaohu',
                label: '组件交互文档'
            }]
            }]
        }
    },
    created: function () {
        // this.getCddInfo();
        // this.ajaxList()
        // this.uploadFile();

        // this.handleItemChange();
    },
    mounted(){
        this.getCddInfo();
        // console.log(this.$qs.stringify(this.resumeData))
    },
    watch:{
        
    },
    methods: {
      ajaxList(){
          for (var i = 0; i < this.ajaxListArray.length; i++) {
            this.listRequest(this.ajaxListArray[i])
          }
      },
      listRequest(data,stairName){
        var _this=this;
        var obj={
            dataType:data.dataType,   //数据种类
            codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
            keyword:"",     //关键词
            useType:1
        };
        if (!data.relevance) {
            this.getDataList(obj,function(res){
                _this.dataList[data.listName]=res;
            })
        }else{
            this.$watch(data.stairName,function(newData,oldData){
                obj.codePrefix=newData;
                _this.getDataList(obj,function(res){
                    _this.dataList[data.listName]=res;
                })
            })
        }
        
      },
      //计算获取数据infoFlag
      calculateInfoFlag(){
        var nums=0;
        var calculate=function(str){
            var n=str.split("+")[1];
            var y="1";
            for (var x = 0; x < n; x++) {
                y=y+"0"
            }
            return y;
        }
        for (var i = 0; i < this.resumeData.length; i++) {
            var num=Math.pow(10,this.resumeData[i].infoFlag);
            console.log(num)
            console.log(nums)
            var str=num.toString();
            if(str.indexOf("e")!=-1){
                nums+=parseInt(calculate(str),2)
            }else{
                nums+=parseInt(str,2);
            } 
        }
        return nums;
      },
      // 获取详细信息
      getCddInfo(){
          var _this=this;
          var nums=this.calculateInfoFlag();
          this.$http({
            url:totalPort.getCddInfo(),
            method:"post",
            data:this.$qs.stringify({
                    cddId:_this.$route.query.id,
                    infoFlag:nums
                })
            })
          .then((data) => {
            if (data.data.code==0) {
                this.cddInfoData=data.data.data;
                this.ajaxList()
                console.log(this.cddInfoData)
            }else{
                console.log("报错详细信息")
            }
        }).catch(function(err){
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //语言保存
      langusgeSub(){
        var _this=this;
        if(!this.languages){
            this.$message({
                type: 'warning',
                message: '请选择语言!'
            });
            return false;
        }
        var obj={
            id:1,      //标识ID
            cddId:1,      //人选标识ID
            languageCode:this.languages,      //语言码值
            readWriteCode:this.lang.readWriteCode,      //读写能力码值
            levelCode:this.lang.levelCode      //考试等级码值
        }
        
        this.ajaxPort(1,2,obj,function(data){
            //模拟
            // _this.languagesList.push()
            // _this.ajaxPort(1,1,{lanId:1},function(data){console.log(data)})
            
        })
        this.dialogShow=false;
      },
// *****************************语言**************************************
      //type:1语言  2孩子  3工作经历  4教育经历
      //status:1查  2增  3改  4删除
      ajaxPort(type,status,obj,callBack){
        var url;
        switch(type){
            case 1:
            if(status==1)url=totalPort.getLanguageInfoById();
            if(status==2)url=totalPort.addLanguageInfo();
            if(status==3)url=totalPort.updateLanguageInfoById();
            if(status==4)url=totalPort.deleteLanguageInfo();
            break;
            case 2:
            if(status==1)url=totalPort.getChildInfoById();
            if(status==2)url=totalPort.addChildInfo();
            if(status==3)url=totalPort.updateChildInfoById();
            if(status==4)url=totalPort.deleteChildInfo();
            break;
            case 3:
            // if(status==1)url=totalPort.getLanguageInfoById();
            if(status==2)url=totalPort.addWorkExp();
            if(status==3)url=totalPort.updateWorkExp();
            if(status==4)url=totalPort.deleteWorkExp();
            break;
            case 4:
            if(status==1)url=totalPort.getEduExpById();
            if(status==2)url=totalPort.addEduExp();
            if(status==3)url=totalPort.updateEduExp();
            if(status==4)url=totalPort.deleteEduExp();
            break;
        }
        this.$http({
            url:url,
            method:"post",
            data:this.$qs.stringify(obj)
        })
        .then((data) => {
            if (data.data.code==0) {
                callBack(data.data.data)
            }else{
                console.log("报错")
            }
        }).catch(function(err){
            console.log(err)
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      lanShow(a,b){
        console.log(a)
        console.log(b)
      },
      //接口
      getDataList(obj,callBack){
        var _this=this;
        this.$http({
          url: totalPort.getDataList(),
           method: 'post', 
           data: this.$qs.stringify(obj)})
        .then((data) => {
            if (data.data.code==0) {
                if (data.data.data===undefined) {
                  data.data.data=[];
                }
                callBack(data.data.data);
            }else{
                console.log("报错")
            }
        }).catch(function(err){
          console.log(err)
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //添加教育经历
      addEducationExperience(){
        var eduExpList={//教育经历
            id:"",       //标识ID
            cddId:"",       //人选标识ID
            school:"",       //学校名
            major:"",       //专业名
            startTime:"",       //就读年月
            endTime:"",       //毕业年月
            diplomaCode:"",       //	学历码值
            eduTypeCode:"",       //招收类型码值
            schoolCode:"",       //学校码值
            majorCode:""       //专业码值
        }
      },
      //输入文字搜索相关
      schoolMethod(vel){
        //大学
        this.updateEduExp({
            dataType:26,   //数据种类
            codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
            keyword:val,     //关键词
            useType:1
        },function(data){
            this.schoolList=data;
        })
      },
      //修改简历
      modification(){
        var _this=this;
        this.cddInfoData.updateFlag=_this.calculateInfoFlag();
        console.log(_this.cddInfoData)
        this.$http({
          url: totalPort.updateCddInfo(),
           method: 'post', 
           data: _this.cddInfoData,
           transformRequest: [
            function (data) { // 解决传递数组变成对象的问题
                Object.keys(data).forEach((key) => {
                    if ((typeof data[key]) === 'object') {
                        data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
                    }
                })
                data = _this.$qs.stringify(data) // 这里必须使用qs库进行转换
                return data
            }
           ]
        })
        .then((data) => {
            console.log(data)
            // if (data.data.code==0) {
            //     if (data.data.data===undefined) {
            //       data.data.data=[];
            //     }
            //     callBack(data.data.data);
            // }else{
            //     console.log("报错")
            // }
        }).catch(function(err){
          console.log(err)
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
//**********************************************************************
//**********************************************************************


      // 时间
      setTime(keys,val){
        this[keys]=val;
      },
      handleItemChange() {
        var time=new Date();
        var newYear=time.getFullYear();
        for (var i = newYear; i >= newYear-60; i--) {
            this.options5.push({value:i,label: i+'年',children: [{value:"1",label:"1月"},{value:"2",label:"2月"},{value:"3",label:"3月"},{value:"4",label:"4月"},{value:"5",label:"5月"},{value:"6",label:"6月"},{value:"7",label:"7月"},{value:"8",label:"8月"},{value:"9",label:"9月"},{value:"10",label:"10月"},{value:"11",label:"11月"},{value:"12",label:"12月"}]})
        }
      },

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
        "v-goBack":goBack,
        "sel-time":selTime
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
      margin-top: 0px;
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
  .lh{
    line-height: 30px;
  }
  .btn-center{
    text-align: center;
  }
  .mar-bot{
    margin-bottom: 15px;
  }
  .mar-bot-tit{
    height: 30px;
    margin-bottom: 15px;
  }
  .fl-lh{
      float:left;
      line-height: 30px;
      height: 30px;
      text-indent: 2em;
  }
</style>
