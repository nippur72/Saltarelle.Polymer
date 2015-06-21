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

      // reads [Component]       
      ComponentAttribute componentAttr = null;
      foreach(var attr in type.GetCustomAttributes(typeof(ComponentAttribute),true)) 
      {
         componentAttr = attr as ComponentAttribute;
         break;
      }

      if(componentAttr==null) throw new Exception("Element class must specify a [Component] attribute");
      if(componentAttr.name==null) throw new Exception("Element class must specify a name with a [Component(name)] attribute");
      
      // reads [Extend]       
      ExtendAttribute extendAttr = null;
      foreach(var attr in type.GetCustomAttributes(typeof(ExtendAttribute),true)) 
      {
         extendAttr = attr as ExtendAttribute;
         break;
      }

      // reads [HostAttributes]       
      HostAttributesAttribute hostAttribute = null;
      foreach(var attr in type.GetCustomAttributes(typeof(HostAttributesAttribute),true)) 
      {
         hostAttribute = attr as HostAttributesAttribute;
         break;
      }

      //
      // map published fields as properties
      //

      dynamic properties = new {};
      
      foreach(var field in type.GetFields())
      {         
         var attributes = field.GetCustomAttributes(typeof(PropertyAttribute),true);
         if(attributes.Length==0) continue;
                                 
         dynamic property = new {};

         var attribute = (attributes[0] as PropertyAttribute);

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
      prototype["is"] = componentAttr.name;

		if (componentAttr.extends!=null) prototype["extends"] = componentAttr.extends;      
		else if(extendAttr!=null) prototype["extends"] = extendAttr.extends;      

      if(hostAttribute!=null) prototype["hostAttributes"] = hostAttribute.hostAttributes;
      prototype["properties"] = properties;              
      
      // register element in Polymer
      RegisterInPolymer(prototype);
   }

   [InlineCode("(function(e){{ window.addEventListener('WebComponentsReady', e); }})({eventReadyFunction})")] public extern static void WebComponentsReady(Action<object> eventReadyFunction);             
   [InlineCode("(function(e){{ window.addEventListener('WebComponentsReady', e); }})({eventReadyFunction})")] public extern static void WebComponentsReady(Action eventReadyFunction);            
}
