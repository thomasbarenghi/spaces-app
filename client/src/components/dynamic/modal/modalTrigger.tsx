import React, { useState, useEffect } from "react";
import { ModalBase, CircularLoader } from "@/components";
import { createPortal } from "react-dom";

type ModalTriggerProps = {
  children: React.ReactNode;
  triggerText: string | React.ReactNode;
  buttonType?: "primaryButton" | "secondaryButton" | "terceryButton";
  alwaysOpen?: boolean;
  alwaysOpenCloser?: () => void;
  classname?: string;
  loading?: boolean;
  manualClose?: boolean;
  modalType?: "default" | "confirmation";
};

export default function ModalTrigger({
  children,
  triggerText,
  buttonType,
  classname,
  alwaysOpen = false,
  loading = false,
  manualClose = false,
  alwaysOpenCloser = () => {},
  modalType = "default",
}: ModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(alwaysOpen);

  useEffect(() => {
    if (manualClose === true) {
      setIsOpen(false);
    }
  }, [manualClose]);

  const handleClose = () => {
    if (alwaysOpen) {
      alwaysOpenCloser();
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {!alwaysOpen && (
        <button
          className={`${buttonType} ${classname} whitespace-nowrap`}
          onClick={() => setIsOpen(true)}
        >
          {triggerText}
        </button>
      )}
      {createPortal(
        <ModalBase
          isOpen={isOpen}
          close={handleClose}
          position="center-center"
          setIsOpen={setIsOpen}
          type={modalType}
        >
          <>
            <div className={`z-0 h-full w-full ${loading && "opacity-0"}`}>
              {children}
            </div>
            {loading && (
              <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center gap-3 rounded-[20px] bg-white ">
                <CircularLoader />
                <div>
                  <p className="subtitulo">Procesando</p>
                </div>
              </div>
            )}
          </>
        </ModalBase>,
        document.body
      )}
    </div>
  );
}
