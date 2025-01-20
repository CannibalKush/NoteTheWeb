import {
  Editor,
  BackgroundComponentBackgroundType,
  EditorEventType,
} from "js-draw";
import "js-draw/bundledStyles";
import { Color4 } from "@js-draw/math";
import { getSVG, queueSave } from "./db";
import { update } from "./update";
import { initToolbar } from "./toolbar/toolbar";

const initializeEditor = () => {
  const editor = new Editor(document.body, {
    wheelEventsEnabled: false,
    maxZoom: 1,
    minZoom: 1,
  });
  const toolbar = initToolbar(editor);

  editor.dispatch(
    editor.setBackgroundStyle({
      color: Color4.transparent,
      autoresize: true,
      type: BackgroundComponentBackgroundType.Grid,
    })
  );

  editor.notifier.on(EditorEventType.CommandDone, (event) => {
    queueSave(editor);
  });

  editor.notifier.on(EditorEventType.CommandUndone, (event) => {
    queueSave(editor);
  });

  getSVG(document.location.href).then((svg) => {
    if (svg) {
      editor.loadFromSVG(svg);
    }
  });

  return { editor, toolbar };
};

const { editor, toolbar } = initializeEditor();

document.addEventListener("scroll", () => {
  update(editor, window);
});

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "show-toolbar") {
    toolbar.toolbarContainer.classList.remove("display-none");
  }
});
