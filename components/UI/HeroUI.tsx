import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import useMediaQuery from "@/hooks/user-media-query";

const DESKTOP_HERO_IMAGES = [
  "hero-image-9.jpeg",
  "hero-image-4.jpeg",
  "hero-image-3.jpeg",
  "hero-image-4.jpeg",
  "hero-image-5.jpeg",
];

const MOBILE_HERO_IMAGES = [
  "hero-image-1.jpeg",
  "hero-image-2.jpeg",
  "hero-image-3.jpeg",
  "hero-image-4.jpeg",
  "hero-image-6.jpeg",
  "hero-image-7.jpeg",
];

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_S3_URL}/${src}?w=${width}&q=${
    quality || 75
  }`;
};

const HeroUI = () => {
  const isBreakPoint = useMediaQuery(600);

  let images = isBreakPoint ? MOBILE_HERO_IMAGES : DESKTOP_HERO_IMAGES;

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
    >
      {images.map((url, index) => (
        <Image
          key={index}
          loader={myLoader}
          src={url}
          alt="Picture of the author"
          width={200}
          height={500}
          priority
        />
      ))}
    </Carousel>
  );
};

export default React.memo(HeroUI);
