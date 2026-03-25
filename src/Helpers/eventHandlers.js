export default function createEventHandlers() {
  var eventHandlers = [];

  function detachEventHandler(eventHandler) {
    var elem = eventHandler.elem,
      type = eventHandler.type,
      fn = eventHandler.fn;

    if (elem.removeEventListener) {
      elem.removeEventListener(type, fn, false);
    } else if (elem.detachEvent) {
      elem.detachEvent("on" + type, fn);
    }
  }

  return {
    attach: function (elem, type, fn) {
      if (elem.addEventListener) {
        elem.addEventListener(type, fn, false);
      } else {
        elem.attachEvent("on" + type, fn);
      }

      eventHandlers.push({ elem: elem, type: type, fn: fn });
    },

    detach: detachEventHandler,

    detachByType: function (element, types) {
      eventHandlers.forEach(function (eventHandler) {
        if (types.indexOf(eventHandler.type) > -1 && eventHandler.elem === element) {
          detachEventHandler(eventHandler);
        }
      });
    },

    detachAll: function () {
      var i = eventHandlers.length;
      while (i--) {
        detachEventHandler(eventHandlers[i]);
      }
    },
  };
}
