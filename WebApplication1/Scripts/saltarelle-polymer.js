(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'saltarelle-polymer');
	////////////////////////////////////////////////////////////////////////////////
	// ComponentAttribute
	var $ComponentAttribute = function(tagName) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
	};
	$ComponentAttribute.__typeName = 'ComponentAttribute';
	$ComponentAttribute.$ctor1 = function(tagName, extends1) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
		this.extends$1 = extends1;
	};
	global.ComponentAttribute = $ComponentAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// ExtendAttribute
	var $ExtendAttribute = function(tagName) {
		this.extends$1 = null;
		this.extends$1 = tagName;
	};
	$ExtendAttribute.__typeName = 'ExtendAttribute';
	global.ExtendAttribute = $ExtendAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// HostAttributesAttribute
	var $HostAttributesAttribute = function(attributes) {
		this.hostAttributes = null;
		this.hostAttributes = attributes;
	};
	$HostAttributesAttribute.__typeName = 'HostAttributesAttribute';
	global.HostAttributesAttribute = $HostAttributesAttribute;
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
			// reads [Component]       
			var componentAttr = null;
			var $t1 = ss.getAttributes(type, $ComponentAttribute, true);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var attr = $t1[$t2];
				componentAttr = ss.safeCast(attr, $ComponentAttribute);
				break;
			}
			if (ss.isNullOrUndefined(componentAttr)) {
				throw new ss.Exception('Element class must specify a [Component] attribute');
			}
			if (ss.isNullOrUndefined(componentAttr.name)) {
				throw new ss.Exception('Element class must specify a name with a [Component(name)] attribute');
			}
			// reads [Extend]       
			var extendAttr = null;
			var $t3 = ss.getAttributes(type, $ExtendAttribute, true);
			for (var $t4 = 0; $t4 < $t3.length; $t4++) {
				var attr1 = $t3[$t4];
				extendAttr = ss.safeCast(attr1, $ExtendAttribute);
				break;
			}
			// reads [HostAttributes]       
			var hostAttribute = null;
			var $t5 = ss.getAttributes(type, $HostAttributesAttribute, true);
			for (var $t6 = 0; $t6 < $t5.length; $t6++) {
				var attr2 = $t5[$t6];
				hostAttribute = ss.safeCast(attr2, $HostAttributesAttribute);
				break;
			}
			//
			// map published fields as properties
			//
			var properties = {};
			var $t7 = ss.getMembers(type, 4, 28);
			for (var $t8 = 0; $t8 < $t7.length; $t8++) {
				var field = $t7[$t8];
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
			prototype['is'] = componentAttr.name;
			if (ss.isValue(componentAttr.extends$1)) {
				prototype['extends'] = componentAttr.extends$1;
			}
			else if (ss.isValue(extendAttr)) {
				prototype['extends'] = extendAttr.extends$1;
			}
			if (ss.isValue(hostAttribute)) {
				prototype['hostAttributes'] = hostAttribute.hostAttributes;
			}
			prototype['properties'] = properties;
			// register element in Polymer
			Polymer(prototype);
		};
	};
	global.PolymerHelper = $PolymerHelper;
	////////////////////////////////////////////////////////////////////////////////
	// PropertyAttribute
	var $PropertyAttribute = function() {
		this.value = null;
		this.reflectToAttribute = false;
		this.readOnly = false;
		this.notify = false;
		this.computed = null;
		this.observer = null;
	};
	$PropertyAttribute.__typeName = 'PropertyAttribute';
	global.PropertyAttribute = $PropertyAttribute;
	ss.initClass($ComponentAttribute, $asm, {});
	$ComponentAttribute.$ctor1.prototype = $ComponentAttribute.prototype;
	ss.initClass($ExtendAttribute, $asm, {});
	ss.initClass($HostAttributesAttribute, $asm, {});
	ss.initClass($PolymerElement, $asm, {});
	ss.initClass($PolymerHelper, $asm, {});
	ss.initClass($PropertyAttribute, $asm, {});
})();
