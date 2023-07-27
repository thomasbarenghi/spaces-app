import React, { useState } from "react";
import { ModalBase } from "@/components";
import { createPortal } from "react-dom";

type ModalTriggerProps = {
  triggerText: string;
  confirmText: string;
  triggerColor?: string;
  triggerClass?: string;
  confirmParagraph: string;
  trueAction: () => void;
  mustConfirm?: boolean;
  alwaysOpen?: boolean;
  alwaysOpenManage?: (value: boolean) => void;
};

export default function ConfirmationModal({
  confirmText,
  confirmParagraph,
  triggerText,
  triggerClass = "",
  triggerColor = "bg-blue-500",
  mustConfirm = true,
  alwaysOpen = false,
  alwaysOpenManage = () => {},
  trueAction,
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  const handleTrueAction = () => {
    trueAction();
    setIsOpen(false);
  };

  const handleTrigger = () => {
    if (mustConfirm) {
      setIsOpen(true);
    } else {
      trueAction();
    }
  };

  const handleCloseAlwaysOpen = () => {
    setIsOpen(false);
    alwaysOpenManage(false);
  };

  return (
    <div>
      <button
        className={`${triggerClass} primaryButton whitespace-nowrap ${triggerColor}`}
        onClick={handleTrigger}
        type="button"
      >
        {triggerText}
      </button>
      {createPortal(
        <ModalBase
          isOpen={isOpen}
          close={() => setIsOpen(false)}
          position="center-center"
          setIsOpen={setIsOpen}
          type="confirmation"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-medium">{confirmText}</h3>
              <p className="bodyText ">{confirmParagraph}</p>
            </div>
            <div className="flex gap-2">
              <button className="primaryButton" onClick={handleTrueAction}>
                Confirmar
              </button>
              <button
                className="secondaryButton bg-red-200  text-red-700"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </ModalBase>,
        document.body
      )}
    </div>
  );
}
