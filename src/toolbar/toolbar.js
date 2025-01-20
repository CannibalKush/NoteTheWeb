import { PanZoomTool, Erase } from "js-draw";

export const initToolbar = (editor) => {
  const toolController = editor.toolController;
  const panTools = toolController.getMatchingTools(PanZoomTool);
  toolController.removeAndDestroyTools(panTools);
  const toolbar = editor.addToolbar();

  // Visibility icon hides the toolbar
  const visibilityIcon = document.createElement("div");
  visibilityIcon.textContent = "👁️";
  toolbar.addActionButton(
    { icon: visibilityIcon, label: "Hide toolbar" },
    () => {
      toolbar.toolbarContainer.classList.add("display-none");
    }
  );

  // Pointer events icon allows you to click through the canvas
  const pointerEventsIcon = document.createElement("div");
  pointerEventsIcon.textContent = "✏";
  const clickThroughButton = toolbar.addActionButton(
    { icon: pointerEventsIcon, label: "Click through" },
    () => {
      const enable = document
        .querySelector(".js-draw")
        .classList.contains("pointer-events-none");
      clickThrough(enable, clickThroughButton);
    }
  );

  // Clear icon clears the canvas
  const clearIcon = document.createElement("div");
  clearIcon.textContent = "🧹";
  toolbar.addActionButton({ icon: clearIcon, label: "Clear" }, () => {
    const allComponents = editor.image.getAllElements();
    const deleteCommand = new Erase(allComponents);
    editor.dispatch(deleteCommand);
  });

  // Hide icon hides the drawings

  const hideIcon = document.createElement("div");
  hideIcon.textContent = "🫣";
  const hideButton = toolbar.addActionButton(
    { icon: hideIcon, label: "Hide drawings" },
    () => {
      const enable = document
        .querySelector(".imageEditorRenderArea")
        .classList.contains("visibility-hidden");
      hideDrawings(enable, hideButton);
    }
  );

  return toolbar;
};

const clickThrough = (enable, clickThroughButton) => {
  if (enable) {
    clickThroughButton.removeCSSClassFromContainer("toggle-on");
    document.querySelector(".js-draw").classList.remove("pointer-events-none");
  } else {
    clickThroughButton.addCSSClassToContainer("toggle-on");
    document.querySelector(".js-draw").classList.add("pointer-events-none");
  }
};

const hideDrawings = (enable, hideButton) => {
  if (enable) {
    hideButton.removeCSSClassFromContainer("toggle-on");
    document
      .querySelector(".imageEditorRenderArea")
      .classList.remove("visibility-hidden");
  } else {
    hideButton.addCSSClassToContainer("toggle-on");
    document
      .querySelector(".imageEditorRenderArea")
      .classList.add("visibility-hidden");
  }
};
