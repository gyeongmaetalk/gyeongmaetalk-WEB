import { createContext, useContext } from "react";

import { cn } from "@gyeongmaetalk/utils";

import { createPortal } from "react-dom";

const ModalContext = createContext<boolean>(false);

function useModalContext() {
  const isInsideModal = useContext(ModalContext);

  if (!isInsideModal) {
    throw new Error("Header, Content, Footer는 Modal 컴포넌트 내부에서만 사용할 수 있습니다.");
  }
}

function Modal({ children, className, ...props }: React.ComponentPropsWithRef<"div">) {
  return createPortal(
    <ModalContext.Provider value={true}>
      <div className="bg-cool-neutral-10/52 fixed inset-0 z-99999 flex items-center justify-center">
        <div
          className={cn(
            "max-w-mobile m-5 flex w-full flex-col gap-2 rounded-[12px] bg-white p-5",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    document.body
  );
}

function ModalHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  useModalContext();
  return (
    <div className={cn("font-heading2-bold text-label-strong text-center", className)} {...props}>
      {children}
    </div>
  );
}

function ModalContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  useModalContext();
  return (
    <div
      className={cn("text-label-alternative font-label1-normal-regular text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function ModalFooter({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  useModalContext();
  return (
    <div className={cn("mt-5", className)} {...props}>
      {children}
    </div>
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
