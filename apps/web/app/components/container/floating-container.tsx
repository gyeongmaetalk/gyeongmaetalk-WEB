import { cn } from "@gyeongmaetalk/utils";

export default function FloatingContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "max-w-mobile fixed bottom-[calc(2.5rem+var(--spacing-ios-bottom))] left-1/2 w-full -translate-x-1/2 px-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
