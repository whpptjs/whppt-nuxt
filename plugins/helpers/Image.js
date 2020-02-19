export default function($whppt, baseImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
  }

  function getImage(content, w, h) {
    if (!content.image.imageId) return '';
    const { scale, orientation, startX, startY } = content.image.crop.desktop;
    const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${w}|h_${h}`;

    return `${baseImageUrl}/${format}/${content.image.imageId}`;
  }

  $whppt.originalImageUrl = originalImageUrl;
  $whppt.getImage = getImage;
}
