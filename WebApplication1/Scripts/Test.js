(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'Test');
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
	// Program
	var $Program = function() {
	};
	$Program.__typeName = 'Program';
	$Program.Mainx = function() {
		PolymerHelper.Register($MyElement).call(null, 'my-element');
	};
	global.Program = $Program;
	ss.initClass($MyElement, $asm, {
		clicca: function() {
			$MyElement.static1++;
			$MyElement.static2++;
			this.mionome = ($MyElement.static1 + $MyElement.static2).toString();
		},
		osserva: function(newval, oldval) {
			window.alert('adesso è ' + newval);
		},
		ready: function() {
			this.mionome = 'rwad';
		}
	}, PolymerElement);
	ss.initClass($Program, $asm, {});
	ss.setMetadata($MyElement, { members: [{ attr: [(function() {
		var $t1 = new PropertyAttribute();
		$t1.value = 'sessantaquattro';
		$t1.observer = 'osserva';
		return $t1;
	})()], name: 'aprop', type: 4, returnType: String, sname: 'aprop' }] });
	(function() {
		$MyElement.static1 = 54;
		$MyElement.static2 = 0;
		$MyElement.static2 = 66;
	})();
})();
