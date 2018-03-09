<template>
    <div class="dataManagement">
        <v-goBack></v-goBack>
        <el-row class="dataManagement-main">
          <el-col :span="4" class="h">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo h"
            @select="handleSelect">
              <el-submenu v-for="( data,index ) in dataList"  :key="index" :index="data.id">
                <template slot="title">
                  <span>{{data.name}}</span>
                </template>
                <el-menu-item v-for="( item,index ) in data.children"  :key="index" :index="item.id">
                  <span slot="title">{{item.name}}</span>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="20">
            <div class="dataManagement-content">
              <vue-ztree :list.sync='ztreeDataSourceList' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
              <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedata()" @newdata="newdata()" @deletedata="deletedata()"></vue-context-menu>
            </div>
          </el-col>
        </el-row>
        
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
                name:"基本信息",
                children:[
                  {
                    id:"1",
                    name:"性取向"
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
                  }
                ]
              },
              {
                id:"2",
                name:"家庭",
                children:[]
              },
              {
                id:"3",
                name:"教育",
                children:[]
              },
              {
                id:"4",
                name:"工作",
                children:[]
              },
              {
                id:"5",
                name:"期望",
                children:[]
              },
              
            ],
            ztreeData:[{
              id:Number,
              name:String,
              iconClass:"iconClassRoot",
              open:true,
              children:[]
            }],
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
            rightObjLenght:null
        }
    },
    created () {
        
    },
    mounted(){
        
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
      },
      //添加
      newdata () {
        this.$prompt('请输入添加内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          var obj={
            name:value,    //名
            isUse:1,    //1—启用/0—停用
            isModify:1,    //是否可编辑/删除 1—可 0 –不可
            orderId:"",    //排序ID
            color:"",    //颜色
          }
          this.addAjax(obj,index,function(){

          })
          // var newData={
          //     id:+new Date(),
          //     name:value,
          //     path:"",
          //     iconClass:"iconClassNode",
          //     clickNode:false,
          //     isFolder:false,
          //     isExpand:false,
          //     loadNode:0,
          //     children:[]
          // }
          // this.$set(this.rightObj,"iconClass","iconClassRoot")
          // this.$set(this.rightObj,"isFolder",true)
          // this.rightObj.children.push(newData)   
          this.$message({
            type: 'success',
            message: '添加成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加'
          });       
        });    
      },
      //修改
      savedata () {
      	this.$prompt('请输入修改内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          this.$set(this.rightObj,"name",value)
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
      },
      //删除
      deletedata () {
        console.log(this.rightObjParentC)
        console.log(this.rightObj)
        var _this=this;
        this.$confirm('此操作将永久删除该项内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteAjax(this.rightObj,_this.ztreeData[0].id,function(){
            _this.rightObjParentC.splice(_this.rightObjParentC.indexOf(_this.rightObj),1);
            _this.$message({
              type: 'success',
              message: '删除成功'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });       
        });
      },
      handleSelect(index,indexPath) {
        var _this=this;
        this.getDataList({
            dataType:index,   //数据种类
            codePrefix:"",   //编码前缀，例如：互联网行业下的职位方向，则需携带互联网码值
            keyword:"",     //关键词
            useType:2
        },function(data){
          _this.ztreeData[0].id=index;
          var childrens=_this.dataList[indexPath[0]-1].children;
          for (var chi in childrens) {
            if (childrens[chi].id==indexPath[1]) {
              _this.ztreeData[0].name=childrens[chi].name;
            }
          }
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              _this.ztreeData[0].children[key]={};
              _this.ztreeData[0].children[key].id=data[key].id;
              _this.ztreeData[0].children[key].name=data[key].name;
              _this.ztreeData[0].children[key].iconClass="iconClassNode";
            }
          }
        })
      },
      //接口
      getDataList(obj,callBack){
        var _this=this;
        var str="?";
        for (var key in obj) {
            str+=key+"="+obj[key]+"&";
        }
        str=str.substr(0,str.length-1);
        this.$http.get(totalPort.getDataList()+str)
        .then((data) => {
            if (data.data.code==0) {
                callBack(data.data.data);
            }else{
                console.log("报错")
            }
        }).catch(function(err){
            _this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //添加接口
      addAjax(obj,index,callBack){
        var str="?";
        for (var key in obj) {
            str+=key+"="+obj[key]+"&";
        }
        str+="dataType="+index;
        this.$http.get(totalPort.addDataInfo()+str)
        .then((data) => {
          console.log(data.data.code)
            if (data.data.code==0) {
                callBack(data.data.data);
            }else{
                console.log("报错")
            }
        }).catch((err)=>{
          console.log(err)
            this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //修改接口
      saveAjax(obj,index,callBack){
        var str="?";
        for (var key in obj) {
            str+=key+"="+obj[key]+"&";
        }
        str+="dataType="+index;
        this.$http.get(totalPort.updateDataInfo()+str)
        .then((data) => {
          console.log(data.data.code)
            if (data.data.code==0) {
                callBack(data.data.data);
            }else{
                console.log("报错")
            }
        }).catch((err)=>{
          console.log(err)
            this.$message.error('请求数据失败，请刷新页面！');
        });
      },
      //删除接口
      deleteAjax(obj,index,callBack){
        var str="?id="+obj.id+"&dataType="+index;
        this.$http.get(totalPort.deleteDataInfo()+str)
        .then((data) => {
          console.log(data.data.code)
            if (data.data.code==0) {
                callBack(data.data.data);
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
  height:100%;
  margin-top:10px;
}
.h{
  height:100%;
}
</style>