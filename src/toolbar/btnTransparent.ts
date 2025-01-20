import { AbstractToolbar } from "js-draw";

export type TransparentButtonProps = {
  onSelect: () => void;
};

export const TransparentButton = ({
  onSelect,
}: TransparentButtonProps): {
  transparent: Parameters<AbstractToolbar["addActionButton"]>;
  resetTransparent: () => void;
} => {
  const transparentIcon = document.createElement("div");
  transparentIcon.textContent = "🪟";
  return {
    transparent: [
      { icon: transparentIcon, label: "Transparent" },
      () => {
        onSelect();
        const element = document.querySelector(".js-draw");
        if (!element) return;
        console.log(element);
        element.classList.add("pointer-events-none");
      },
    ],
    resetTransparent: () => {
      const element = document.querySelector(".js-draw");
      if (!element) return;
      element.classList.remove("pointer-events-none");
    },
  };
};
