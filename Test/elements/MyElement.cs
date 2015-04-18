using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

public class MyElement : PolymerElement
{
   public static int static1 = 54;
   
   public static int static2;

   static MyElement()
   {
      static2 = 66;
   }
   
   public string mionome;

   [Property(value="sessantaquattro",observer="osserva")]
   public string aprop;

   public void clicca()
   {
      static1++;
      static2++;
      mionome = (static1+static2).ToString();
   }

   public void osserva(string newval, string oldval)
   {      
      Window.Alert("adesso è "+newval);
   }

   public void ready()
   {      
      mionome="rwad";      
   }
}

