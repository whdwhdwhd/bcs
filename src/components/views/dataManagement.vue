<template>
    <div class="dataManagement">
        <v-goBack></v-goBack>
        <div class="dataManagement-content">
                <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" @node-contextmenu="rightButton" @contextmenu.native='contextmenuTrigger=true'>
                    <span class="custom-tree-node" slot-scope="{ node, data }" @contextmenu.prevent="showMenu()">
                        <span :data-da="data.id">{{ node.label }}</span>
                        <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedata(node,data)" @newdata="newdata()" @deletedata="deletedata()"></vue-context-menu>
                    </span>
                </el-tree>
        </div>
    </div>
</template>
<script>
import goBack from '@/components/goBack';
export default {
    data () {
        return {
            id:"111",
            data : [{
                id: 1,
                label: '一级 1',
                children: [{
                id: 4,
                label: '二级 1-1',
                children: [{
                    id: 9,
                    label: '三级 1-1-1'
                }, {
                    id: 10,
                    label: '三级 1-1-2'
                }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                id: 5,
                label: '二级 2-1'
                }, {
                id: 6,
                label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                id: 7,
                label: '二级 3-1'
                }, {
                id: 8,
                label: '二级 3-2'
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
            rightNode:null
            
        }
    },
    created () {
        
    },
    mounted(){
        
    },
    methods:{
      showMenu () {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
      },
      newdata () {
        var that=this;
        this.$prompt('请输入添加内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const newChild = { id: that.id++, label: 'testtest', children: [] };
          if (!that.rightObj.children) {
            that.$set(that.rightObj, 'children', []);
          }
          that.rightObj.children.push(newChild);
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
      savedata () {
        var that=this;
      	this.$prompt('请输入修改内容', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          const newChild = { id: that.rightObj.id, label: value};
          const parent = that.rightNode.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === that.rightObj.id);
          children.splice(index, 1,newChild);
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
      deletedata () {
        var that=this;
        this.$confirm('此操作将永久删除该项内容, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(({ value }) => {
          const parent = that.rightNode.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === that.rightObj.id);
          children.splice(index, 1);
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
        
      },
      rightButton (event,obj,node,data) {
          event.cancelBubble = true;
        this.rightObj=obj;
        this.rightNode=node;
      }
    },
    components: {
        "v-goBack":goBack
    }
}
</script>
<style scoped>
.dataManagement-content{

}
</style>