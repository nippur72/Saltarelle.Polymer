using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

[Tag("my-element")]
public class MyElement : PolymerElement
{
   public static int static1 = 54;
   
   public static int static2;

   static MyElement()
   {
      static2 = 66;
   }
   
   public string mionome;

   [Published(value="sessantaquattro",notify=true, reflectToAttribute=true)]
   public string aprop;

   public void clicca()
   {
      static1++;
      static2++;
      mionome = (static1+static2).ToString();
   }

   public void osserva(string newval, string oldval)
   {      
      //Window.Alert("adesso è "+newval);
   }

   public void ready()
   {      
      //mionome="rwad";      
   }
}


[Tag("my-input")]
public class MyInput : PolymerElement
{
   [Published(value="prova", notify = true, reflectToAttribute=true)]
   public string testo;

   /*
   public void created()
   {
     // this.super();
   }
   */

   public void modificato()
   {
      testo = testo + "a";
   }
}


[Tag("my-app")]
public class MyApp
{
   [Published(notify=true)]
   public string nomeutente;

   public void ready()
   {
      nomeutente = "nino porcino il grande";
   }
}