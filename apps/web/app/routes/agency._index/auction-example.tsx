import { useEffect, useState } from "react";

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@gyeongmaetalk/ui";

import Autoplay from "embla-carousel-autoplay";

import auctionExampleImage1 from "~/assets/auction-example1.webp";
import auctionExampleImage2 from "~/assets/auction-example2.webp";
import Image from "~/components/image";

const getAuctionExampleTitle = (currentIndex: number) => {
  if (currentIndex === 0) {
    return (
      <p className="font-heading2-bold text-label-strong">
        경매톡에서 경매대행 시
        <br />
        <span className="text-primary-normal">무료로 추천매물</span>을 받아 볼 수 있어요!
      </p>
    );
  }
  return (
    <p className="font-heading2-bold text-label-strong">
      나에게 딱 맞는 <span className="text-primary-normal">추천매물</span>로
      <br />
      성공적인 경매를 진행해보세요
    </p>
  );
};

export default function AuctionExample() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (api) {
      api.on("select", () => {
        setCurrentIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  return (
    <>
      {getAuctionExampleTitle(currentIndex)}
      <Carousel
        className="mt-4 mb-2"
        opts={{ loop: true }}
        setApi={setApi}
        plugins={[Autoplay({ delay: 3000 })]}
      >
        <CarouselContent>
          <CarouselItem>
            <Image src={auctionExampleImage1} alt="경매대행 예시 이미지" />
          </CarouselItem>
          <CarouselItem>
            <Image src={auctionExampleImage2} alt="경매대행 예시 이미지" />
          </CarouselItem>
        </CarouselContent>
        <p className="bg-label-neutral font-caption1-regular absolute bottom-2.5 left-1/2 mx-auto -translate-x-1/2 rounded-full px-3 py-1 text-white">
          {currentIndex + 1} / 2
        </p>
      </Carousel>
    </>
  );
}
