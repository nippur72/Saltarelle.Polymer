(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'saltarelle-polymer');
	////////////////////////////////////////////////////////////////////////////////
	// PolymerElement
	var $PolymerElement = function() {
	};
	$PolymerElement.__typeName = 'PolymerElement';
	$PolymerElement.createInstance = function() {
		return {};
	};
	global.PolymerElement = $PolymerElement;
	////////////////////////////////////////////////////////////////////////////////
	// Polymer
	var $PolymerHelper = function() {
	};
	$PolymerHelper.__typeName = 'PolymerHelper';
	$PolymerHelper.Register = function(T) {
		return function(name) {
			// map published fields as properties
			var type = T;
			var properties = {};
			var $t1 = ss.getMembers(type, 4, 28);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var field = $t1[$t2];
				// see if it's defined the PropertyAttribute
				var attributes = (field.attr || []).filter(function(a) {
					return ss.isInstanceOfType(a, $PropertyAttribute);
				});
				if (attributes.length === 0) {
					continue;
				}
				var property = {};
				var attribute = ss.safeCast(attributes[0], $PropertyAttribute);
				property['type'] = field.returnType;
				if (ss.isValue(attribute.value)) {
					property['value'] = attribute.value;
				}
				if (ss.isValue(attribute.reflectToAttribute)) {
					property['reflectToAttribute'] = attribute.reflectToAttribute;
				}
				if (ss.isValue(attribute.readOnly)) {
					property['readOnly'] = attribute.readOnly;
				}
				if (ss.isValue(attribute.notify)) {
					property['notify'] = attribute.notify;
				}
				if (ss.isValue(attribute.computed)) {
					property['computed'] = attribute.computed;
				}
				if (ss.isValue(attribute.observer)) {
					property['observer'] = attribute.observer;
				}
				// write into properties object
				properties[field.name] = property;
			}
			var prototype = type.prototype;
			prototype['is'] = name;
			prototype['properties'] = properties;
			Polymer(prototype);
		};
	};
	global.PolymerHelper = $PolymerHelper;
	////////////////////////////////////////////////////////////////////////////////
	// PropertyAttribute
	var $PropertyAttribute = function() {
		this.value = null;
		this.reflectToAttribute = null;
		this.readOnly = null;
		this.notify = null;
		this.computed = null;
		this.observer = null;
	};
	$PropertyAttribute.__typeName = 'PropertyAttribute';
	global.PropertyAttribute = $PropertyAttribute;
	ss.initClass($PolymerElement, $asm, {});
	ss.initClass($PolymerHelper, $asm, {});
	ss.initClass($PropertyAttribute, $asm, {});
})();
