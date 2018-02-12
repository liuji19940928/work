/*
* @Author: klxin
* @Date:   2016-12-21 16:48:22
* @Last Modified by:   klxin
* @Last Modified time: 2017-10-18 16:18:22
*/

'use strict';
window.onload  = function(){
  function getfont (){
    // 1.
    /*var screen = window.innerWidth;
    if(typeof screen != 'number'){
        if(document.compatMode == 'CSS1Compat'){
            screen = document.documentElement.clientWidth;
        }else{
            screen = document.body.clientWidth;
        }
    }*/
    // 2.
    var screen = document.documentElement.clientWidth || document.body.clientWidth;
    // console.log(screen);
    if (screen <=320) {
        document.documentElement.style.fontSize = 20+'px';
        document.body.style.fontSize =20+'px';
    }else if(screen >=640){
        document.documentElement.style.fontSize = 40+'px';
        document.body.style.fontSize =40+'px';
    }else{
        document.documentElement.style.fontSize = 0.0625*screen+'px';
        document.body.style.fontSize = 0.0625*screen+'px';
    }
        
  };
  getfont();
  window.onresize = function(){
    getfont();
  }
}