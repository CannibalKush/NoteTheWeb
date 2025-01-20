import { Viewport, Editor } from "js-draw";
import { Mat33, Vec2 } from "@js-draw/math";

let lastPos = { x: 0, y: 0 };

export function update(edtr: Editor, wndw: Window) {
  const scrollX = wndw.scrollX;
  const scrollY = wndw.scrollY;

  const deltaX = scrollX - lastPos.x;
  const deltaY = lastPos.y - scrollY;

  if (deltaX !== 0 || deltaY !== 0) {
    const delta = Mat33.translation(Vec2.of(deltaX, deltaY));

    const deltaCommand = Viewport.transformBy(delta);
    deltaCommand.apply(edtr);
  }

  lastPos = { x: scrollX, y: scrollY };
}
