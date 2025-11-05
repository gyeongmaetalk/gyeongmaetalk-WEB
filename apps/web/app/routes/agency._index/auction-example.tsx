import { useEffect, useState } from "react";

import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@gyeongmaetalk/ui";

import Autoplay from "embla-carousel-autoplay";

import auctionExampleImaged from "~/assets/auction-example.png";
import Image from "~/components/image";

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
    <Carousel
      className="mb-2 mt-4"
      opts={{ loop: true }}
      setApi={setApi}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent>
        <CarouselItem>
          <Image src={auctionExampleImaged} alt="경매대행 예시 이미지" />
        </CarouselItem>
        <CarouselItem>
          <Image src={auctionExampleImaged} alt="경매대행 예시 이미지" />
        </CarouselItem>
      </CarouselContent>
      <p className="bg-label-neutral font-caption1-regular absolute bottom-2.5 left-1/2 mx-auto -translate-x-1/2 rounded-full px-3 py-1 text-white">
        {currentIndex + 1} / 2
      </p>
    </Carousel>
  );
}
