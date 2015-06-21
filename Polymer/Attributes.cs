using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

#pragma warning disable 1591

[AttributeUsage(AttributeTargets.Class)]
public class ComponentAttribute : Attribute
{
   public string name = null;
   public string extends = null;

   public ComponentAttribute(string tagName)
   {
      this.name = tagName;
   }

   public ComponentAttribute(string tagName, string extends)
   {
      this.name = tagName;
      this.extends = extends;
   }
}

[AttributeUsage(AttributeTargets.Class)]
public class ExtendAttribute : Attribute
{   
   public string extends = null;

   public ExtendAttribute(string tagName)
   {
      this.extends = tagName;
   }  
}

[AttributeUsage(AttributeTargets.Class)]
public class HostAttributesAttribute : Attribute
{
   public object hostAttributes;

	public HostAttributesAttribute(object attributes)
   {
      this.hostAttributes = attributes;
   }
}

/// <summary>
/// Specify that the field or property is a published Polymer property
/// </summary>

[AttributeUsage(AttributeTargets.Field|AttributeTargets.Property|AttributeTargets.Method)]
public class PropertyAttribute : Attribute
{   
   public object value = null;       
   public bool   reflectToAttribute;
   public bool   readOnly;    
   public bool   notify;    
   public string computed = null;
   public string observer = null;   
}

// @computed

// @listener

// @observe

// @behavior
