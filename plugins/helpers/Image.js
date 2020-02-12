export default function($whppt, baseImageUrl) {
  const originalImageUrl = imageId => {
    if (!imageId) return '';
    // return `${baseImageUrl}/getImage/${imageId}`;
    return `./${imageId}.png`;
  };

  Object.assign($whppt, {
    originalImageUrl,
  });
}
