//1.入口函数
$(function () {
    //1.获取用户信息
    getUserInof();

})
//获取用户信息(封装到入口函数外面
//原因: 后面其他的页面也要调用)
function getUserInof() {
    //发送ajax
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     //重新登录,因为token过期时间12小时
        //     Authorization:
        //         localStorage.getItem("token") || ""
        // },
        success: function (res) {
            //判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            //请求成功,渲染用户头像信息
            // console.log(res);
            renderAvadta(res.data);
        }
    })
}
//封装用户头像渲染函数
function renderAvadta(user) {
    var name = user.nickname || user.username;
    $(".welcome").html(`欢迎  ${name}`);
    //2.用户头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr("src", user.user_pic);
        $(".user-avater").hide();
    } else {
        //没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $(".user-avater").show().html(text);
    }
}

//退出功能
$("#btnLogout").on('click', function () {
    //框架提供的询问框
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        //清空本地存储的内容
        localStorage.removeItem("token");
        //跳转到login.html
        location.href = "login.html";
        //关闭询问框
        layer.close(index);
      });
})
