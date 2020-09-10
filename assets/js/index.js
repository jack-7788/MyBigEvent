$(function () {
  // 获取用户信息
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (res) {
      console.log(res);
      // 认证失败
      if (res.status === 1) {
        // layui.layer.msg(
        //   res.message,
        //   {
        //     // icon: 1,
        //     time: 3000, //2秒关闭（如果不配置，默认是3秒）
        //   },
        //   function () {
        //     window.location.href = "../../login4.0.html";
        //   }
        // );

        layui.layer.open({
          content: res.message,
          yes: function (index, layero) {
            // window.localStorage.setItem("token");
            window.location.href = "../../login4.0.html";
          },
        });
      }
      // console.log(res.data.username[0]. );
      if (res.data.user_pic) {
        $(".layui-nav-img").attr("src", res.user_pic).show();
        $(".text-avatar").hide();
      } else {
        // var uname = res.data.username[0].toUppercase;
        // console.log(uname);
        var uname = res.data.nickname || res.data.username;
        console.log(uname);
        $(".layui-nav-img").hide();
        $(".text-avatar").show().text(uname[0].toUpperCase());
      }
      $(".text-avatar")
        .next()
        .text("欢迎" + res.data.username);
    },
  });
  // 退出按钮
  $("#tuichu").on("click", function () {
    // alert(11);
    layui.layer.confirm("确定要退出吗？", { icon: 3, title: "提示" }, function (
      index
    ) {
      window.localStorage.removeItem("token");
      window.location.href = "../../login4.0.html";
    });
  });
});
