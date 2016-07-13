var Player;

Player = (function() {

	'use strict'

	function Player(options) {
		this.assign(options);
		this.init();
	}

	Player.prototype = {
		constructor: Player,

		assign: function(options) {
			this.$el 				= $(options.elCSSSelector);
		},

		init: function() {
			this.initPrepare();
		},

		initPrepare: function() {
			this.avaterBaseClass 	= "avater animated";
			this.nameDom 				= this.$el.find(".name-field p.name");
			this.lvDom 					= this.$el.find(".LV-field p");
			this.currentHPDom 	= this.$el.find("span.current-HP");
			this.maxHPDom 			= this.$el.find("span.max-HP");
			this.HPInnerBarDom 	= this.$el.find(".HP-background-field .inner-bar");
			this.avaterDom 			= this.$el.find(".avater-field .avater");
		},

		readData: function(data) {
			this.setName(data.name);
			this.setMaxHP(data.maxHP);
			this.setCurrentHP(data.maxHP);
			this.setLv(data.lv);
			this.setAvater(data.url);
		},

		setCurrentHP: function(HP) {
			var HPBarWidth;
			this.currentHP = HP;
			this.currentHPDom.html(HP);

			HPBarWidth = (this.currentHP / this.maxHP) * 110;
			this.HPInnerBarDom.css({
				"width" 	: 	HPBarWidth + "px"
			});
		},

		setMaxHP: function(HP) {
			this.maxHP = HP;
			this.maxHPDom.html(HP);
		},

		setLv: function(lv) {
			this.lv = lv;
			this.lvDom.html("Lv."+lv);
		},

		setName: function(name) {
			this.name = name;
			this.nameDom.html(name);
		},

		setAvater: function(avater) {
			this.avaterURL = avater;
			if (this.avaterURL) {
				this.avaterDom.css({
					"background-image": "url(" + this.avaterURL + ")"
				});
			}
		},

		playLose: function() {
			var self = this;
			this.avaterDom.attr({
				"class": this.avaterBaseClass
			});
			setTimeout(function() {
				self.avaterDom.attr({
					"class": self.avaterBaseClass + " hinge"
				});
			}, 100);
		},

		playEvade: function() {
			var self = this;
			this.avaterDom.attr({
				"class": this.avaterBaseClass
			});
			setTimeout(function() {
				self.avaterDom.attr({
					"class": self.avaterBaseClass + " tada"
				});
			}, 100);
		},

		playInjured: function() {
			var self = this;
			this.avaterDom.attr({
				"class": this.avaterBaseClass
			});
			setTimeout(function() {
				self.avaterDom.attr({
					"class": self.avaterBaseClass + " bounce"
				});
			}, 100);
		}
	};

	return Player;

})();