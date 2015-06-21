(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'Test');
	////////////////////////////////////////////////////////////////////////////////
	// MyApp
	var $MyApp = function() {
		this.nomeutente = null;
	};
	$MyApp.__typeName = 'MyApp';
	global.MyApp = $MyApp;
	////////////////////////////////////////////////////////////////////////////////
	// MyElement
	var $MyElement = function() {
		this.mionome = null;
		this.aprop = null;
		ss.shallowCopy({}, this);
	};
	$MyElement.__typeName = 'MyElement';
	global.MyElement = $MyElement;
	////////////////////////////////////////////////////////////////////////////////
	// MyInput
	var $MyInput = function() {
		this.testo = null;
		ss.shallowCopy({}, this);
	};
	$MyInput.__typeName = 'MyInput';
	global.MyInput = $MyInput;
	////////////////////////////////////////////////////////////////////////////////
	// MyTimer
	var $MyTimer = function() {
		this.start = 0;
		this.count = 0;
		this.$timerHandle = 0;
		ss.shallowCopy({}, this);
	};
	$MyTimer.__typeName = 'MyTimer';
	global.MyTimer = $MyTimer;
	////////////////////////////////////////////////////////////////////////////////
	// Program
	var $Program = function() {
	};
	$Program.__typeName = 'Program';
	$Program.Main = function() {
		PolymerHelper.Register($MyElement).call(null);
		PolymerHelper.Register($MyInput).call(null);
		PolymerHelper.Register($MyApp).call(null);
		PolymerHelper.Register($MyTimer).call(null);
	};
	global.Program = $Program;
	ss.initClass($MyApp, $asm, {
		ready: function() {
			this.nomeutente = 'nino porcino il grande';
		}
	});
	ss.initClass($MyElement, $asm, {
		clicca: function() {
			$MyElement.static1++;
			$MyElement.static2++;
			this.mionome = ($MyElement.static1 + $MyElement.static2).toString();
		},
		osserva: function(newval, oldval) {
			//Window.Alert("adesso è "+newval);
		},
		ready: function() {
			//mionome="rwad";      
		}
	}, PolymerElement);
	ss.initClass($MyInput, $asm, {
		modificato: function() {
			this.testo = this.testo + 'a';
		}
	}, PolymerElement);
	ss.initClass($MyTimer, $asm, {
		ready: function() {
			this.count = this.start;
			this.$timerHandle = window.setInterval(ss.mkdel(this, function() {
				this.count++;
			}), 1000);
		},
		detatched: function() {
			window.clearInterval(this.$timerHandle);
		}
	}, PolymerElement);
	ss.initClass($Program, $asm, {});
	ss.setMetadata($MyApp, { attr: [new ComponentAttribute('my-app')], members: [{ attr: [(function() {
		var $t1 = new PropertyAttribute();
		$t1.notify = true;
		return $t1;
	})()], name: 'nomeutente', type: 4, returnType: String, sname: 'nomeutente' }] });
	ss.setMetadata($MyElement, { attr: [new ComponentAttribute('my-element')], members: [{ attr: [(function() {
		var $t1 = new PropertyAttribute();
		$t1.value = 'sessantaquattro';
		$t1.notify = true;
		$t1.reflectToAttribute = true;
		return $t1;
	})()], name: 'aprop', type: 4, returnType: String, sname: 'aprop' }] });
	ss.setMetadata($MyInput, { attr: [new ComponentAttribute('my-input')], members: [{ attr: [(function() {
		var $t1 = new PropertyAttribute();
		$t1.value = 'prova';
		$t1.notify = true;
		$t1.reflectToAttribute = true;
		return $t1;
	})()], name: 'testo', type: 4, returnType: String, sname: 'testo' }] });
	ss.setMetadata($MyTimer, { attr: [new ComponentAttribute('my-timer')], members: [{ attr: [(function() {
		var $t1 = new PropertyAttribute();
		$t1.value = 0;
		return $t1;
	})()], name: 'start', type: 4, returnType: ss.Int32, sname: 'start' }] });
	(function() {
		$MyElement.static1 = 54;
		$MyElement.static2 = 0;
		$MyElement.static2 = 66;
	})();
})();
