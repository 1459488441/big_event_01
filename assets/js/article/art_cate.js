$(function () {

    initArtCateList();
    // 1.询问框渲染
    var form = layui.form;
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                var str = template("tpl-art-cate", res);
                $("tbody").html(str);
            }
        })
    }
    // 2.添加文章分类
    var layer = layui.layer;
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px']
            , content: $("#dialog-add").html()
        });


    })

    //3.提交文章分类
    var indexAdd = null;
    $("body").on('submit', "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("添加文章分类失败!")
                }
                initArtCateList()
                layer.msg("添加文章分类成功!")
                layer.close(indexAdd)
            }
        })
    })

    // 4.修改文章分类
    var indexEdit = null;
    $("tbody").on('click', ".btn-edit", function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px']
            , content: $("#dialog-eiad").html()
        });

        var id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function (res) {
                form.val("form-eiad", res.data)
            }
        })
    })

    //5.渲染修改内容
    $("body").on('submit', "#form-eiad", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg("文章分类更新成功!")
                layer.close(indexEdit)
            }
        })
    })

    //6.删除文章分类
    $("tbody").on('click', ".btn-delite", function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.confirm('确认修改?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    method: "GET",
                    url: "/my/article/deletecate/" + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        initArtCateList()
                        layer.msg(res.message)
                        layer.close(index);
                    }
                })
            });
    })
})