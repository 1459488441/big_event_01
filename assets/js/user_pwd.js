$(function () {

    var form = layui.form;
    form.verify({
        //1. 密码
        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-12位,且不能有空格"
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新密码不能喝旧密码相同!"
            }
        },
        reePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入的不一致!"
            }
        },
    })

    // 2.表单提交
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("密码修改成功");
                $(".layui-form")[0].reset();
            }
        })
    })

    // $(".layui-form").on('submit',function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         method: "post",
    //         url: "/my/updatepwd",
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             if (res.status !== 0) {
    //                 return layui.layer.msg(res.message);
    //             }
    //             layui.layer.msg("密码修改成功!");
    //             $(".layui-form")[0].reset();
    //         }
    //     })
    // })







})