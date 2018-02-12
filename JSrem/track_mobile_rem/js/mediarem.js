/*
* @Author: klxin
* @Date:   2016-12-21 16:48:22
* @Last Modified by:   klxin
* @Last Modified time: 2017-01-10 17:29:31
*/

'use strict';
window.onload  = function(){
  function getfont (){
    var screen = window.innerWidth;
    if(typeof screen != 'number'){
        if(document.compatMode == 'CSS1Compat'){
            screen = document.documentElement.clientWidth;
        }else{
            screen = document.body.clientWidth;
        }
    }
    console.log(screen);
    if (screen <=320) {
        document.documentElement.style.fontSize = 50+'px';
        // document.body.style.fontSize =50+'px';
    }else if(screen >=640){
        document.documentElement.style.fontSize = 110+'px';
        // document.body.style.fontSize =110+'px';
    }else{
        document.documentElement.style.fontSize = 0.15625*screen+'px';
        // document.body.style.fontSize = 0.15625*screen+'px';
    }
        
  };
  getfont();
  window.onresize = function(){
    getfont();
  }
}