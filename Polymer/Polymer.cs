using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

[assembly: PreserveMemberCase]

#pragma warning disable 1591

/*
Polymer('tag-name', {
  created: function() { ... },
  ready: function() { ... },
  attached: function () { ... },
  domReady: function() { ... },
  detached: function() { ... },
  attributeChanged: function(attrName, oldVal, newVal) {
    //var newVal = this.getAttribute(attrName);
    console.log(attrName, 'old: ' + oldVal, 'new:', newVal);
  },
});
*/

public class PolymerElement
{
   [InlineCode("{}")]
   public PolymerElement()
   {
   }

   public dynamic DOM
   { 
      [InlineCode("this.$")] get { return null; }      
   }

   public extern void fire(string ev, object ob);
   public extern void asyncFire(string ev, object ob);

   [ExpandParams]
   public extern void super(params object[] arguments);

   /*
   onMutation 
   async 
   job 
   injectBoundHTML

   this.cancelUnbindAll();
   this.resolvePath('x-foo.png').
   */
}

public delegate void PolymerEvent(/*Event*/ object ev, object detail, object sender);
public delegate void AttributeChanged(object attrName, object oldVal, object newVal);
public delegate void ChangedWatcher(object oldVal, object newVal);

[ScriptName("PolymerHelper")]
public class Polymer
{
   [InlineCode("Polymer({ob})")]
   public extern static void RegisterInPolymer(object ob);
   
   // TODO manage extends
      
   public static void Register<T>(string name)
   {
      // map published fields as properties
      Type type = typeof(T);      
      dynamic properties = new {};
      
      foreach(var field in type.GetFields())
      {
         // see if it's defined the PropertyAttribute
         var attributes = field.GetCustomAttributes(typeof(PropertyAttribute),true);
         if(attributes.Length==0) continue;
                                 
         dynamic property = new {};

         var attribute = (attributes[0] as PropertyAttribute);

                                                property["type"]               = field.FieldType;
         if(attribute.value!=null)              property["value"]              = attribute.value;            
         if(attribute.reflectToAttribute!=null) property["reflectToAttribute"] = attribute.reflectToAttribute;
         if(attribute.readOnly!=null)           property["readOnly"]           = attribute.readOnly;
         if(attribute.notify!=null)             property["notify"]             = attribute.notify;
         if(attribute.computed!=null)           property["computed"]           = attribute.computed;
         if(attribute.observer!=null)           property["observer"]           = attribute.observer;

         // write into properties object
         properties[field.Name] = property;                  
      }      
      
      dynamic prototype = ((dynamic) type).prototype;

      prototype["is"] = name;     

      prototype["properties"] = properties;           
      
      RegisterInPolymer(prototype);
   }

   [InlineCode("(function(e){{ window.addEventListener('WebComponentsReady', e); }})({eventReadyFunction})")]
   public extern static void WebComponentsReady(Action<object> eventReadyFunction);            
}

// attribute configuration/reflection
// computed properties
// event delegates
// this.$.container.querySelector('#inner');
// observe
// preventDispose: true
// alwaysPrepare: true
// Platform.flush()?

/// <summary>
/// Specify Polymer properties for the member
/// </summary>

[AttributeUsage(AttributeTargets.Field|AttributeTargets.Property)]
public class PropertyAttribute : Attribute
{
   //public Type type;   
   public object value = null;       
   public bool? reflectToAttribute = null;
   public bool? readOnly = null;    
   public bool? notify = null;    
   public string computed = null;
   public string observer = null;   
}
