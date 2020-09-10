$(function () {
  // 点击切换效果
  $("#goLogin").on("click", function () {
    $(this).parents("form").hide();
    $("#goReg").parents("form").show();
  });
  $("#goReg").on("click", function () {
    $(this).parents("form").hide();
    $("#goLogin").parents("form").show();
  });
  // 设置表单规则

  layui.form.verify({
    username: function (value, item) {
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
    },

    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repass: function (value, item) {
      if ($(".reg-form input[name=password]").val() !== value) {
        return "两次密码不一样";
      }
    },
  });
  // 注册事件
  $(".reg-form").on("submit", function (e) {
    e.preventDefault();
    // var data = new FormData($(".reg-form")[0]);
    var data = $(this).serialize();
    console.log(data);
    $.post("/api/reguser", data, function (res) {
      console.log(res);

      if (res.status === 0) {
        // layer.open({
        //   // title: '在线调试'
        //   content: res.message,
        // });
        layui.layer.msg(res.message);
        // 表单重置
        $(".reg-form")[0].reset();

        // 注册成功后跳转到登录页面
        $("#goLogin").click();

        // return res.message;
      } else {
        layui.layer.msg(res.message);

        // layer.open({
        //   // title: '在线调试'
        //   content: res.message,
        // });
      }
    });
  });
  // 登录事件
  $(".login-form").on("submit", function (e) {
    e.preventDefault();
    // var data = new FormData($("#myForm")[0]);
    // var data = new FormData($(".login-form")[0]);
    var data = $(this).serialize();
    console.log(data);
    $.ajax({
      type: "post",
      url: "/api/login",
      data: data,
      // processData: false,
      // contentType: false,
      success: function (res) {
        // console.log(res);
        if (res.status === 0) {
          // alert(res.message);
          layui.layer.open({
            content: res.message,
            yes: function (index, layero) {
              //do something
              // layer.close(index);
              //如果设定了yes回调，需进行手工关闭
              window.localStorage.setItem("token", res.token);
              window.location.href = "../../index.html";
            },
          });
        } else {
          layui.layer.open({
            content: res.message,
            error: function (index, layero) {
              //do something
              // layer.close(index);
              //如果设定了yes回调，需进行手工关闭
              // window.localStorage.setItem("token", res.token);
              // window.location.href = "../../index.html";
            },
          });
        }
      },
    });
  });
});
