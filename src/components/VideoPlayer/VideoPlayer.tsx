import {
  FC, useRef, useEffect
} from 'react';

import Hls from 'hls.js';

type Props = {
  url: string,
  lessonId?: string;
  courseId?: string;
};

export const VideoPlayer: FC<Props> = ({
  url, lessonId, courseId,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current as HTMLVideoElement;
    const courseProgress = courseId ? JSON.parse(localStorage.getItem(courseId) ?? '{}') : {};
    const lessonProgress = lessonId && courseProgress?.[lessonId] ? courseProgress?.[lessonId].sec : 0;

    if (Hls.isSupported() && video) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      video.currentTime = lessonProgress ?? 0;

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data && data.details === Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
          hls.destroy();
          video.poster = 'https://www.pngkit.com/png/detail/930-9306658_404-not-found.png';
        }
      });

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      return () => {
        if (courseId && lessonId && video.currentTime) {
          localStorage.setItem(
            courseId,
            JSON.stringify({ ...courseProgress, [lessonId]: { sec: video.currentTime, watchedDate: Date.now() } })
          );
        }
        hls.destroy();
      };
    }
  }, [url]);
  return (
    <video ref={videoRef} width="100%" height="100%" controls autoPlay muted />
  );
};
