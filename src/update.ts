import { Viewport, Editor, Vec3 } from "js-draw";
import { Mat33 } from "@js-draw/math";

export function syncViewport(edtr: Editor, wndw: Window) {
  const domViewport = () => {
    return {
      x: wndw.scrollX,
      y: wndw.scrollY,
      width: wndw.innerWidth,
      height: wndw.innerHeight,
    };
  };

  const drawViewport = () => {
    return {
      x: edtr.viewport.visibleRect.x,
      y: edtr.viewport.visibleRect.y,
      width: edtr.viewport.visibleRect.width,
      height: edtr.viewport.visibleRect.height,
    };
  };

  const scale = drawViewport().width / domViewport().width;

  const command = Viewport.transformBy(Mat33.scaling2D(scale)); // 2
  command.apply(edtr);

  const delta = Mat33.translation(
    Vec3.of(
      drawViewport().x - domViewport().x,
      drawViewport().y - domViewport().y,
      0
    )
  );

  const viewportCommand = Viewport.transformBy(delta);
  viewportCommand.apply(edtr);
}
