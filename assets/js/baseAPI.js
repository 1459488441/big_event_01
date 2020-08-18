//拦截所有的ajax请求: get/post/ajax;
var baseURL = 'http://ajax.frontend.itheima.net';
//  处理参数
$.ajaxPrefilter(function (params) {
    //拼接服务器地址
    params.url = baseURL + params.url;
    alert(params.url);
})
