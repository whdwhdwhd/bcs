<template>
    <div class="dataManagement">
        <v-goBack></v-goBack>
        <el-container class="dataManagement-main">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo h"
              @select="handleSelect">
                <el-submenu v-for="( data,index ) in dataList"  :key="index" :index="data.id">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{data.name}}</span>
                  </template>
                  <el-menu-item v-for="( item,index ) in data.children"  :key="index" :index="item.id">
                    <span slot="title">{{item.name}}</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
          </el-aside>
          <el-container>
            <div class="dataManagement-content">
              <vue-ztree :list.sync='ztreeData' :count.sync='count' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
              <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedata" @newdata="newdata" @deletedata="deletedata()"></vue-context-menu>
            </div>
          </el-container>
        </el-container>
        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="40%">
          <el-form :model="dialogForm" :label-position="positionRight"  label-width="150">
            <el-form-item label="名称：">
              <el-input class="wid" v-model="dialogForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="启用/停用：">
              <el-radio-group v-model="dialogForm.isUse">
                <el-radio :label="0">停用</el-radio>
                <el-radio :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否可编辑/删除：">
              <el-radio-group v-model="dialogForm.isModify">
                <el-radio :label="0">否</el-radio>
                <el-radio :label="1">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="subBtn">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import vueZtree from '@/components/commonComponents/vue-ztree.vue'
