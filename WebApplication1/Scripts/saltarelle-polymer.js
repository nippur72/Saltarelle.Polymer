(function() {
	'use strict';
	var $asm = {};
	ss.initAssembly($asm, 'saltarelle-polymer');
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
			// reads [Tag]       
			var customTag = null;
			var $t1 = ss.getAttributes(type, $TagAttribute, true);
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var attr = $t1[$t2];
				customTag = ss.safeCast(attr, $TagAttribute);
				break;
			}
			if (ss.isNullOrUndefined(customTag)) {
				throw new ss.Exception('Element class must specify a [Tag] attribute');
			}
			if (ss.isNullOrUndefined(customTag.name)) {
				throw new ss.Exception('Element class must specify a name with a [Tag(name)] attribute');
			}
			// reads [HostAttributes]       
			var hostAttribute = null;
			var $t3 = ss.getAttributes(type, $HostAttributesAttribute, true);
			for (var $t4 = 0; $t4 < $t3.length; $t4++) {
				var attr1 = $t3[$t4];
				hostAttribute = ss.safeCast(attr1, $HostAttributesAttribute);
				break;
			}
			//
			// map published fields as properties
			//
			var properties = {};
			var $t5 = ss.getMembers(type, 4, 28);
			for (var $t6 = 0; $t6 < $t5.length; $t6++) {
				var field = $t5[$t6];
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
	////////////////////////////////////////////////////////////////////////////////
	// TagAttribute
	var $TagAttribute = function(tagName) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
	};
	$TagAttribute.__typeName = 'TagAttribute';
	$TagAttribute.$ctor1 = function(tagName, extends1) {
		this.name = null;
		this.extends$1 = null;
		this.name = tagName;
		this.extends$1 = extends1;
	};
	global.TagAttribute = $TagAttribute;
	ss.initClass($HostAttributesAttribute, $asm, {});
	ss.initClass($PolymerElement, $asm, {});
	ss.initClass($PolymerHelper, $asm, {});
	ss.initClass($PublishedAttribute, $asm, {});
	ss.initClass($TagAttribute, $asm, {});
	$TagAttribute.$ctor1.prototype = $TagAttribute.prototype;
})();
