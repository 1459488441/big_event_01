$(function () {
    //1.自定义验证规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6位之间"
            }
        }
    })

    // 2.用户渲染
    initUserInfo();
    // 2.1到处layer
    var layer = layui.layer;
    // 2.2封装渲染函数
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功后,渲染
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 3.重置
    $("#btnReset").on('click', function (e) {
        //3.1阻止表单默认行为
        e.preventDefault();
        //3.2重置
        initUserInfo();
    })


    // 4.修改用户信息
    $(".layui-form").submit(function (e) {
         //4.1阻止表单默认行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功
                layer.msg("恭喜您,修改用户信息成功");
                //调用父框架的全局方法
                window.parent.getUserInof();
            }
        })
    })



})