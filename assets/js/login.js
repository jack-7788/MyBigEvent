$(function () {
  $("#goRes").on("click", function () {
    $(".layui-reg").show();
    $(".layui-login").hide();
  });
  $("#goLogin").on("click", function () {
    $(".layui-reg").hide();
    $(".layui-login").show();
  });
  // $("#btn_login").on("click", function (e) {
  //   e.preventDefault();
  // });

  layui.form.verify({
    /*    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return "用户名不能有特殊字符";
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return "用户名首尾不能出现下划线'_'";
      }
      if (/^\d+\d+\d$/.test(value)) {
        return "用户名不能全为数字";
      }
    }, */

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    name: [/^[\S]{6,}$/, "用户名最少6位，且不能出现空格"],
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value, item) {
      if ($(".layui-reg input[name = password]").val() !== value) {
        // 两次密码不一样清空密码框
        $(".layui-reg input[name = password]").val("");
        $(".layui-reg input[name = repassword]").val("");
        return "两次密码不一样";
      }
    },
  });
  // ajax 发送请求注册请求
  $(".layui-reg").on("submit", function (e) {
    e.preventDefault();
    var formdata = {
      username: $(".layui-reg #username").val(),
      password: $(".layui-reg #username").val(),
    };
    $.post("http://ajax.frontend.itheima.net/api/reguser", formdata, function (
      res
    ) {
      // console.log(res);
      if (res.status === 0) {
        layer.msg(res.message);
        // window.location.href = "/index.html";
      } else {
        layer.msg(res.message);
      }
    });
  });
  // ajax 发送登录请求
  $(".layui-login").on("submit", function (e) {
    e.preventDefault();
    var formdata = {
      username: $(".layui-login input[name=title]").val(),
      password: $(".layui-login input[name=password]").val(),
    };
    // console.log(formdata);
    $.post("http://ajax.frontend.itheima.net/api/login", formdata, function (
      res
    ) {
      // console.log(res);
      if (res.status === 0) {
        layer.msg(res.message);
      } else {
        layer.msg(res.message);
      }
    });
  });
});
