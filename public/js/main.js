;(function(win, doc, undefined) {
	'use strict'

	var fightInfo = [
		"{attacker} 把 {victim} 举起来并丢出去",
		"{attacker} 举起雷神之锤, 一道闪电劈中 {victim}",
		"{attacker} 放出了旺财, 咬伤了 {victim}的屁股",
		"{victim} 被 {attacker} 的美貌迷惑, 不经意摔了一跤",
		"{attacker} 发动色诱之术, {victim} 鼻血大泄",
		"{victim} 欲要偷袭 {attacker}, 不料被对方一脚绊倒",
		"{victim} 举起一块大石头正要砸向 {attacker}, 不料砸中了自己",
		"{attacker} 对着天空大吼一声, {victim} 被吓得尿裤子了"
	]

	var FIGHT_INFO_LEN = fightInfo.length;

	var self,
			opponent,
			msg,
			driver;

	self 				= new Player({
		elCSSSelector 	: 	"#basic-info .self"
	});

	opponent 		= new Player({
		elCSSSelector 	: 	"#basic-info .opponent"
	});

	msg 				= new Msg({
		elCSSSelector 	: 	"#basic-info .msg-field ul.msg-list"
	});


	//通过依赖注入实现控制反转
	driver 			= new Driver({
		self 						: 	self,
		opponent 				: 	opponent,
		msg 						: 	msg
	});

	var init = win.init = function(testOptions) {
		var processList = testOptions.processList;
		var msg 			= [],
				contents 	= [];
		for (var i = 0, len = processList.length; i < len; i++) {
			var process = processList[i],
					target 	= process.attacker === 0 ? "opponent" : "self",
					attacker= process.attacker === 0 ? "self" : "opponent",
					type 		= process.type,
					value 	= type === 0 ? process.demage : (type === 1 ? process.demage * 2 : 0),
					random 	= process.random || Math.floor(Math.random() * FIGHT_INFO_LEN);

			var fight 	= fightInfo[random];
			if (type === 2) {
				fight += ", 但" + testOptions[target].name + "避开了。";
			} else if (type === 1) {
				fight += ", " + testOptions[target].name + "受到了" + value + "点的暴击伤害";
			} else {
				fight += ", " + testOptions[target].name + "受到了" + value + "点的伤害";
			}
			fight = fight.replace("{attacker}", testOptions[attacker].name);
			fight = fight.replace("{victim}", testOptions[target].name);
			msg.push(fight);
			contents.push({
				target 	: target,
				value 	: value
			});
		}
		testOptions.msg = msg;
		testOptions.contents = contents;
		driver.readData(testOptions);
		driver.play();
	}
	var a;
	if (a = location.search.replace("?data=", "")) {
		try {
			init(JSON.parse(decodeURI(a)));
		} catch(e) {
			alert("参数出错");
		}
	}

})(window, document);