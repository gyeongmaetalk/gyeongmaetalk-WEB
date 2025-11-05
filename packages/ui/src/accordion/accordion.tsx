"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

import { cn } from "@gyeongmaetalk/utils";

import { ChevronDown } from "lucide-react";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

const AccordionContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function Accordion({ children, className }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <AccordionContext.Provider value={{ open, setOpen }}>
      <div className={cn("border-b-cool-neutral-50/8 border-b", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionHeader({ children, className }: AccordionProps) {
  const context = useContext(AccordionContext);

  if (context === null) {
    throw new Error("AccordionHeader must be used within an Accordion");
  }

  const { open, setOpen } = context;

  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn("flex w-full items-center justify-between py-4", className)}
    >
      {children}
      <ChevronDown
        className={cn("size-5 transition-transform duration-200", open && "rotate-180")}
      />
    </button>
  );
}

function AccordionContent({ children, className }: AccordionProps) {
  const context = useContext(AccordionContext);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  if (context === null) {
    throw new Error("AccordionContent must be used within an Accordion");
  }

  const { open } = context;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight + 1 : 0);
    }
  }, [open]);

  return (
    <section
      role="region"
      aria-hidden={!open}
      className={cn("transition-height overflow-hidden duration-200", className)}
      style={{
        height: `${height}px`,
      }}
    >
      <div ref={contentRef} className={cn("py-4", className)}>
        {children}
      </div>
    </section>
  );
}

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
