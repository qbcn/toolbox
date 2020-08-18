/*
var func_js = document.createElement('script');
func_js.src = "http://x1.t.fastbee.cn/assets/js/x_func.js";
document.getElementsByTagName('head')[0].appendChild(func_js);
*/

console.log('[x_func]i am loaded.');
var x_func_load_jq = function(){
  var jq_js = document.createElement('script');
  jq_js.src = "http://x1.t.fastbee.cn/assets/js/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq_js);
  setTimeout(function(){
    console.log('[x_func]jquery loaded');
    jQuery.noConflict();
    return;
  },500);
}

//比价&标记@tb.shuaishou.com
var x_func_price_diff = function(){
  var price_diff = function(r){
    var row_diff = function(row){
      var item_l = $('td:eq(3)', row);
      var item_r = $('td:eq(5)', row);
      var price_l = $('[name=itemPrice]', item_l).text();
      var price_r = $('[name=providerItemPrice]', item_r).text();
      var diff = price_l - price_r;
      if (diff < -3 || diff > 3){
        $('td:eq(2) img[name=providerItemPriceChangedImg]', row).show();
      }
    }

    if (undefined != r){
      row_diff(r);
      return;
    }
    var rows = $("#relatedItemDt tbody tr:visible");
    for (var i=1; i<rows.length; i++){
      row_diff($(rows[i]));
    }
  }

  $(function(){
    price_diff();
    $("#relatedItemDt tbody").bind('DOMNodeInserted', function(){
      price_diff($('tr:last', $(this)));
    });
  });
}
  
//分销订单导出@mxtq.tg.taoex.com
var x_func_export_mxtq_order = function(){
  x_func_load_jq();

  setTimeout(function(){
    console.log('[x_func]x_func_export_mxtq_order started');

    var items = jQuery('#workground #main .finder-list tr.row');
    var logs ='';
    for (var i=0; i<items.length; i++) {
      var item = jQuery(items[i]);
      var obn = item.children('td:eq(2)').children('div').text();
      var price = item.children('td:eq(4)').children('div').text().substr(1);
      var time = item.children('td:eq(14)').children('div').text();
      var log = obn + ',"' + price + '","' + time + '"\n';
      logs +=log;
    }
    console.log(logs);
    copy(logs);
    return;
  },1000);
}

//分享音频导出@pan.baidu.com
var x_func_export_mxtq_audio = function(){
  x_func_load_jq();

  setTimeout(function(){
    console.log('[x_func]x_func_export_mxtq_audio started');

    var items = jQuery('dd.file-item');
    var logs ='';
    for (var i=0; i<items.length; i++) {
      var item = jQuery(items[i]);
      var url = item.attr('_link');
      var title = item.children('div.file-col').attr('title');
      var time = $('div.time-col span', item).text();
      var log = 'title=' + title + ',url=' + url + ',time=' + time + '\n';
      logs +=log;
    }
    console.log(logs);
    copy(logs);
    return;
  },1000);
}