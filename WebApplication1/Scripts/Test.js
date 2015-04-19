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
	// Program
	var $Program = function() {
	};
	$Program.__typeName = 'Program';
	$Program.Mainx = function() {
		PolymerHelper.Register($MyElement).call(null);
		PolymerHelper.Register($MyInput).call(null);
		PolymerHelper.Register($MyApp).call(null);
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
		created: function() {
			// this.super();
		}
	}, PolymerElement);
	ss.initClass($Program, $asm, {});
	ss.setMetadata($MyApp, { attr: [new CustomTagAttribute('my-app')], members: [{ attr: [(function() {
		var $t1 = new PublishedAttribute();
		$t1.notify = true;
		return $t1;
	})()], name: 'nomeutente', type: 4, returnType: String, sname: 'nomeutente' }] });
	ss.setMetadata($MyElement, { attr: [new CustomTagAttribute('my-element')], members: [{ attr: [(function() {
		var $t1 = new PublishedAttribute();
		$t1.value = 'sessantaquattro';
		$t1.observer = 'osserva';
		$t1.reflectToAttribute = true;
		return $t1;
	})()], name: 'aprop', type: 4, returnType: String, sname: 'aprop' }] });
	ss.setMetadata($MyInput, { attr: [new CustomTagAttribute('my-input')], members: [{ attr: [(function() {
		var $t1 = new PublishedAttribute();
		$t1.value = 'prova';
		$t1.notify = true;
		$t1.reflectToAttribute = true;
		return $t1;
	})()], name: 'testo', type: 4, returnType: String, sname: 'testo' }] });
	(function() {
		$MyElement.static1 = 54;
		$MyElement.static2 = 0;
		$MyElement.static2 = 66;
	})();
})();
