(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'saltarelle-polymer');
	////////////////////////////////////////////////////////////////////////////////
	// CustomTagAttribute
	var $CustomTagAttribute = function(tagName) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
	};
	$CustomTagAttribute.__typeName = 'CustomTagAttribute';
	$CustomTagAttribute.$ctor1 = function(tagName, extends1) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
		this.extends$1 = extends1;
	};
	global.CustomTagAttribute = $CustomTagAttribute;
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
		return function() {
			var type = T;
			// reads [CustomTag]       
			var customTag = null;
			var $t1 = ss.getAttributes(type, $CustomTagAttribute, true);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var attr = $t1[$t2];
				customTag = ss.safeCast(attr, $CustomTagAttribute);
				break;
			}
			if (ss.isNullOrUndefined(customTag)) {
				throw new ss.Exception('Element class must specify a [CustomTag] attribute');
			}
			if (ss.isNullOrUndefined(customTag.name)) {
				throw new ss.Exception('Element class must specify a name with a [CustomTag(name)] attribute');
			}
			//
			// map published fields as properties
			//
			var properties = {};
			var $t3 = ss.getMembers(type, 4, 28);
			for (var $t4 = 0; $t4 < $t3.length; $t4++) {
				var field = $t3[$t4];
				var attributes = (field.attr || []).filter(function(a) {
					return ss.isInstanceOfType(a, $PublishedAttribute);
				});
				if (attributes.length === 0) {
					continue;
				}
				var property = {};
				var attribute = ss.safeCast(attributes[0], $PublishedAttribute);
				property['type'] = field.returnType;
				if (ss.isValue(attribute.value)) {
					property['value'] = attribute.value;
				}
				if (attribute.reflectToAttribute !== false) {
					property['reflectToAttribute'] = attribute.reflectToAttribute;
				}
				if (attribute.readOnly !== false) {
					property['readOnly'] = attribute.readOnly;
				}
				if (attribute.notify !== false) {
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
			// 
			// assemble Polymer configuration object
			//
			var prototype = type.prototype;
			prototype['is'] = customTag.name;
			if (ss.isValue(customTag.extends$1)) {
				prototype['extends'] = customTag.extends$1;
			}
			prototype['properties'] = properties;
			//Debug.Break();          
			// register element in Polymer
			Polymer(prototype);
		};
	};
	global.PolymerHelper = $PolymerHelper;
	////////////////////////////////////////////////////////////////////////////////
	// PublishedAttribute
	var $PublishedAttribute = function() {
		this.value = null;
		this.reflectToAttribute = false;
		this.readOnly = false;
		this.notify = false;
		this.computed = null;
		this.observer = null;
	};
	$PublishedAttribute.__typeName = 'PublishedAttribute';
	global.PublishedAttribute = $PublishedAttribute;
	ss.initClass($CustomTagAttribute, $asm, {});
	$CustomTagAttribute.$ctor1.prototype = $CustomTagAttribute.prototype;
	ss.initClass($PolymerElement, $asm, {});
	ss.initClass($PolymerHelper, $asm, {});
	ss.initClass($PublishedAttribute, $asm, {});
})();
