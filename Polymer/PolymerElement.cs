using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

#pragma warning disable 1591

/*
public delegate void PolymerEvent(object ev, object detail, object sender);
public delegate void AttributeChanged(object attrName, object oldVal, object newVal);
public delegate void ChangedWatcher(object oldVal, object newVal);
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
   
   [InlineCode("this.super({arguments})")]
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

