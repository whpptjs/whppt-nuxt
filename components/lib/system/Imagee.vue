<template>
  <div class="whppt-full">
    <h1>HAHA</h1>
    <!-- <whppt-tabs>
      <whppt-tab> </whppt-tab>
      <whppt-tab> </whppt-tab>
    </whppt-tabs> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhpptTabs from './WhpptTabs';
import WhpptTab from './WhpptTab';
import WhpptTextInput from './WhpptTextInput';

export default {
  name: 'EditorImageEdit',
  components: { WhpptTextInput, WhpptTabs, WhpptTab },
  computed: mapState('whppt-nuxt/editor', ['selectedComponent']),
};
</script>
<style scoped>
.whppt-tabs {
  display: flex;
  padding-bottom: 1.5rem;
  padding-left: 0;
}

.whppt-tabs__info {
  padding: 0 1.25rem;
  color: gray;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.whppt-input-half {
  padding: 0 0.5rem;
}
</style>
