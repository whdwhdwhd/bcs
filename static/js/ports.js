var totalPort={
    // port:"http://19811k2o66.51mypc.cn/ojee-bg-web",  //端口1  vpn
    port:"http://121.42.145.242/ojee-bg-web",  //端口2
    //职位列表请求
    getCheckList:function(){return this.port+"/position/list/getCheckList.htm"},
    // getCheckList:function(){return "/api/ojee-bg-web/position/list/getCheckList.htm"},
    //职位详情
    getPosInfo:function(){return this.port+"/position/info/getPosInfo.htm"},
    // getPosInfo:function(){return "/api/position/info/getPosInfo.htm"},
    //职位审核确认
    subCheck:function(){return this.port+"/position/info/check.htm"},
    // postAuditSubPort:function(){return "/api/position/info/check.htm"},
    //更新职业信息
    updatePosInfo:function(){return this.port+"/position/info/updatePosInfo.htm"},
     
    //获取详细的会员信息
    getCddInfo:function(){return this.port+"/cdd/info/getCddInfo.htm"},
    //添加会员信息
    addCddInfo:function(){return this.port+"/cdd/info/addCddInfo.htm"},
    //更新会员信息
    updateCddInfo:function(){return this.port+"/cdd/info/updateCddInfo.htm"},
    
    //获取语言
    getLanguageInfoById:function(){return this.port+"/cdd/info/getLanguageInfoById.htm"},
    //删除语言
    deleteLanguageInfo:function(){return this.port+"/cdd/info/deleteLanguageInfo.htm"},
    //更新语言
    updateLanguageInfoById:function(){return this.port+"/cdd/info/updateLanguageInfoById.htm"},
    //添加语言
    addLanguageInfo:function(){return this.port+"/cdd/info/addLanguageInfo.htm"},

    //添加某段工作经历或经历中的某些信息
    addWorkExp:function(){return this.port+"/cdd/info/addWorkExp.htm"},
    //更新某段工作经历
    updateWorkExp:function(){return this.port+"/cdd/info/updateWorkExp.htm"},
    //删除某段工作经历
    deleteWorkExp:function(){return this.port+"/cdd/info/deleteWorkExp.htm"},

    //获取某段教育经历
    getEduExpById:function(){return this.port+"/cdd/info/getEduExpById.htm"},
    //添加某段教育经历
    addEduExp:function(){return this.port+"/cdd/info/addEduExp.htm"},
    //删除某段教育经历
    deleteEduExp:function(){return this.port+"/cdd/info/deleteEduExp.htm"},
    //更新某段教育经历
    updateEduExp:function(){return this.port+"/cdd/info/updateEduExp.htm"},

    //获取某个孩子信息
    getChildInfoById:function(){return this.port+"/cdd/info/getChildInfoById.htm"},
    //删除某个孩子
    deleteChildInfo:function(){return this.port+"/cdd/info/deleteChildInfo.htm"},
    //更新某个孩子
    updateChildInfoById:function(){return this.port+"/cdd/info/updateChildInfoById.htm"},
    //添加某个孩子
    addChildInfo:function(){return this.port+"/cdd/info/addChildInfo.htm"},
    
    //系统配置
    getDataList:function(){return this.port+"/system/getDataList.htm"},
    //获取数据项信息
    getDataInfo:function(){return this.port+"/system/getDataInfo.htm"},
    //删除数据
    deleteDataInfo:function(){return this.port+"/system/deleteDataInfo.htm"},
    //更新数据
    updateDataInfo:function(){return this.port+"/system/updateDataInfo.htm"},
    //添加数据
    addDataInfo:function(){return this.port+"/system/addDataInfo.htm"},
    //调整排序
    chgOrder:function(){return this.port+"/system/chgOrder.htm"},

    //获取人选列表
    getUserList:function(){return this.port+"/wx/user/getUserList.htm"},
    //获取人选数量
    getCheckCnt:function(){return this.port+"/wx/user/getCheckCnt.htm"},
    //获取人选数量概要
    getCheckSummary:function(){return this.port+"/wx/user/getCheckSummary.htm"},
    //审核
    setStatus:function(){return this.port+"/wx/user/setStatus.htm"},
    
}