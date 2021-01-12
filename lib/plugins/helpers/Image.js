import { has } from 'lodash';

export default function($whppt, baseImageUrl, baseCdnImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
  }

  /* Example usages */
  // getImage('aaa', 200, 200, crop, blur); // Original with ordered params
  // getImage('aaa', 200, 200, { crop: {...}, format: 'png', transparent: true }); // new way with object

  function buildUrl({ imageId, crop, width, height, blur, format, transparent = 'true', scale }) {
    if (!imageId) return '';
    let params = `w=${width}&h=${height}`;
    if (crop) params = `${params}&cx=${crop.left}&cy=${crop.top}&cw=${crop.width}&ch=${crop.height}`;
    if (blur) params = `${params}&b=${blur}`;
    if (format) params = `${params}&f=${format}`;
    if (transparent) params = `${params}&t=${transparent}`;
    if (scale) params = `${params}&s=${scale}`;

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
