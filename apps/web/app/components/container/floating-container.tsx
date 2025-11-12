import { cn } from "@gyeongmaetalk/utils";

export default function FloatingContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-mobile fixed bottom-0 left-1/2 w-full -translate-x-1/2 px-4 pt-2 pb-[calc(2.5rem+var(--spacing-ios-bottom))]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
