import { useRef, memo, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Room } from '../../../../../api/hotel/types';
import 'swiper/css';
import 'swiper/css/pagination';
import './RoomMedia.css';

interface RoomMediaProps {
  room: Room;
}

function RoomMediaComponent({ room }: RoomMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { hasVideo, imageUrls, videoUrl } = useMemo(() => {
    const video = !!room.properties?.video_url?.med;
    const images = room.properties?.room_images?.[0]?.image_urls || [];
    const videoUrl = room.properties?.video_url?.med;
    return {
      hasVideo: video,
      imageUrls: images,
      videoUrl,
    };
  }, [room.properties?.video_url?.med, room.properties?.room_images]);

  const paginationConfig = useMemo(() => ({
    clickable: imageUrls.length > 1,
  }), [imageUrls.length]);

  if (hasVideo) {
    return (
      <div className="room-video">
        <video
          ref={videoRef}
          preload="metadata"
          loop
          muted
          playsInline
          src={videoUrl}
        />
      </div>
    );
  }

  if (imageUrls.length > 0) {
    return (
      <div className="room-images">
        <Swiper
          modules={[Pagination]}
          pagination={paginationConfig}
          spaceBetween={0}
          slidesPerView={1}
          width={null}
          className="room-images-swiper"
          style={{ width: '100%' }}
        >
          {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <picture>
                <source srcSet={imageUrl} type="image/jpeg" />
                <img loading="lazy" src={imageUrl} alt={`${room.name} - Image ${index + 1}`} />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return null;
}

export const RoomMedia = memo(RoomMediaComponent);


