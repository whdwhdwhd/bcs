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
            <el-form-item label="城市类型：" v-if="dialogForm.cityType">
              <el-input class="wid" v-model="dialogForm.cityType" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在城市码值：" v-if="dialogForm.cityCode">
              <el-input class="wid" v-model="dialogForm.cityCode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="大学类型：" v-if="dialogForm.uniType">
              <el-input class="wid" v-model="dialogForm.uniType" auto-complete="off"></el-input>
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
import vueZtree from '@/components/commonComponents/vue-ztree.vue';
import goBack from '@/components/goBack';
import configurationData from '../../../static/common/configurationData.json';
export default {
    data () {
        return {
            dataList:configurationData,
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
            ADD_BTN:"添加",
            SAVE_BTN:"修改",
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
        if (this.dialogTitle===this.ADD_BTN) {
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
        _this.dialogTitle=this.ADD_BTN; 
        this.dialogForm={
          name:"",
          isUse:1,
          isModify:1
        }
        if (this.rightObj.id==61) this.dialogForm.cityType="";
        if (this.rightObj.id==26) {
          this.dialogForm.cityCode="";
          this.dialogForm.uniType="";
        }

      },
      //修改
      savedata () {
        var _this=this;
        _this.dialogTableVisible=true;
        _this.dialogTitle=this.SAVE_BTN;
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
        if (this.dialogTitle==this.ADD_BTN) {
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
        } else if(this.dialogTitle==this.SAVE_BTN) {
          var obj={
            id:this.rightObj.id,
            name:this.dialogForm.name,    //名
            isUse:parseInt(this.dialogForm.isUse),    //1—启用/0—停用
            isModify:parseInt(this.dialogForm.isModify),    //是否可编辑/删除 1—可 0 –不可
            dataType:parseInt(this.rightObj.parents)
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
          _this.ztreeData[0].children=null;
          _this.ztreeData[0].relevance=null;
          _this.ztreeData[0].relatedItems=null;
          _this.ztreeData[0].id=index;
          var childrens=_this.dataList[indexPath[0]-1].children;
          for (var chi in childrens) {
            if (childrens[chi].id==indexPath[1]) {
              _this.ztreeData[0].name=childrens[chi].name;
              if (childrens[chi].relevance) {
                _this.ztreeData[0].relevance=childrens[chi].relevance;
                _this.ztreeData[0].relatedItems=childrens[chi].relatedItems;
              }  
              break;
            }
          }
          _this.ajaxList(index,data,_this.ztreeData[0])
        })
      },

      NewNode(data,PNode,dataType){
        var tmpNode = PNode;
        var i = 0;
        while( i<data.code.length ){
          if(tmpNode.children == undefined)
              tmpNode.children = [];
          if(tmpNode.children[ parseInt(data.code.substring(i,i+2))-1 ]==undefined )
              tmpNode.children[ parseInt(data.code.substring(i,i+2))-1 ]  = {};     
          tmpNode = tmpNode.children[ parseInt( data.code.substring(i,i+2) )-1 ];
          i+=2;
        }
        tmpNode.id=data.id;
        tmpNode.code=data.code;
        tmpNode.name=data.name;
        tmpNode.iconClass="iconClassNode";
        tmpNode.parents=dataType;
        tmpNode.isModify=data.isModify;
        tmpNode.isUse=data.isUse;
      },

      //循环列表
      ajaxList(dataType,data,chis){
        console.log(chis.relevance)
        if (chis.relevance) {
          var obj={
            dataType:chis.relatedItems,   //数据种类
            codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
            keyword:"",     //关键词
            useType:2
          }
          this.secondary(obj,chis,data,dataType)
        }else{
          for (var i = 0; i < data.length; i++) {
            this.NewNode(data[i],chis,dataType)
          }
          this.count+=1;
        }
        
      },
      //次级
      secondary(obj,PNode,data2,dataType){
        var _this=this;
        this.getDataList(obj,function(data){
          for (var i = 0; i < data.length; i++) {
            if (data[i].code.length>2) continue;
            if( !PNode.children ) PNode.children=[];
            if(PNode.children[i] == undefined) PNode.children[i] ={}
            PNode.children[i].id=data[i].id;
            PNode.children[i].code=data[i].code;
            PNode.children[i].name=data[i].name;
            PNode.children[i].iconClass="iconClassNode";
            if (PNode.children[i].children ==undefined) PNode.children[i].children= [];
            PNode.children[i].parents=dataType;
            PNode.children[i].isModify=data[i].isModify;
            PNode.children[i].isUse=data[i].isUse;
          }
          for (var i = 0; i < data2.length; i++) {
            _this.NewNode(data2[i],PNode,dataType)
          }
          _this.count+=1;
        })
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