export type CloseButtonProps = {
  toolbar: AbstractToolbar;
};
import Editor, { AbstractToolbar, Erase } from "js-draw";

export const ClearButton = (
  editor: Editor
): Parameters<AbstractToolbar["addActionButton"]> => {
  const clearIcon = document.createElement("div");
  clearIcon.textContent = "🧹";
  return [
    { icon: clearIcon, label: "Clear" },
    () => {
      const allComponents = editor.image.getAllElements();
      const deleteCommand = new Erase(allComponents);
      editor.dispatch(deleteCommand);
    },
  ];
};

// Clear icon clears the canvas
// const clearIcon = document.createElement("div");
// clearIcon.textContent = "🧹";
// toolbar.addActionButton({ icon: clearIcon, label: "Clear" }, () => {

// });
