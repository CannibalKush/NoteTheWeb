import { AbstractToolbar } from "js-draw";

export type NormalButtonProps = {
  onSelect: () => void;
};

export const NormalButton = ({
  onSelect,
}: NormalButtonProps): {
  normal: Parameters<AbstractToolbar["addActionButton"]>;
  resetNormal: () => void;
} => {
  const normalIcon = document.createElement("div");
  normalIcon.textContent = "📝";
  return {
    normal: [
      { icon: normalIcon, label: "Normal" },
      () => {
        onSelect();
      },
    ],
    resetNormal: () => {
      //
    },
  };
};
