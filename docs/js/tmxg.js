var settings = [
{'iid':'567242296054','qty':'1'},
{'iid':'632597866132','qty':'1'},
{'iid':'567408120702','qty':'1'},
{'iid':'610120259173','qty':'1'},
{'iid':'599810322571','qty':'1'},
{'iid':'569520095199','qty':'3'},
{'iid':'569748471346','qty':'3'},
{'iid':'569498181267','qty':'3'},
{'iid':'567817431643','qty':'3'},
{'iid':'567364109888','qty':'3'},
{'iid':'567345941716','qty':'5'},
{'iid':'567215740660','qty':'5'},
{'iid':'567732630884','qty':'5'},
{'iid':'567218340904','qty':'5'},
{'iid':'567534039717','qty':'5'},
{'iid':'567737714939','qty':'5'},
{'iid':'567826991046','qty':'5'},
{'iid':'616510255069','qty':'5'},
{'iid':'586374945185','qty':'5'},
{'iid':'569434146776','qty':'5'},
{'iid':'591402306432','qty':'5'},
{'iid':'605523339465','qty':'5'},
{'iid':'567737866540','qty':'5'},
{'iid':'567819979822','qty':'5'},
{'iid':'567528876564','qty':'5'},
{'iid':'567819335453','qty':'5'},
{'iid':'567815079441','qty':'5'},
{'iid':'567532988619','qty':'5'},
{'iid':'567645209520','qty':'5'},
{'iid':'567527729494','qty':'5'},
{'iid':'594477661074','qty':'5'},
{'iid':'567526052721','qty':'5'},
{'iid':'636842959155','qty':'5'},
{'iid':'586372425901','qty':'5'},
{'iid':'588864290404','qty':'5'},
{'iid':'586652963610','qty':'5'},
{'iid':'615218136547','qty':'5'},
{'iid':'634117700021','qty':'5'},
{'iid':'567526276822','qty':'5'},
{'iid':'567526152785','qty':'5'},
{'iid':'640807018550','qty':'5'},
{'iid':'567730982470','qty':'3'},
{'iid':'576001571226','qty':'3'},
{'iid':'575610768175','qty':'3'},
{'iid':'575986379321','qty':'3'},
{'iid':'642052838797','qty':'3'},
{'iid':'628429693535','qty':'3'},
{'iid':'610703890469','qty':'3'},
{'iid':'601638449983','qty':'3'},
{'iid':'567526928455','qty':'3'},
{'iid':'567853886864','qty':'3'},
{'iid':'567649473063','qty':'3'},
{'iid':'567282620286','qty':'3'},
{'iid':'567642509575','qty':'3'},
{'iid':'590204186186','qty':'3'},
{'iid':'583034072412','qty':'3'},
{'iid':'567733430141','qty':'3'},
{'iid':'600018342941','qty':'3'},
{'iid':'567913779663','qty':'3'},
{'iid':'578722467001','qty':'3'},
{'iid':'567739222097','qty':'3'},
{'iid':'567307812481','qty':'3'},
{'iid':'567528124713','qty':'3'},
{'iid':'567649965326','qty':'3'},
{'iid':'567821615005','qty':'3'},
{'iid':'567646049624','qty':'3'},
{'iid':'567736510770','qty':'3'},
{'iid':'640635957317','qty':'3'},
{'iid':'571213746892','qty':'3'},
{'iid':'567730898051','qty':'3'},
{'iid':'630275386043','qty':'3'},
{'iid':'567913087911','qty':'3'},
{'iid':'599081598239','qty':'3'},
{'iid':'567735378586','qty':'3'},
{'iid':'613925488838','qty':'2'},
{'iid':'615009105641','qty':'2'},
{'iid':'614748380323','qty':'2'},
{'iid':'567736098031','qty':'2'},
{'iid':'629952841924','qty':'2'},
{'iid':'631900076138','qty':'2'},
{'iid':'641999249412','qty':'2'},
{'iid':'610614153798','qty':'2'},
{'iid':'584861570892','qty':'2'},
{'iid':'583580267116','qty':'2'},
{'iid':'588623399424','qty':'2'},
{'iid':'588464694046','qty':'2'},
{'iid':'588464794392','qty':'2'},
{'iid':'570923744619','qty':'2'},
{'iid':'607536243038','qty':'2'},
{'iid':'592101982703','qty':'2'},
{'iid':'591021596778','qty':'2'},
{'iid':'567491306472','qty':'2'},
{'iid':'630278918309','qty':'2'},
{'iid':'628542986067','qty':'2'},
{'iid':'629958581260','qty':'2'},
{'iid':'567736706757','qty':'2'},
{'iid':'567828086761','qty':'2'},
{'iid':'640951607758','qty':'2'},
{'iid':'592692528344','qty':'2'},
{'iid':'574477125676','qty':'2'},
];

var jq = document.createElement('script');
jq.src = "https://libs.baidu.com/jquery/1.9.0/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
setTimeout("jQuery.noConflict();",1000);

(function(cfgs){
	jQuery.noConflict();

	var warn;
	for (var i=0; i < cfgs.length; i++) {
		xian = {"itemId":cfgs[i].iid,"rstId":"1","quantity":cfgs[i].qty,"from":"2021-07-14 00:50:00","to":"2021-07-16 23:59:59","rstRule":"1","ac":"1","immediate":"true","_tb_token_":"e73ee1eead740"};
		setTimeout(function(data){
			jQuery.post("https://yx.tmall.com/xg/edit.do?_input_charset=UTF-8", data, function(msg){console.log(msg)})
		}, 500, xian);
	}
	return 0;
})(settings);