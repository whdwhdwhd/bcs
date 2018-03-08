<template>
    <div class="dataManagement">
        <v-goBack></v-goBack>
        <div class="dataManagement-content">
          <vue-ztree :list.sync='ztreeDataSourceList' :contextmenu='contextmenuClick' :is-open='true'></vue-ztree>
          <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedata()" @newdata="newdata()" @deletedata="deletedata()"></vue-context-menu>
        </div>
    </div>
</template>
<script>
import vueZtree from '@/components/commonComponents/vue-ztree.vue'
import goBack from '@/components/goBack';
export default {
    data () {
        return {
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
          },{
              id:990,
              name:"BAT",
              iconClass:"iconClassRoot",
              open:false,
              children:[{
                  id:991,
                  name:"马化腾",
                  iconClass:"iconClassNode",
              },{
                  id:992,
                  name:"李彦宏",
                  iconClass:"iconClassNode",
              },{
                  id:993,
                  name:"马云",
                  iconClass:"iconClassNode",
              }]
          }],
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
          var newData={
              id:+new Date(),
              name:value,
              path:"",
              iconClass:"iconClassNode",
              clickNode:false,
              isFolder:false,
              isExpand:false,
              loadNode:0,
              children:[]
          }
          this.$set(this.rightObj,"iconClass","iconClassRoot")
          this.$set(this.rightObj,"isFolder",true)
          this.rightObj.children.push(newData)   
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
        this.$confirm('此操作将永久删除该项内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({ value }) => {
          this.rightObjParentC.splice(this.rightObjParentC.indexOf(this.rightObj),1);
          this.$message({
            type: 'success',
            message: '删除成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          });       
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
.dataManagement-content{
  
}
.ztree {margin:0; padding:5px; color:#333 ;}
.ztree li{position: relative; padding:0; margin:0; list-style:none; line-height:14px; text-align:left; white-space:nowrap; outline:0}
.ztree li ul{ margin:0; padding:0 0 0 18px}
.ztree li a {padding:1px 3px 0 5px; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
		text-decoration:none; vertical-align:top; display: inline-block}
.ztree li a:hover {text-decoration:underline;color:blue;}
.ztree li span {line-height:16px; margin-right:2px; display: inline-block;}
.ztree li span.button {line-height:0; margin:0; width:16px; height:16px; display: inline-block; vertical-align:middle;
		border:0 none; cursor: pointer;outline:none;
		background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
		background-image:url("../../images/ztree/zTreeStandard.png"); *background-image:url("../../images/ztree/zTreeStandard.gif")}
.ztree li span.button.roots_close {background-position: -74px 0;}
.ztree li span.button.bottom_open {background-position: -92px -36px;}
.ztree li span.button.ico_open{margin-right:2px; background-position:-110px -16px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.ico_close{margin-right:2px; background-position:-110px 0; vertical-align:top; *vertical-align:middle}
.ztree li span.button.ico_docu{margin-right:2px; background-position:-110px -32px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.edit {margin-right:2px; background-position:-110px -48px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.remove {margin-right:2px; background-position:-110px -64px; vertical-align:top; *vertical-align:middle}
</style>