<template>
  <div>
    <h1 class="whppt-header">Edit Link</h1>
    <e-link :data="$whppt.editData"></e-link>
  </div>
</template>

<script>
import ELink from './Link';

export default {
  name: 'EditorLink',
  components: { ELink },
};
</script>
