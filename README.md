# Saltarelle.Polymer

This library lets you use [PolymerJS 0.8](polymer-project.org) with the C# Saltarelle compiler.

Status: **alpha**, it's experimental and the 0.8 specs are not even completed.

## Usage

Briefly:

1. write your `<dom-module>` (or whatever it's called now) in a .html file as you would normally 
   do in PolymerJS, but do NOT call the JavaScript registration function `Polymer({...});` yet.
   Registration of the element will be done later in C#.

2. write the C# code for all your elements, deriving from the class `PolymerElement`. 
   
3. once finished, set up a static function (e.g. `Program.RegisterAll()`) that registers the elements you have created and that 
   you are going to use. Use the method `Polymer.Register<T>()`, e.g.:
   
   ```
   Polymer.Register<MyElement>("my-element");
   ```     
      
5. in your main page, listen for the event `WebComponentsReady` and call the C# static function that
   registers your elements, e.g.
   
   ```
      window.addEventListener('WebComponentsReady', function (e) {
         global.Program.RegisterAll();
      });
   ```

   Remember to HTML import `polymer.html` so that the `Polymer` object is visible from your main page (otherwise registration from C# will fail). 

## Writing elements code

Very briefly:

1. Put a `[assembly: PreserveMemberCase]` directive in your project to avoid camelCase troubles (I always do this in all my Saltarelle projects).
2. Derive a class from `PolymerElement` (only if you want to access shadow DOM)
3. Decorate it with `[CustomTag("element-name")]`.
4. Write event handlers as normal `public` methods.
5. Write properties as `public` fields.
6. Write published properties as `public` fields and decorate them with the `[Published()]` attribute decorator. The decorator has several parameters you might want to fill. The `type` is calculated automatically (from field's type).
7. You can have static properties too.
8. You can implement lifecycle events, e.g. `ready()`, `attached()` etc as normal `public` methods.
9. Do not use the constructor, do not implement it. 
10. Do not initialize properties directly, if you have to do initializations, you can do them in the `ready()` event or you can specify a default value in the `[Published()]` attribute.

## Attribute decorators

#### CustomTag
`[CustomTag(elementName,extends)]`
- **elementName**: the name of the element (must have a `-` e.g. `"my-element"`)
- **extends**: (optional) the name of the HTML element the component is extending. As of 0.8 only native HTML elements are permitted.

#### Published
`[Published(value,reflectToAttribute,readOnly,notify,computed,observer)]`

If `Published` is specified, the property becomes a published property. All parameters are optional. 

- **value**: the default initialization value of the property.
- **reflectToAttribute**: if true any change to the property is serialized out to an attribute of the same name.
- **readOnly**: if true the property will be read-only    
- **notify**: if true, sets two-way data binding and `propertyName-changed()` is fired whenever the property value changes     
- **computed**: a string containing a method call that will be used to fill the value of the property
- **observer**: a method name to call when the property value changes   

## History

- 18 April 2015, first version with Polymer 0.8
- March 2015, implemented Polymer 0.5




 