<template>
  <div>
    <p class="font-xl whppt-header">Edit Link</p>
    <e-link :data="$whppt.editData"></e-link>
  </div>
</template>

<script>
import ELink from '../whpptComponents/Link';

export default {
  name: 'EditorLink',
  components: { ELink },
};
</script>
