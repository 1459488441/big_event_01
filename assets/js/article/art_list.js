$(function () {
    //在 art-template 定义时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        var dt = new Date(date);

        var y = dt.getFullYear();
        var m = porest(dt.getMonth() + 1);
        var d = porest(dt.getDate());

        var hh = porest(dt.getHours());
        var mm = porest(dt.getMinutes());
        var ss = porest(dt.getSeconds());

        function porest(n) {
            return n < 10 ? '0' + n : n;
        }

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    var layer = layui.layer;
    var form = layui.form;

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    };
    var layer = layui.layer;
    initTable()
    //封装初始化文章列表
    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                var str = template('tpl-art-list', res);
                $('tbody').html(str);
                //分页
                renderPage(res.total)
            }
        })
    }

    initCate();
    // 3.封装筛选区域函数
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl-cate', res)
                $("[name=cate_id]").html(str)
                form.render()
            }
        })
    }

    //4.筛选功能
    $("#form-search").on('submit', function (e) {
        e.preventDefault();
        //获取
        var state = $("[name=state]").val();
        var cate_id = $("[name=cate_id]").val();
        // console.log(cate_id);
        //赋值
        q.state = state;
        q.cate_id = cate_id;
        //初始化文章列表
        initTable()
    })

    //5.分页
    var laypage = layui.laypage;
    function renderPage(num) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: num,  //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr, obj.limit, first); //得到当前页，以便向服务端请求对应页的数据。得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    initTable()
                    //do something
                }
            }
        });
    }

    //6.删除文章
    $("tbody").on('click', ".btn-delite", function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                //do something
                $.ajax({
                    method: "GET",
                    url: "/my/article/delete/" + id,
                    success: function (res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        layer.msg("删除成功!")
                        //当当前页面按钮长度等于1 并大于1时 q.pagenum - 1,如果不大于1,就意味着这有一个了,那就不能再-1了
                        if ($('.btn-delite').length === 1 && q.pagenum > 1) q.pagenum - 1;
                            initTable()
                    }
                })
                layer.close(index);
            });
    })
});