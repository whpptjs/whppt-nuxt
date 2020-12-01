import { has } from 'lodash';

export default function($whppt, baseImageUrl, baseCdnImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
  }

  /* @deprecated 2.0 */
  // function getImage(imageId, width, height, crop, blur) {
  //   if (!crop || isEmpty(crop)) return ''; // Empty crop setting means image just changed, shouldn't apply the change yet
  //   if (!imageId) return '';
  //   const { scale, orientation, startX, startY } = crop;
  //   const format = `x_${startX}|y_${startY}|s_${scale}|o_${orientation}|w_${width}|h_${height}${
  //     blur ? `|b_${blur}` : ''
  //   }`;
  //
  //   return `${baseCdnImageUrl || baseImageUrl}/${format}/${imageId}`;
  // }

  /* Example usages */
  // getImage('aaa', 200, 200, crop, blur); // Original with ordered params
  // getImage('aaa', 200, 200, { crop: {...}, format: 'png', transparent: true }); // new way with object

  function buildUrl({ imageId, crop, width, height, blur, format, transparent }) {
    if (!imageId) return '';
    let params = `w=${width}&h=${height}`;
    if (crop) params = `${params}&cx=${crop.left}&cy=${crop.top}&cw=${crop.width}&ch=${crop.height}`;
    if (blur) params = `${params}&b=${blur}`;
    if (format) params = `${params}&f=${format}`;
    if (transparent) params = `${params}&t=${transparent}`;

    return `${baseCdnImageUrl || baseImageUrl}/${imageId}?${params}`;
  }

  function getImage(imageId, width, height, ...args) {
    if (has(args[0], 'top') && has(args[0], 'left') && has(args[0], 'width') && has(args[0], 'height')) {
      const [crop, blur] = args;
      return buildUrl({ imageId, width, height, crop, blur });
    } else {
      return buildUrl({ imageId, width, height, ...args[0] });
    }
  }

  $whppt.originalImageUrl = originalImageUrl;
  $whppt.getImage = getImage;
}
