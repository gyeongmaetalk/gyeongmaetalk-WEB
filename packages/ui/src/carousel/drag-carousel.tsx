"use client";

import { cn } from "@gyeongmaetalk/utils";

import type { ReactNode } from "react";

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from ".";

interface DragCarouselProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
  setApi?: (api: CarouselApi | null) => void;
}

export function DragCarousel({
  children,
  className,
  contentClassName,
  containerClassName,
  setApi,
}: DragCarouselProps) {
  return (
    <Carousel opts={{ dragFree: true }} className={className} setApi={setApi}>
      <CarouselContent containerClassName={containerClassName} className={contentClassName}>
        {children}
      </CarouselContent>
    </Carousel>
  );
}

export function DragCarouselItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <CarouselItem className={cn("flex-none", className)}>{children}</CarouselItem>;
}
