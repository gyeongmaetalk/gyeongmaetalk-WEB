import { cn } from "@gyeongmaetalk/utils";

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
}

const Divider = ({ className, direction = "horizontal", ...props }: DividerProps) => {
  const isVertical = direction === "vertical";

  return (
    <div
      className={cn("bg-cool-neutral-99", isVertical ? "h-full w-px" : "h-px w-full", className)}
      aria-orientation={isVertical ? "vertical" : "horizontal"}
      role="separator"
      {...props}
    />
  );
};

export default Divider;
