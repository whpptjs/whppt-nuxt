import { isEmpty } from 'lodash';
export default function($whppt, baseImageUrl, baseCdnImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
  }

  function getImage(imageId, width, height, crop, blur) {
    if (!crop || isEmpty(crop)) return ''; // Empty crop setting means image just changed, shouldn't apply the change yet
    if (!imageId) return '';
    const { scale, orientation, startX, startY } = crop;
    const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${width}|h_${height}${
      blur ? `|b_${blur}` : ''
    }`;

    return `${baseCdnImageUrl || baseImageUrl}/${format}/${imageId}`;
  }

  $whppt.originalImageUrl = originalImageUrl;
  $whppt.getImage = getImage;
}
