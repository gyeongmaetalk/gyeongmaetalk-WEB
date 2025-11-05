import { cn } from "@gyeongmaetalk/utils";

import { LogoIcon } from "./icons";

export default function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const onError = () => {
    props.src = undefined;
  };

  if (!props.src) {
    return <LogoIcon className={cn("size-full", props.className)} />;
  }

  return <img {...props} onError={onError} />;
}
