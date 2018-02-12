/*
* @Author: klxin
* @Date:   2016-12-21 16:48:22
* @Last Modified by:   klxin
* @Last Modified time: 2016-12-21 17:20:07
*/

'use strict';
(function (doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 10*(clientWidth / 320) + 'px';
      };
 
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  // doc.addEventListener('DOMContentLoaded', recalc, false);
 
})(document, window);