using System;
using System.Html;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Html.Media.Graphics;
using System.Diagnostics;

[Component("my-timer")]
public class MyTimer : PolymerElement
{
   [Property(value=0)]
   public int start;   
   
   public int count;   

   private int timerHandle;

   public void ready() {		
      this.count = this.start;
      this.timerHandle = Window.SetInterval(() => {
         this.count++;
      }, 1000);      
   }

   public void detatched() {
      Window.ClearInterval(this.timerHandle);
   }
}
