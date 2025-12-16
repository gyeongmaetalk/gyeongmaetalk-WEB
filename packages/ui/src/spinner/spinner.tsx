import { cn } from "@gyeongmaetalk/utils";

import { Loader2 } from "lucide-react";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return <Loader2 className={cn("text-primary-normal animate-spin", className)} />;
}
