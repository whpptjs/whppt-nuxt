export default function($whppt, baseImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
  }

  function getImage(imageId, width, height, crop = { scale: 'auto', orientation: 'auto', startX: 0, startY: 0 }) {
    if (!imageId) return;
    const { scale, orientation, startX, startY } = crop;
    const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${width}|h_${height}`;

    return `${baseImageUrl}/${format}/${imageId}`;
  }

  $whppt.originalImageUrl = originalImageUrl;
  $whppt.getImage = getImage;
}
