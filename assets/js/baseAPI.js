//拦截所有的ajax请求: get/post/ajax;
var baseURL = 'http://ajax.frontend.itheima.net';
//  处理参数
$.ajaxPrefilter(function (params) {
    //1. 拼接服务器地址
    params.url = baseURL + params.url;
    // alert(params.url);

    //2. 对需要权限的接口配置头信息
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    //3. 拦截所有响应,判断身份认证信息
    params.complete = function (res) {
        console.log(res);
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            3.1//清空本地存储的内容
            localStorage.removeItem("token");
            3.2//跳转到login.html
            location.href = "login.html";
        }
    }
})
