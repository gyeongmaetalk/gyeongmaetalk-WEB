import { useEffect, useRef, useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  Modal,
} from "@gyeongmaetalk/ui";

import Image from "~/components/image";

interface ListingCarouselProps {
  images: string[];
}

export default function ListingCarousel({ images }: ListingCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [modalApi, setModalApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalCurrentIndex, setModalCurrentIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isModalInitialScroll = useRef(false);

  const [modalRef] = useOutsideClick<HTMLDivElement>(() => {
    setIsModalOpen(false);
    isModalInitialScroll.current = false;
  });

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCurrentIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  useEffect(() => {
    if (modalApi && modalCurrentIndex !== null) {
      if (isModalInitialScroll.current) {
        modalApi.scrollTo(modalCurrentIndex, true);
        isModalInitialScroll.current = false;
      } else {
        modalApi.scrollTo(modalCurrentIndex);
      }
      modalApi.on("select", () => {
        setModalCurrentIndex(modalApi.selectedScrollSnap());
      });
    }
  }, [modalApi]);

  const onImageClick = (idx: number) => {
    setModalCurrentIndex(idx);
    isModalInitialScroll.current = true;
    setIsModalOpen(true);
  };

  return (
    <>
      <Carousel className="relative" setApi={setApi}>
        <div className="bg-label-neutral font-caption1-regular absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-[18px] px-3 py-1 text-white">
          {currentIndex + 1} / {images.length}
        </div>
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={`${image}-${idx}`}>
              <Image
                src={image}
                alt={`${idx + 1} 이미지`}
                className="aspect-image w-full cursor-pointer object-cover"
                onClick={() => onImageClick(idx)}
                role="button"
                tabIndex={0}
                aria-label={`${idx + 1} 이미지 확대보기`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onImageClick(idx);
                  }
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {isModalOpen && modalCurrentIndex !== null && (
        <Modal className="m-0 bg-transparent p-0">
          <Carousel className="relative" setApi={setModalApi} ref={modalRef}>
            <div className="bg-label-neutral font-caption1-regular absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-[18px] px-3 py-1 text-white">
              {modalCurrentIndex + 1} / {images.length}
            </div>
            <CarouselContent>
              {images.map((image, idx) => (
                <CarouselItem key={`${image}-${idx}`}>
                  <Image src={image} alt={`${idx + 1} 이미지`} className="w-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Modal>
      )}
    </>
  );
}
