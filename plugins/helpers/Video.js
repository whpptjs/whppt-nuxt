export default function($whppt, baseVideoUrl, baseCdnVideoUrl) {
  function getVideo(videoId) {
    return `${baseCdnVideoUrl || baseVideoUrl}/${videoId}`;
  }

  $whppt.getVideo = getVideo;
}
