using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

[assembly: PreserveMemberCase]

public class Program
{
   public static void Mainx()
   {      
      Polymer.Register<MyElement>();    
      Polymer.Register<MyInput>();    
      Polymer.Register<MyApp>();
   }
}





