module.exports = {
      app : {
        //reset : 'app.reset'
        statechange : "app.statechange"
      },

      window : {
          resize : "resize",
          scroll : "scroll",
          keydown : "keydown"
      },
      
      nav : {
        
      },
    
      dom : {
        mousemove : 'mousemove',
        // force resize update.
        resize : 'dom.resize',
        // force scroll update.
        scroll : 'dom.scroll'
      },

      touch : {
        start : 'touchstart',
        end : 'touchend',
        move : 'touchmove'
      }
}
