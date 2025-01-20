export type CloseButtonProps = {
  toolbar: AbstractToolbar;
};
import { AbstractToolbar } from "js-draw";

export const CloseButton = (): Parameters<
  AbstractToolbar["addActionButton"]
> => {
  const closeIcon = document.createElement("div");
  closeIcon.textContent = "❌";
  return [
    { icon: closeIcon, label: "Close" },
    () => {
      document.querySelector(".js-draw")?.classList.add("display-none");
    },
  ];
};
