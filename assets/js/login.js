//入口函数
$(function () {
    //1.注册点击隐藏去注册 显示去登录 事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 2.注册点击隐藏去登录 显示去注册 事件
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 3.自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则     /S是只能输入空格   \S除了空格都可以输入
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位,且不能输入空格"
        ],
        //密码确认规则
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return "两次密码输入的不一致"
            }
        }
    })
    var layer = layui.layer;
    //4.注册功能
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        //4.1发送ajaxa
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: function (res) {
                //4.2返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                //4.3判断成功后处理代码
                layer.msg("注册成功,请登录");
                //4.4模拟点击效果
                $('#link_login').click();
                //4.5清空注册登录表单
                $("#form_reg")[0].reset();
            }
        })
    })

    //5.登录功能 (给form_login表单绑定事件,给button按钮触发提交 事件)
    $("#form_login").submit(function (e) {
        //阻止表单提交
        e.preventDefault();
        //5.2发送ajax
        $.ajax({
            method: 'POST',
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                //5.3效验返回值
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //5.4提示信息登陆成功
                layer.msg("恭喜您,登录成功");
                //5.5保存token,未来的接口使用token
                localStorage.setItem("token", res.token);
                //5.6登录成功后跳转到index.html页面
                location.href = "/index.html";
            }
        })
    })
})