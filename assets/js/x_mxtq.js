/*
var mxtq_js = document.createElement('script');
mxtq_js.src = "http://x1.t.fastbee.cn/assets/js/x_mxtq.js";
document.getElementsByTagName('head')[0].appendChild(mxtq_js);

var x_mxtq_job_ctl = x_mxtq_order_users(55696,60000);  // create job
x_mxtq_job_ctl.start_job(60001,70000); // start job
x_mxtq_job_ctl.stop_job();  // stop job

// test id: [52389, 52390] [53761, 54576] [55556]
// test data
var user_a = {
  qq:'40032363',
  phone:'0717-7531779',
  name:'荣辉',
  addr:'宜昌市夷陵区松湖路13号',
  weibo:'ronghui86',
  wechat:'ronghui_cn',
  alipay:'yangrh001@gmail.com',
  tbnick:'jester001',
  nicks:'ronghui_cn,ronghui_hz,jester,yangrh'
};
var user_b = {
  mail:'yangrh@qq.com',
  phone:'0717-7531779',
  name:'杨荣辉',
  addr:'宜昌市夷陵区松湖路13号',
  weibo:'ronghui86',
  wechat:'ronghui_hz',
  alipay:'yangrh001@gmail.com',
  tbnick:'jester001',
  nicks:'ronghui_hz'
};
var user_c = {
  qq:'485100888',
  mail:'fastbee@qq.com',
  mobile:'18071910161',
  phone:'0717-7531779',
  name:'小蜜蜂',
  addr:'宜昌市夷陵区松湖路13号',
  weibo:'ronghui86',
  wechat:'fastbee_cn',
  alipay:'fastbee@qq.com',
  tbnick:'小蜜蜂cn',
  nicks:'fastbee'
};
var user_d = {
  qq:'40032363',
  mail:'yangrh@qq.com',
  mobile:'18657161326',
  phone:'0717-7531779',
  name:'荣辉',
  addr:'宜昌市夷陵区松湖路13号',
  weibo:'ronghui86',
  wechat:'ronghui_cn',
  alipay:'yangrh001@gmail.com',
  tbnick:'奇宝书屋',
  nicks:'ronghui_hz'
};
*/

var x_mxtq_order_users = function(start, end){
  console.log('[x_mxtq]order_users: ' + start + ', ' + end);

  var _start = start;
  var _end = end;
  var _cur = _start - 1;
  var _success = 0;
  var _fail = 0;
  var _timeout = 0;
  var _timer_getout = null; //闭包跳出后调度下一个job的timer
  var _timer_job = null;    //防job超时timer,以保job超时可以继续下一个job
  var _stop_job = false;

  var report_log = function(){
    var x_url = "http://x1.t.fastbee.cn/index.php/user/api/log";
    var log = {'event':'mxtq_user','start':_start, 'end':_end, 'stop':_cur, 'success':_success, 'fail':_fail, 'timeout':_timeout};
    console.log('[x_mxtq]report_log success:' + _success + ', fail:' + _fail + ', timeout:' + _timeout);
    jQuery.ajax({url:x_url, dataType:'jsonp', data:log, success:function(data){
      console.log('[x_mxtq]report_log result:' + data.ret + ', msg:' + data.msg);
    }});
  }

  var save_user = function(user){
    console.log('[x_mxtq]save_user name:' + user.name + ', nick:' + user.tbnick);

    var x_url = "http://x1.t.fastbee.cn/index.php/user/api/save";
    jQuery.ajax({url:x_url, dataType:'jsonp', data:user, success:function(data){
      console.log('[x_mxtq]save_user result:' + data.ret + ', msg:' + data.msg);

      if (data.ret) {
        _success++;
      } else {
        _fail++
      }

      // 利用timer在闭包返回后调度下一个job
      if (_timer_getout == null){
        _timer_getout = setTimeout(function(){
          _timer_getout = null;
          console.log('[x_mxtq]get out of closure to next job');

          next_job(); // 调度下一个job
        }, 100);
      }

      return;
    }});

    return;
  }

  var order_user = function(oid) {
    console.log('[x_mxtq]order_user:' + oid);
    var mxtq_url = 'http://mxtq.tg.taoex.com/index.php/index.php?app=ome&ctl=admin_order&act=active&action=detail&finderview=detail_basic&finder_name=ae731e&id=' + oid;
    jQuery.post(mxtq_url, function(data){
      var order_dom = jQuery(data);
      var tbnick = jQuery('table.orderdetails_basic td:eq(23)', order_dom).text();
      var mail = jQuery('table.orderdetails_basic td:eq(27)', order_dom).text();
      var name = jQuery('table.orderdetails_basic td:eq(30)', order_dom).text();
      var phone = jQuery('table.orderdetails_basic td:eq(31)', order_dom).text();
      var mobile = jQuery('table.orderdetails_basic td:eq(32)', order_dom).text();
      var area = jQuery('table.orderdetails_basic td:eq(33)', order_dom).text();
      var addr = area + jQuery('table.orderdetails_basic td:eq(34)', order_dom).text();
      if (mobile.length == 0) {
        mobile = phone;
      }

      console.log('[x_mxtq]order_user get name:' + name + ', nick:' + tbnick);
      save_user({'tbnick':tbnick, 'mail':mail, 'name':name, 'phone':phone, 'mobile':mobile, 'addr':addr, 'order':oid});
    })
  }

  // job被调度时机: 1.start_job, 2.job超时, 3.job完成时跳出闭包后
  var next_job = function(){
    if (_timer_job != null){
      clearTimeout(_timer_job);
      _timer_job = null;
    }

    _cur++;
    if (_cur < _start || _cur > _end || _stop_job) {
      if (_timer_job != null){
        clearTimeout(_timer_job);
        _timer_job = null;
      }
      if (_timer_getout != null){
        clearTimeout(_timer_getout);
        _timer_getout = null;
      }
      report_log();
      return;
    }

    console.log('[x_mxtq]next_job:' + _cur);
    order_user(_cur); //开始本次job
    
    // 启动job超时监测
    _timer_job = setTimeout(function(){
      _timer_job = null;
      console.log('[x_mxtq]job timeout:' + _cur);

      _timeout++;
      next_job(); // 超时后发起下一个job
      return ;
    }, 5000);

    return ;
  }

  var start_job = function(start, end){
    if (undefined != start){
      _start = start;
    }
    if (undefined != end){
      _end = end
    }
    _cur = _start - 1;

    console.log('[x_mxtq]start_job @' + _cur);
    _stop_job = false;
    next_job(); //发起第一个job
  }
  var stop_job = function(){
    console.log('[x_mxtq]stop_job @' + _cur);
    _stop_job = true;
  }

  start_job(_start, _end);

  return {'start_job':start_job, 'stop_job':stop_job};
}

//jquery init
console.log('[x_mxtq]i am loaded.');
var jq_js = document.createElement('script');
jq_js.src = "http://x1.t.fastbee.cn/assets/js/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq_js);

setTimeout(function(){
  console.log('[x_mxtq]jquery loaded.');
  jQuery.noConflict();
},500);