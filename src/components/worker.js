//web workers allow your js-file to be executed when tab is inactive
//VITE doesn't support it normally, see StartPause.jsx
let interval = null;

self.onmessage = function(e) {
  if (e.data === "start" && !interval) {
    
    tick();
  }else if(e.data === "stop"){
    clearTimeout(interval);
    interval = null;
  }
};

function tick() {
  self.postMessage("tick"); 
  interval = setTimeout(tick, 1000);
}
