$(function () {
    var layer = layui.layer;
    var form = layui.form;

    //初始化分类 
    initPub()
    function initPub() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-oub', res);
                $("[name=cate_id]").html(str);
                form.render();
            }
        })

    }

    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 4.上传功能
    $("#btnImg").on('click', function () {
        $("#coverFlie").click();
    })
    // 5.更换裁剪的图片
    $('#coverFlie').on('change', function (e) {
        // 拿到用户选择的文件
        var file = e.target.files[0]
        // 非空效验
        if (file === undefined) {
            return
        }
        // 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 6.
    var state = "已发布";
    $("#btnSave2").on('click', function () {
        state = "草稿";
    })
    console.log(state);

    //7.渲染发布页面
    $("#form-pub").on('submit', function (e) {
        e.preventDefault();

        var fb = new FormData(this)
        fb.append('state', state);

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fb.append('cover_img', blob)

                // console.log(...fb);
                pubListarte(fb);
            })
    })
    // 封装,添加文章的方法
    function pubListarte(fb) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fb,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                //跳转
                // location.href = '/article/art_list.html'
                setTimeout(function () {
                    window.parent.document.getElementById('art_list').click();
                },1500)
            }
        })
        
    }
})