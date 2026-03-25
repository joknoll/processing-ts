export default function createRedrawRenderers(options) {
  return {
    redraw2D: function () {
      options.redrawController.run(function () {
        var curContext = options.getContext();
        curContext.lineWidth = options.getLineWidth();
        options.saveContext();
        options.draw();
        options.restoreContext();
      });
    },

    redraw3D: function () {
      options.redrawController.run(function () {
        var curContext = options.getContext();
        // Even if the color buffer isn't cleared with background(),
        // the depth buffer needs to be cleared regardless.
        curContext.clear(curContext.DEPTH_BUFFER_BIT);
        options.resetContextCache();
        options.resetSceneState();
        options.draw();
      });
    },
  };
}
