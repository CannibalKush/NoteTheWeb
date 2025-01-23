import { Editor, EditorEventType, AbstractToolbar } from "js-draw";
import "js-draw/bundledStyles";
import { Color4 } from "@js-draw/math";
import { getSVG, queueSave } from "./data/db";
import { syncViewport } from "./update";
import { initToolbar } from "./toolbar/toolbar";

const initializeEditor = () => {
  const editor = new Editor(document.body, {
    wheelEventsEnabled: false,
  });
  const toolbar = initToolbar(editor);

  editor.dispatch(
    editor.setBackgroundStyle({
      color: Color4.transparent,
      autoresize: true,
    })
  );

  editor.notifier.on(EditorEventType.CommandDone, (event) => {
    queueSave(editor);
  });

  editor.notifier.on(EditorEventType.CommandUndone, (event) => {
    queueSave(editor);
  });

  editor.notifier.on(EditorEventType.ViewportChanged, (event) => {
    setTimeout(() => {
      if (
        Math.abs(editor.viewport.visibleRect.x - window.scrollX) > 1 ||
        Math.abs(editor.viewport.visibleRect.y - window.scrollY) > 1
      ) {
        syncViewport(editor, window);
      }
    }, 100);
  });

  getSVG(document.location.href).then((svg) => {
    if (svg && typeof svg === "string") {
      editor.loadFromSVG(svg);
    }
  });
  setTimeout(() => {
    syncViewport(editor, window);
  }, 100);

  return { editor, toolbar };
};

let editor: Editor;
let toolbar: AbstractToolbar;

document.addEventListener("scroll", () => {
  if (editor) {
    syncViewport(editor, window);
  }
});

browser.runtime.onMessage.addListener((message) => {
  if (message.command === "show-toolbar") {
    if (!toolbar || !editor) {
      ({ editor, toolbar } = initializeEditor());
    }

    document.querySelector(".js-draw")?.classList.remove("display-none");
  }
});
