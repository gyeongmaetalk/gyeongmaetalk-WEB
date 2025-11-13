import { cn } from "@gyeongmaetalk/utils";

import { LogoIcon } from "./icons";

export default function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const onError = () => {
    props.src = undefined;
  };

  const onContextMenuHandler = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    props.onContextMenu?.(e);
  };

  if (!props.src) {
    return <LogoIcon className={cn("size-full", props.className)} />;
  }

  return (
    <img draggable={false} onError={onError} onContextMenu={onContextMenuHandler} {...props} />
  );
}