import goBack from '@/components/goBack';
export default {
    data () {
        return {
            dataList:[
              {
                id:"1",
                name:"配置信息",
                children:[
                  {
                    id:"1",
                    name:"性取向"
                  },
                  {
                    id:"2",
                    name:"学历"
                  },
                  {
                    id:"3",
                    name:"婚姻"
                  },
                  {
                    id:"4",
                    name:"房贷压力"
                  },
                  {
                    id:"5",
                    name:"语言种类"
                  },
                  {
                    id:"6",
                    name:"语言-读写能力"
                  },
                  {
                    id:"7",
                    name:"语言-听能力"
                  },
                  {
                    id:"8",
                    name:"语言-说能力"
                  },
                  {
                    id:"9",
                    name:"语言-考试等级"
                  },
                  {
                    id:"10",
                    name:"语速"
                  },
                  {
                    id:"11",
                    name:"思维"
                  },
                  {
                    id:"12",
                    name:"风格"
                  },
                  {
                    id:"13",
                    name:"特征"
                  },
                  {
                    id:"14",
                    name:"外形"
                  },
                  {
                    id:"15",
                    name:"气质"
                  },
                  {
                    id:"16",
                    name:"离家距离"
                  },
                  {
                    id:"17",
                    name:"工作强度"
                  },
                  {
                    id:"18",
                    name:"产品参与周期"
                  },
                  {
                    id:"19",
                    name:"产品重要性"
                  },
                  {
                    id:"20",
                    name:"证书"
                  },
                  {
                    id:"21",
                    name:"求职状态"
                  },
                  {
                    id:"22",
                    name:"大学类型"
                  },
                  {
                    id:"23",
                    name:"大学招收类型"
                  },
                  {
                    id:"24",
                    name:"知名比赛"
                  },
                  {
                    id:"25",
                    name:"知名刊物"
                  },
                  {
                    id:"26",
                    name:"大学"
                  },
                  {
                    id:"27",
                    name:"职位方向"
                  },
                  {
                    id:"28",
                    name:"职位"
                  },
                  {
                    id:"40",
                    name:"公司类型"
                  },
                  {
                    id:"41",
                    name:"公司规模"
                  },
                  {
                    id:"61",
                    name:"城市"
                  },
                  {
                    id:"62",
                    name:"行业"
                  },
                  {
                    id:"63",
                    name:"领域城市"
                  },
                ]
              }
            ],
            ztreeData:[{
              id:Number,
              name:String,
              iconClass:"iconClassRoot",
              open:true,
              children:[]
            }],
            count:0,
            dialogTableVisible:false,
            positionRight:"right",
            dialogTitle:"",
            dialogForm:{
              name:"",
              isUse:Number,
              isModify:Number
            },
            ztreeDataSourceList:[{
              id:880,
              name:"娱乐",
              iconClass:"iconClassRoot",
              open:true,
              children:[{
                id:881,
                name:"游戏",
                iconClass:"iconClassNode",
              },{
                id:882,
                name:"电影",
                clickNode:true,
                iconClass:"iconClassNode",
              },{
                id:883,
                name:"新闻",
                iconClass:"iconClassNode",
              }]
          }],
          //右键事件
          contextMenuData: {
            menuName: 'demo',
                axios: {
                    x: null,
                    y: null
                },
                menulists: [
                    {
                        fnHandler: 'newdata',
                        icoName: '',
                        btnName: '添加'
                    },
                    {
                        fnHandler: 'savedata',
                        icoName: '',
                        btnName: '修改'
                    },
                    {
                        fnHandler: 'deletedata',
                        icoName: '',
                        btnName: '删除'
                    }
                ]
            },
            rightObj:null,
            rightObjParent:null,
            rightObjParentC:null,
            rightObjLenght:null,
            indexPath:[],
            ajaxData:[]
        }
    },
    mounted(){
        this.handleSelect(1,[1,1])
    },
    watch:{
      dialogTitle:function(n,o){
        if (this.dialogTitle==="添加") {
          this.dialogForm={
              name:"",
              isUse:1,
              isModify:1
            }
        }
      }
    },
    methods:{
      // 右击事件
      contextmenuClick:function(m,l,t){
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
        this.rightObj=m;
        this.rightObjParentC=t;
        this.rightObjLenght=l;
        console.log("右键")
        console.log(this.rightObj)
        console.log(this.rightObjParentC)
      },
      //添加
      newdata () {
        var _this=this;
        _this.dialogTableVisible=true;
        _this.dialogTitle="添加"; 
        this.dialogForm={
          name:"",
          isUse:1,
          isModify:1
        } 
      },
      //修改
      savedata () {
        var _this=this;
        _this.dialogTableVisible=true;
        _this.dialogTitle="修改";
        _this.dialogForm.name=this.rightObj.name;
        _this.dialogForm.isUse=this.rightObj.isUse;
        _this.dialogForm.isModify=this.rightObj.isModify;
      },
      //删除
      deletedata () {
        var _this=this;
        this.$confirm('此操作将永久删除该项内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteAjax(this.rightObj)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });       
        });
      },
      //提交
      subBtn(){
        var _this=this;
        if (this.dialogTitle=="添加") {
          console.log(this.rightObj)
          var obj={
            name:this.dialogForm.name,    //名
            isUse:parseInt(this.dialogForm.isUse),    //1—启用/0—停用
            isModify:parseInt(this.dialogForm.isModify),    //是否可编辑/删除 1—可 0 –不可
          }
          this.rightObj.parents===undefined? obj.dataType=this.rightObj.id:obj.dataType=this.rightObj.parents;
          if(this.rightObj.code!=undefined) obj.code=this.rightObj.code;
          if (this.rightObj.id==9 || this.rightObj.id==20 || this.rightObj.id==24 || this.rightObj.id==25 || this.rightObj.id==27 || this.rightObj.id==28) {
            if (this.rightObj.code==undefined) {
              this.$message({
                type: 'warning',
                message: '请先添加关联项'
              });      
              return false; 
            }
          }
          _this.addAjax(obj,this.rightObj.id) 
        } else if(this.dialogTitle=="修改") {
          var obj={
            id:this.rightObj.id,
            name:this.dialogForm.name,    //名
            isUse:parseInt(this.dialogForm.isUse),    //1—启用/0—停用
            isModify:parseInt(this.dialogForm.isModify),    //是否可编辑/删除 1—可 0 –不可
            dataType:parseInt(this.rightObj.parent)
          }
          _this.saveAjax(obj)
        }
      },
      handleSelect(index,indexPath) {
        var _this=this;
        this.indexPath=indexPath;
        this.getDataList({
            dataType:index,   //数据种类
            codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
            keyword:"",     //关键词
            useType:2
        },function(data){
          var strNum=2;
          _this.ajaxData=data;
          _this.ztreeData[0].id=index;
          var childrens=_this.dataList[indexPath[0]-1].children;
          for (var chi in childrens) {
            if (childrens[chi].id==indexPath[1]) {
              _this.ztreeData[0].name=childrens[chi].name;   
              break;
            }
          }
          _this.ztreeData[0].children=[];
          _this.ajaxList(index,data,_this.ztreeData[0])
          _this.count+=1;
        })
      },
      //循环列表
      ajaxList(dataType,data,chis){
        var _this=this;
        if (dataType==9) {
          this.getDataList({
              dataType:5,   //数据种类
              codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
              keyword:"",     //关键词
              useType:2
          },function(res){
            for (let key in res) {
              var i=0;
              var TmpNode;
              if( undefined == chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] ) chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] = {};
                  TmpNode = chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ];
              TmpNode.id=res[key].id;
              TmpNode.code=res[key].code;
              TmpNode.name=res[key].name;
              TmpNode.iconClass="iconClassNode";
              TmpNode.parents=dataType;
              TmpNode.isModify=res[key].isModify;
              TmpNode.isUse=res[key].isUse;
            }
            _this.circulation(dataType,data,chis)
          })
        } else if ( dataType==24 || dataType==25 || dataType==27 ) {
          this.getDataList({
              dataType:62,   //数据种类
              codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
              keyword:"",     //关键词
              useType:2
          },function(res){
            for (let key in res) {
              var i=0;
              var TmpNode;
              if( undefined == chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] ) chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] = {};
                  TmpNode = chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ];
              TmpNode.id=res[key].id;
              TmpNode.code=res[key].code;
              TmpNode.name=res[key].name;
              TmpNode.iconClass="iconClassNode";
              TmpNode.parents=dataType;
              TmpNode.isModify=res[key].isModify;
              TmpNode.isUse=res[key].isUse;
            }
            _this.circulation(dataType,data,chis)
          })
        } else if ( dataType==20 || dataType==28) {
          this.getDataList({
              dataType:27,   //数据种类
              codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
              keyword:"",     //关键词
              useType:2
          },function(res){
            for (let key in res) {
              var i=0;
              var TmpNode;
              if( undefined == chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] ) chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ] = {};
                  TmpNode = chis.children[ parseInt(res[key].code.substring(i,i+2))-1 ];
              TmpNode.id=res[key].id;
              TmpNode.code=res[key].code;
              TmpNode.name=res[key].name;
              TmpNode.iconClass="iconClassNode";
              TmpNode.parents=dataType;
              TmpNode.isModify=res[key].isModify;
              TmpNode.isUse=res[key].isUse;
            }
            _this.circulation(dataType,data,chis)
          })
        } else {
          _this.circulation(dataType,data,chis)
        }
        
        
      },
      //循环
      circulation(dataType,data,chis){
        var _this=this;
        for (let key in data) {
            var i=0;
            var TmpNode;
            if( undefined == chis.children[ parseInt(data[key].code.substring(i,i+2))-1 ] ) chis.children[ parseInt(data[key].code.substring(i,i+2))-1 ] = {};
                TmpNode = chis.children[ parseInt(data[key].code.substring(i,i+2))-1 ];
            i = i+2;
            while( i<data[key].code.length ){
              
              if( TmpNode.children==undefined ) {
                TmpNode.children=[];
                TmpNode.iconClass="iconClassRoot";
              };
              if( undefined == TmpNode.children[ parseInt(data[key].code.substring(i,i+2))-1 ] ) TmpNode.children[ parseInt(data[key].code.substring(i,i+2))-1 ] = {};
              TmpNode = TmpNode.children[ parseInt(data[key].code.substring(i,i+2))-1 ];
              i+= 2;
            };
            TmpNode.id=data[key].id;
            TmpNode.code=data[key].code;
            TmpNode.name=data[key].name;
            TmpNode.iconClass="iconClassNode";
            TmpNode.parents=dataType;
            TmpNode.isModify=data[key].isModify;
            TmpNode.isUse=data[key].isUse;
          }
          _this.count+=1;
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
      //添加接口
      addAjax(obj,index){
        this.$http({
          url: totalPort.addDataInfo(),
           method: 'post', 
           data: this.$qs.stringify(obj)})
        .then((data) => {
            if (data.data.code==0) {
                this.handleSelect(this.ztreeData[0].id,this.indexPath)
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.dialogTableVisible=false;
            }else{
                console.log("报错")
            }
        }).catch((err)=>{
          console.log(err)
            this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //修改接口
      saveAjax(obj){
        this.$http({
          url: totalPort.updateDataInfo(),
           method: 'post', 
           data: this.$qs.stringify(obj)})
        .then((data) => {
            if (data.data.code==0) {
                this.handleSelect(this.ztreeData[0].id,this.indexPath)
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
                this.dialogTableVisible=false;
            }else{
                console.log("报错")
            }
        }).catch((err)=>{
          console.log(err)
            this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //删除接口
      deleteAjax(obj){
        var _this=this;
        var str="?id="+obj.id+"&dataType="+obj.parents;
        this.$http.get(totalPort.deleteDataInfo()+str)
        .then((data) => {
            if (data.data.code==0) {
                this.handleSelect(this.ztreeData[0].id,this.indexPath)
                _this.$message({
                  type: 'success',
                  message: '删除成功'
                });
            }else{
                console.log("报错")
            }
        }).catch((err)=>{
          console.log(err)
            this.$message.error('请求数据失败，请刷新页面！');
        });
      }
    },
    components: {
        "v-goBack":goBack,
        "vue-ztree":vueZtree
    }
}
</script>
<style scoped>
.dataManagement{
  height:100%;
}
.dataManagement-main{
  height:90%;
  /*margin-top:10px;*/
  border: 1px solid #eee;
}
.h{
  height:100%;
}
.wid{
  width:40%;
}
</style>