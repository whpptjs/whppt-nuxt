import { has } from 'lodash';

export default function($whppt, baseImageUrl, baseCdnImageUrl) {
  function originalImageUrl(imageId) {
    if (!imageId) return '';

    return `${baseImageUrl}/${imageId}`;
  }

  function buildUrl({ imageId, crop, width, height, blur, format, transparent = 'true', scale }) {
    if (!imageId) return '';

    const _params = [];

    if (width !== 'auto' && width) _params.push(`w=${width}`);
    if (height !== 'auto' && height) _params.push(`w=${height}`);
    if (crop) _params.push(`cx=${crop.left}&cy=${crop.top}&cw=${crop.width}&ch=${crop.height}`);
    if (blur) _params.push(`b=${blur}`);
    if (format) _params.push(`f=${format}`);
    if (transparent) _params.push(`t=${transparent}`);
    if (scale) _params.push(`s=${scale}`);

    const params = _params.join('&');
    console.log('🚀 ~ file: Image.js ~ line 24 ~ buildUrl ~ params', params);

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

  Object.assign($whppt, { originalImageUrl, getImage });
}
