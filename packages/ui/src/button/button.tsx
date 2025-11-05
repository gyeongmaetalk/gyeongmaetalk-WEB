"use client";

import * as React from "react";

import { cn } from "@gyeongmaetalk/utils";
import { Slot } from "@radix-ui/react-slot";

import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ComponentProps<"button"> {
  /**
   * 버튼 종류
   * default(solid): 기본 버튼
   * outlined: 테두리 버튼
   * text: 텍스트 버튼
   */
  variant?: "default" | "outlined" | "text";

  /**
   * 버튼 테마
   * default(primary): 기본 버튼
   * secondary: 보조 버튼
   * assistive: 부정적 의미의 버튼
   */
  theme?: "default" | "secondary" | "assistive";

  /**
   * 버튼 크기
   * default(lg): 기본 버튼
   * md: 중간 버튼
   * sm: 작은 버튼
   */
  size?: "default" | "md" | "sm";

  /**
   * 버튼 로딩 상태
   */
  loading?: boolean;

  /**
   * 버튼 아이콘 위치
   * size를 이용해서 크기 조절
   */
  LeftIcon?: React.ElementType;
  RightIcon?: React.ElementType;

  /**
   * 아이콘 전용 버튼
   * size를 이용해서 크기 조절
   */
  iconOnly?: boolean;

  asChild?: boolean;
}

const buttonCompoundVariants = [
  // default variant + theme combinations (outlined 제외)
  {
    variant: "default",
    theme: "default",
    class: "bg-primary-normal text-white hover:bg-primary-strong active:bg-primary-heavy",
  } as const,
  {
    variant: "default",
    theme: "assistive",
    class:
      "bg-cool-neutral-50/8 text-label-neutral/88 hover:bg-label-assistive/60 active:bg-label-assistive/80",
  } as const,
  // outlined variant + theme combinations
  {
    variant: "outlined",
    theme: "default",
    class:
      "border-primary-normal text-primary-normal hover:bg-primary-normal/10 active:bg-primary-normal/20",
  } as const,
  {
    variant: "outlined",
    theme: "secondary",
    class:
      "border-cool-neutral-50/16 text-primary-normal hover:bg-label-assistive/60 active:bg-label-assistive/80 disabled:text-label-neutral/38",
  } as const,
  {
    variant: "outlined",
    theme: "assistive",
    class:
      "border-cool-neutral-50/16 text-label-neutral/88 hover:bg-label-assistive/60 active:bg-label-assistive/80",
  } as const,
  // text variant + theme combinations
  {
    variant: "text",
    theme: "default",
    class: "text-primary-normal hover:bg-primary-normal/10 active:bg-primary-normal/20",
  } as const,
  {
    variant: "text",
    theme: "assistive",
    class: "text-label-neutral/88 hover:bg-label-assistive/60 active:bg-label-assistive/80",
  } as const,
];

const iconSize = {
  default: "size-5",
  md: "size-4.5",
  sm: "size-4",
};

const iconOnlySize = {
  default: "size-12 rounded-[0.75rem] [&_svg:not([class*='size-'])]:size-6",
  md: "size-10 rounded-[0.625rem] [&_svg:not([class*='size-'])]:size-5",
  sm: "size-8 rounded-[0.5rem] [&_svg:not([class*='size-'])]:size-4.5",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center disabled:opacity-50 gap-2 disabled:pointer-events-none whitespace-nowrap rounded-md text-sm font-medium transition-all  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "border border-transparent",
        outlined:
          "border border-primary-normal bg-transparent text-primary-normal hover:bg-primary-normal/10 active:bg-primary-normal/20",
        text: "border border-transparent bg-transparent text-primary-normal hover:bg-primary-normal/10 active:bg-primary-normal/20",
      },
      theme: {
        default: "",
        secondary: "",
        assistive: "",
      },
      size: {
        default: "px-7 py-3 rounded-[0.75rem] gap-1.5 font-body1-normal-bold",
        md: "px-5 py-[0.5625rem] rounded-[0.625rem] gap-[0.3125rem] font-body2-normal-bold",
        sm: "px-3.5 py-[0.4375rem] rounded-[0.5rem] gap-1 font-label2-bold",
      },
    },
    compoundVariants: buttonCompoundVariants,
    defaultVariants: {
      variant: "default",
      theme: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  theme,
  loading = false,
  asChild = false,
  LeftIcon,
  RightIcon,
  iconOnly,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const isDisabled = disabled || loading;

  const childrenWithLoader = loading ? (
    <Loader2 className={cn(iconSize[size ?? "default"], "animate-spin")} />
  ) : (
    <>
      {LeftIcon && !iconOnly && <LeftIcon className={cn(iconSize[size ?? "default"])} />}
      {children}
      {RightIcon && !iconOnly && <RightIcon className={cn(iconSize[size ?? "default"])} />}
    </>
  );

  const isOnlyIconContent =
    iconOnly && React.Children.toArray(children).every((ch) => typeof ch === "object");

  if (!isOnlyIconContent) {
    if (iconOnly) {
      // 아이콘 전용 버튼인 경우는 아이콘 컴포넌트만 사용 가능
      // ex) <Button iconOnly><PlusIcon /></Button>
      throw new Error("Button이 iconOnly 모드일 때 텍스트 컨텐츠는 사용할 수 없습니다.");
    }
  }

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, theme }),
        iconOnly && `${iconOnlySize[size ?? "default"]} p-0`,
        className
      )}
      data-slot="button"
      disabled={isDisabled}
      aria-label={isDisabled ? "Disabled" : "Enabled"}
      {...props}
    >
      {childrenWithLoader}
    </Comp>
  );
}

export { Button, buttonVariants };
