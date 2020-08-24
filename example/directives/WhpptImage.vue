<template>
  <div
    v-whppt-image="myComponentData"
    data-sizes='{ "desktop": { "width": 300, "height": 300, "quality": 1, "aspectRatio": 1 } }'
  >
    <img
      :src="$whppt.getImage(myComponentData.image.imageId, 300, 300, myComponentData.image.desktop)"
      :alt="myComponentData.image.alt"
    />
  </div>
</template>

<script>
export default {
  name: 'WhpptImageDirectiveExample',
  data: () => ({
    myComponentData: {
      image: {
        imageId: '',
        alt: '',
      },
    },
  }),
};
</script>
