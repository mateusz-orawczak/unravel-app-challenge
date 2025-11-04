import './HotelImage.css';

interface ImageObject {
  twoX?: {
    landscape?: string;
    square?: string;
  };
  threeX?: {
    landscape?: string;
    square?: string;
  };
}

interface HotelImageProps {
  images?: ImageObject[];
  alt: string;
}

export function HotelImage({ images, alt }: HotelImageProps) {
  const image = images?.[0];
  
  if (!image) {
    return null;
  }

  const twoXDesktop = image.twoX?.landscape;
  const threeXDesktop = image.threeX?.landscape;
  const twoXMobile = image.twoX?.square;
  const threeXMobile = image.threeX?.square;
  
  const fallbackSrc = threeXMobile || twoXMobile || threeXDesktop || twoXDesktop;

  if (!fallbackSrc) {
    return null;
  }

  return (
    <div className="hotel-image">
      <picture>
        {threeXDesktop && (
          <source
            srcSet={threeXDesktop}
            media="(min-width: 768px) and (min-resolution: 3dppx), (min-width: 768px) and (-webkit-min-device-pixel-ratio: 3)"
          />
        )}
        {twoXDesktop && (
          <source
            srcSet={twoXDesktop}
            media="(min-width: 768px) and (min-resolution: 2dppx), (min-width: 768px) and (-webkit-min-device-pixel-ratio: 2)"
          />
        )}
        {twoXDesktop && (
          <source
            srcSet={twoXDesktop}
            media="(min-width: 768px)"
          />
        )}
        {threeXMobile && (
          <source
            srcSet={threeXMobile}
            media="(max-width: 767px) and (min-resolution: 3dppx), (max-width: 767px) and (-webkit-min-device-pixel-ratio: 3)"
          />
        )}
        {twoXMobile && (
          <source
            srcSet={twoXMobile}
            media="(max-width: 767px) and (min-resolution: 2dppx), (max-width: 767px) and (-webkit-min-device-pixel-ratio: 2)"
          />
        )}
        <img
          src={fallbackSrc}
          alt={alt}
          loading="lazy"
        />
      </picture>
    </div>
  );
}
