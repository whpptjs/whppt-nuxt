export default function($whppt, baseImageUrl) {
  const originalImageUrl = imageId => {
    if (!imageId) return '';
    return `${baseImageUrl}/${imageId}`;
    // return `./${imageId}`;
  };

  Object.assign($whppt, {
    originalImageUrl,
  });
}
