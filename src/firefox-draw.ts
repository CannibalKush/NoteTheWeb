import {
  Editor,
  BackgroundComponentBackgroundType,
  EditorEventType,
  AbstractToolbar,
} from "js-draw";
import "js-draw/bundledStyles";
import { Color4 } from "@js-draw/math";
import { getSVG, queueSave } from "./data/db";
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
      // type: BackgroundComponentBackgroundType.Grid,
    })
  );

  editor.notifier.on(EditorEventType.CommandDone, (event) => {
    queueSave(editor);
  });

  editor.notifier.on(EditorEventType.CommandUndone, (event) => {
    queueSave(editor);
  });

  getSVG(document.location.href).then((svg) => {
    if (svg && typeof svg === "string") {
      editor.loadFromSVG(svg);
    }
  });

  return { editor, toolbar };
};

let editor: Editor;
let toolbar: AbstractToolbar;

document.addEventListener("scroll", () => {
  update(editor, window);
});

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "show-toolbar") {
    if (!toolbar || !editor) {
      ({ editor, toolbar } = initializeEditor());
    }
    document.querySelector(".js-draw")?.classList.remove("display-none");
  }
});
