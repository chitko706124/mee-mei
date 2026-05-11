"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";

interface CarouselSectionProps {
  title: string;
  children: React.ReactNode[];
}

export function CarouselSection({ title, children }: CarouselSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const router = useRouter();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className=" ">
      <div className="container h-full mx-auto px-2">
        <div className="flex items-center justify-end mb-6">
          {/* <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {title}
          </h2> */}

          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}

          <div>
            <Button onClick={() => router.push(`/${title}`)} variant="outline">
              VIEW ALL
            </Button>
          </div>
        </div>

        {/* <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {children.map((child, index) => (
              <div key={index} className="embla__slide flex-none w-56">
                {child}
              </div>
            ))}
          </div>
        </div> */}
        <div className="relative">
          {/* Embla Carousel with mask */}
          <div
            className="embla overflow-hidden [mask-image:linear-gradient(90deg,black_70%,transparent_98%)]"
            ref={emblaRef}
          >
            <div className="embla__container flex gap-4">
              {children.map((child, index) => (
                <div key={index} className="embla__slide flex-none w-56">
                  {child}
                </div>
              ))}
            </div>
          </div>

          {/*         
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background via-background to-transparent pointer-events-none" />

       
          <div className="absolute right-0 top-0 bottom-0 w-8 backdrop-blur-[1px] bg-gradient-to-l from-background/20 to-transparent pointer-events-none" /> */}
        </div>
      </div>
    </section>
  );
}
