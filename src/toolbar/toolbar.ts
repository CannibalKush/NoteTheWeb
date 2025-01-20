import { PanZoomTool, Erase, ActionButtonWidget } from "js-draw";
import { CloseButton } from "./btnClose";
import { Editor } from "js-draw";
import { ClearButton } from "./btnClear";
import { TransparentButton } from "./btnTransparent";
import { HideButton } from "./btnHide";
import { NormalButton } from "./btnNormal";
let mode: "draw" | "transparent" | "hide" = "draw";

export const initToolbar = (editor: Editor) => {
  const toolController = editor.toolController;
  const panTools = toolController.getMatchingTools(PanZoomTool);
  toolController.removeAndDestroyTools(panTools);
  const toolbar = editor.addToolbar();

  toolbar.addActionButton(...CloseButton());
  toolbar.addActionButton(...ClearButton(editor));

  const { transparent, resetTransparent } = TransparentButton({
    onSelect: () => {
      resetHide();
      mode = "transparent";
      transparentButton.addCSSClassToContainer("toggle-on");
      hideButton.removeCSSClassFromContainer("toggle-on");
      normalButton.removeCSSClassFromContainer("toggle-on");
    },
  });
  const transparentButton = toolbar.addActionButton(...transparent);
  transparentButton.addCSSClassToContainer("margin-left-48");

  const { hide, resetHide } = HideButton({
    onSelect: () => {
      resetTransparent();
      mode = "hide";
      hideButton.addCSSClassToContainer("toggle-on");
      transparentButton.removeCSSClassFromContainer("toggle-on");
      normalButton.removeCSSClassFromContainer("toggle-on");
    },
  });
  const hideButton = toolbar.addActionButton(...hide);

  const { normal, resetNormal } = NormalButton({
    onSelect: () => {
      resetHide();
      resetTransparent();
      mode = "draw";
      normalButton.addCSSClassToContainer("toggle-on");
      hideButton.removeCSSClassFromContainer("toggle-on");
      transparentButton.removeCSSClassFromContainer("toggle-on");
    },
  });
  const normalButton = toolbar.addActionButton(...normal);

  return toolbar;
};
