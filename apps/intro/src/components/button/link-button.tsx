import Image from "next/image";

import { StoreType } from "@/constants/store";
import { cn } from "@gyeongmaetalk/utils";

const appStoreImage = "/static/app-store.webp";
const googlePlayImage = "/static/googleplay.webp";

interface LinkButtonProps {
  type: StoreType;
  text?: string;
  className?: string;
}

export default function LinkButton({ type, text, className }: LinkButtonProps) {
  const isApple = type === StoreType.APP_STORE;
  const state = {
    src: isApple ? appStoreImage : googlePlayImage,
    alt: isApple ? "App Store 아이콘" : "Google Play 아이콘",
    text: isApple ? "App Store" : "Google Play",
  };

  return (
    <a
      className={cn(
        "hover:bg-cool-neutral-99 flex w-40 flex-row items-center justify-center gap-3 rounded-lg bg-white p-3 text-black",
        className
      )}
      href="#"
    >
      <div className="relative size-4">
        <Image src={state.src} alt={state.alt} className="object-contain" fill />
      </div>
      <span className="font-body1-normal-medium text-label-neutral">{text ?? state.text}</span>
    </a>
  );
}
