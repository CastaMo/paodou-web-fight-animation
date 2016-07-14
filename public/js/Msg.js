var Msg;
Msg = (function () {

	'use strict'

	var colorArr,
			animationArr;

	colorArr = [
		"#1F8DD6",
		"#FBB44C",
		"#FC797A",
		"#2ABB9B",
		"#FF9672"
	];

	animationArr = [
		{
			"in" 	: 	"zoomInRight",
			"out" : 	"zoomOutLeft"
		},
		{
			"in" 	: 	"rotateInDownRight",
			"out" : 	"rotateOutDownRight"
		},
		{
			"in" 	: 	"fadeInRight",
			"out" : 	"fadeOutLeft"
		},
		{
			"in" 	: 	"bounceInRight",
			"out" : 	"bounceOutLeft"
		}
	]

	var COLOR_ARR_LENTH 			= 5,
			ANIMATION_ARR_LENGHT 	= 4;

	function sortForColorArr() {
		for (var i = 0; i < COLOR_ARR_LENTH; i++) {
			colorArr.sort(function(){return Math.random() > 0.5});
		}
	}

	function Msg(options) {
		this.assign(options);
		this.init(options);
	};

	Msg.prototype = {

		constructor: Msg,

		assign: function(options) {
			this.$el = $(options.elCSSSelector);
		},

		init: function() {
			this.initPrepare();
		},

		initPrepare: function() {
			this.msgDomQueue 	= [];
			this.msgBaseClass = "msg animated";
		},

		readData: function(data) {
			var msgs = data;

			sortForColorArr();

			this.$el.html("");
			this.msgDomQueue.length = [];

			for (var i = 0, len = msgs.length; i < len; i++) {
				var content = msgs[i],
						dom;
				dom = $("<li class='hide'><p class='total-center'>" + content + "</p></li>");
				dom.css({
					"background-color": colorArr[i % COLOR_ARR_LENTH]
				});
				this.$el.append(dom);
				this.msgDomQueue.push(dom);
			}
		},

		playStart: function() {
			if (this.isEnd()) {
				return;
			}
			var msg = this.msgDomQueue[0];
			msg.attr({
				"class" : this.msgBaseClass + " fadeIn"
			});
		},

		playNext: function() {
			if (this.isEnd()) {
				return;
			}
			var currentMsg 		= this.msgDomQueue.shift(),
					nextMsg	 			= this.msgDomQueue[0],
					randomIndex 	= Math.floor(Math.random() * ANIMATION_ARR_LENGHT),
					animationObj	= animationArr[randomIndex];
			this.playForDom(currentMsg, animationObj["out"]);
			if (nextMsg) {
				this.playForDom(nextMsg, animationObj["in"]);
			}

		},

		playForDom: function(dom, animation) {
			dom.attr({
				"class" : this.msgBaseClass + " " + animation
			});
		},

		isEnd: function() {
			return this.msgDomQueue.length === 0;
		}

	};

	return Msg;

})();