import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { cn } from "@gyeongmaetalk/utils";

import { createPortal } from "react-dom";

interface DrawerContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer 컴포넌트 내부에서만 사용할 수 있어요.");
  }
  return context;
};

interface DrawerProps {
  children: ReactNode;
}

function Drawer({ children }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, open, close }}>{children}</DrawerContext.Provider>
  );
}

function DrawerTrigger({ children, className, ...props }: React.ComponentProps<"button">) {
  const { open } = useDrawer();
  return (
    <button className={className} onClick={open} type="button" {...props}>
      {children}
    </button>
  );
}

interface ContentProps {
  children: ReactNode;
  className?: string;
}

function DrawerContent({ children, className }: ContentProps) {
  const { isOpen, close } = useDrawer();
  const [drawerRef] = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) {
      close();
    }
  });

  const onClickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    close();
  };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[99999] bg-black/50 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0"
      )}
      onClick={onClickBackground}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "max-w-mobile fixed right-0 bottom-0 left-0 z-[99999] mx-auto transform rounded-t-2xl bg-white p-5 shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-y-0" : "translate-y-full",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export { Drawer, DrawerTrigger, DrawerContent };
