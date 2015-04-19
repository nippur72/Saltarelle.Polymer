using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

[assembly: PreserveMemberCase]

#pragma warning disable 1591

[ScriptName("PolymerHelper")]
public class Polymer
{
   [InlineCode("Polymer({ob})")]
   public extern static void RegisterInPolymer(object ob);     
      
   public static void Register<T>()
   {
      Type type = typeof(T);      

      // reads [CustomTag]       
      CustomTagAttribute customTag = null;
      foreach(var attr in type.GetCustomAttributes(typeof(CustomTagAttribute),true)) 
      {
         customTag = attr as CustomTagAttribute;
         break;
      }

      if(customTag==null) throw new Exception("Element class must specify a [CustomTag] attribute");
      if(customTag.name==null) throw new Exception("Element class must specify a name with a [CustomTag(name)] attribute");
      
      //
      // map published fields as properties
      //

      dynamic properties = new {};
      
      foreach(var field in type.GetFields())
      {         
         var attributes = field.GetCustomAttributes(typeof(PublishedAttribute),true);
         if(attributes.Length==0) continue;
                                 
         dynamic property = new {};

         var attribute = (attributes[0] as PublishedAttribute);

                                                 property["type"]               = field.FieldType;
         if(attribute.value!=null)               property["value"]              = attribute.value;            
         if(attribute.reflectToAttribute!=false) property["reflectToAttribute"] = attribute.reflectToAttribute;
         if(attribute.readOnly!=false)           property["readOnly"]           = attribute.readOnly;
         if(attribute.notify!=false)             property["notify"]             = attribute.notify;
         if(attribute.computed!=null)            property["computed"]           = attribute.computed;
         if(attribute.observer!=null)            property["observer"]           = attribute.observer;

         // write into properties object
         properties[field.Name] = property;                  
      }      
      
      // 
      // assemble Polymer configuration object
      //

      dynamic prototype = ((dynamic) type).prototype;
      prototype["is"] = customTag.name;     
      if(customTag.extends!=null) prototype["extends"] = customTag.extends;
      prototype["properties"] = properties; 
      //Debug.Break();          
      
      // register element in Polymer
      RegisterInPolymer(prototype);
   }

   [InlineCode("(function(e){{ window.addEventListener('WebComponentsReady', e); }})({eventReadyFunction})")]
   public extern static void WebComponentsReady(Action<object> eventReadyFunction);            
}

// computed properties
// event delegates
// this.$.container.querySelector('#inner');
// observe
// preventDispose: true
// alwaysPrepare: true
// Platform.flush()?

