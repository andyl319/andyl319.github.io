(function(){
  let resourceCache = {};
  let loading = [];
  let readyCallbacks = [];

  function load(arr){
    if(arr instanceof Array){
      arr.forEach(function(path){
        _load(path);
      });
    }
  }

  function _load(path){
    if(resourceCache[path]){
      return resourceCache[path];
    } else {
      let img = new Image();
      img.onload = function(){
        resourceCache[path] = img;

        if(isReady()){
          readyCallbacks.forEach(func => {
            func();
          });
        }
      };

      resourceCache[path] = false;
      img.src = path;
    }
  }

  function get(path){
    return resourceCache[path];
  }

  function isReady(){
    let ready = true;
    for(let keys in resourceCache){
      if(resourceCache.hasOwnProperty(keys) && !resourceCache[keys]){
        ready = false;
      }
    }

    return ready;
  }

  function onReady(func){
    readyCallbacks.push(func);
  }

  window.Objects = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
