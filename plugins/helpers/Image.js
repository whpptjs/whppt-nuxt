export default function($whppt) {
  const originalImageUrl = imageId => {
    if (!imageId) return '';
    // return `${$whppt.baseImageUrl}/getImage/${imageId}`;
    return `./${imageId}.png`;
  };

  Object.assign($whppt, {
    originalImageUrl,
  });
}
