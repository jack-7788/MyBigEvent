$(function () {
  // 发送ajax之前进行拦截
  $.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    options.headers = {
      Authorization: window.localStorage.getItem("token"),
    };
  });
});
