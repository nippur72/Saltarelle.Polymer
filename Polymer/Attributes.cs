using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

#pragma warning disable 1591

/// <summary>
/// Specify that the field or property is a published Polymer property
/// </summary>

[AttributeUsage(AttributeTargets.Field|AttributeTargets.Property)]
public class PublishedAttribute : Attribute
{   
   public object value = null;       
   public bool   reflectToAttribute;
   public bool   readOnly;    
   public bool   notify;    
   public string computed = null;
   public string observer = null;   
}

[AttributeUsage(AttributeTargets.Class)]
public class TagAttribute : Attribute
{
   public string name = null;
   public string extends = null;

   public TagAttribute(string tagName)
   {
      this.name = tagName;
   }

   public TagAttribute(string tagName, string extends)
   {
      this.name = tagName;
      this.extends = extends;
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

