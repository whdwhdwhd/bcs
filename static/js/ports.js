var totalPort={
    port:"http://19811k2o66.51mypc.cn/ojee-bg-web",  //端口1
    //职位列表请求
    // postAuditPort:function(){return this.port+"/position/list/getCheckList.htm"},
    postAuditPort:function(){return "/api/ojee-bg-web/position/list/getCheckList.htm"},
    //职位详情
    postAuditDetailsPort:function(){return this.port+"/position/info/getPosInfo.htm"},
    // postAuditDetailsPort:function(){return "/api/position/info/getPosInfo.htm"},
    //职位审核确认
    postAuditSubPort:function(){return this.port+"/position/info/check.htm"},
    // postAuditSubPort:function(){return "/api/position/info/check.htm"},
}