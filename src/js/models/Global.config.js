import {browser} from '../helpers';

module.exports = function() {
  var scrollBarWidth = 0;
  var b = browser();
  
  if( b[0] == 'safari' &&
    !('ontouchstart' in window)
   ){
    // only for safari desktop.
    scrollBarWidth = 15;
  }


  var _prefix = function () {
      var styles = window.getComputedStyle(document.documentElement, ''),
        pre = (Array.prototype.slice
          .call(styles)
          .join('') 
          .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
        )[1],
        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
      return {
        dom: dom,
        lowercase: pre,
        css: '-' + pre + '-',
        js: pre[0].toUpperCase() + pre.substr(1)
      };
    }();


  return {

    maxVideoW : 1000,

    prefix : _prefix,
    // scroll position
    scroll : {
      y : -1,
      x : -1,
      py : -1,
      px : -1
    },

    // window width/height
    w : {
      w : 0,
      h : 0
    },

    mouse : {
      x : 0,
      y : 0,
      // previous stored.
      px : 0,
      py : 0
    },

    // breakpoints :
    minW      : 320,
    bkptMax   : 1400,
    bkptMed   : 992 - scrollBarWidth,  //767,
    bkptSml   : 767 - scrollBarWidth,   //480*/

    tweenTime : {
      quick : 1/4,
      med   : 1/2,
      slow  : 3/4,
      lng   : 1,
      vlng  : 2
    }

    
  }
}();
