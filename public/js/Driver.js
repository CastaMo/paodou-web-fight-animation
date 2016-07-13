var Driver;

Driver = (function() {

	'use strict'

	function Driver(options) {
		this.assign(options);
		this.init();
	}

	Driver.prototype = {

		constructor: Driver,

		assign: function(options) {
			this.self 			= options.self;
			this.opponent 	= options.opponent;
			this.msg 				= options.msg;
		},

		init: function() {
			this.initPrepare();
		},

		initPrepare: function() {
			this.contents = [];
		},

		readData: function(datas) {
			this.self.readData(datas.self);
			this.opponent.readData(datas.opponent);
			this.msg.readData(datas.msg);

			this.contents = datas.contents;
		},

		playNext: function(msgAnimation) {
			var self 			= this,
					content 	= this.contents.shift();
			msgAnimation();
			setTimeout(function() {
				var target 			= content.target,
						value 			= content.value,
						newHP 			=	self[target].currentHP - value;
				if (value === 0) {
					self[target].playEvade();
				} else {
					if (newHP <= 0) {
						self[target].playLose();
						self[target].setCurrentHP(0);
					} else {
						self[target].playInjured();
						self[target].setCurrentHP(newHP);
					}
				}
				setTimeout(function() {
					self.playCallback();
				}, 1000 + 500);
			}, 500);
		},

		playCallback: function() {
			var self = this;
			if (this.contents.length > 0) {
				this.playNext(function() {
					self.msg.playNext();
				});
			} else if (this.contents.length === 0) {
				return;
			}
		},

		play: function() {
			var self = this;
			setTimeout(function() {
				self.playNext(function() {
					self.msg.playStart()
				});
			}, 1000);
		}

	};

	return Driver;

})();