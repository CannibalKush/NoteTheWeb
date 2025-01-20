import { AbstractToolbar } from "js-draw";

export type HideButtonProps = {
  onSelect: () => void;
};

export const HideButton = ({
  onSelect,
}: HideButtonProps): {
  hide: Parameters<AbstractToolbar["addActionButton"]>;
  resetHide: () => void;
} => {
  const hideIcon = document.createElement("div");
  hideIcon.textContent = "👁️";
  return {
    hide: [
      { icon: hideIcon, label: "Hide" },
      () => {
        onSelect();
        const element = document.querySelector(".imageEditorRenderArea");
        const drawElement = document.querySelector(".js-draw");
        if (!element || !drawElement) return;
        element.classList.add("visibility-hidden");
        drawElement.classList.add("pointer-events-none");
      },
    ],
    resetHide: () => {
      const element = document.querySelector(".imageEditorRenderArea");
      const drawElement = document.querySelector(".js-draw");
      if (!element || !drawElement) return;
      element.classList.remove("visibility-hidden");
      drawElement.classList.remove("pointer-events-none");
    },
  };
};
