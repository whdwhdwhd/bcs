import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/views/login';
import Pages from '@/components/views/pages';
import Persona from '@/components/views/persona';
import Welcome from '@/components/views/welcome';
import ToAudit from '@/components/views/toAudit/toAudit';
import ToAuditDetails from '@/components/views/toAudit/toAuditDetails';
import Consult from '@/components/views/consult/consult';
import ConsultDetails from '@/components/views/consult/consultDetails';
import PostAudit from '@/components/views/postAudit/postAudit';
import PostAuditDetails from '@/components/views/postAudit/postAuditDetails';
import Post from '@/components/views/post/post';
import PostDetails from '@/components/views/post/postDetails';
import DataManagement from '@/components/views/dataManagement';

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/login'},
    {path: '/login',component: Login},
    {path: '/pages',
       component: Pages,
       children:[
          {path:'',redirect:'welcome'},
          {path: 'welcome',component: Welcome},
          {path: 'persona',component: Persona,name: '个人信息',jurisdiction:"1"},
          {path: 'toAudit', component: ToAudit, name: '会员审核',jurisdiction:"1"},
          {path: 'toAuditDetails', component: ToAuditDetails},
          {path: 'consult', component: Consult, name: '用户咨询',jurisdiction:"1"},
          {path: 'consultDetails', component: ConsultDetails},
          {path: 'postAudit', component: PostAudit, name: '职位审核',jurisdiction:"1"},
          {path: 'postAuditDetails', component: PostAuditDetails},
          {path: 'post', component: Post, name: '职位列表',jurisdiction:"2"},
          {path: 'postDetails', component: PostDetails},
          {path: 'dataManagement', component: DataManagement, name: '数据配置',jurisdiction:"1"}
       ]
    }
    
  ]
})
