import { useEffect, RefObject } from 'react';

export function useVideoIntersection(cardRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video?.play();
          } else {
            video?.pause();
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px' }
    );

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video') as HTMLVideoElement | null;
          if (video) {
            video.setAttribute('preload', entry.isIntersecting ? 'auto' : 'metadata');
          }
        });
      },
      { threshold: 0, rootMargin: '300px' }
    );

    playObserver.observe(cardElement);
    preloadObserver.observe(cardElement);

    return () => {
      playObserver.disconnect();
      preloadObserver.disconnect();
    };
  }, [cardRef]);
}


