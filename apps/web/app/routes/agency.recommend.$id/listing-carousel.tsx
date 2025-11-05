import { useEffect, useRef, useState } from "react";

import { useOutsideClick } from "@gyeongmaetalk/hooks";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@gyeongmaetalk/ui";

import insideBuilding from "~/assets/agency-recommend/inside-building.png";
import outsideBuilding from "~/assets/agency-recommend/outside-building.png";
import Image from "~/components/image";
import Modal from "~/components/modal";

const CAROUSEL_ITEMS = [
  {
    id: 1,
    image: outsideBuilding,
    title: "외관",
  },
  {
    id: 2,
    image: insideBuilding,
    title: "도면",
  },
];

export default function ListingCarousel() {
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
          {CAROUSEL_ITEMS[currentIndex].title}
          <div className="size-[3px] rounded-full bg-[#d9d9d9]" />
          {currentIndex + 1} / {CAROUSEL_ITEMS.length}
        </div>
        <CarouselContent>
          {CAROUSEL_ITEMS.map((item, idx) => (
            <CarouselItem key={item.id}>
              <Image
                src={item.image}
                alt={item.title}
                className="w-full cursor-pointer"
                onClick={() => onImageClick(idx)}
                role="button"
                tabIndex={0}
                aria-label={`${item.title} 이미지 확대보기`}
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
              {CAROUSEL_ITEMS[modalCurrentIndex].title}
              <div className="size-[3px] rounded-full bg-[#d9d9d9]" />
              {modalCurrentIndex + 1} / {CAROUSEL_ITEMS.length}
            </div>
            <CarouselContent>
              {CAROUSEL_ITEMS.map((item) => (
                <CarouselItem key={item.id}>
                  <Image src={item.image} alt={item.title} className="w-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Modal>
      )}
    </>
  );
}
