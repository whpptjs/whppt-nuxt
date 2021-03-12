<template>
  <div>
    <!-- Ask for pagetype -->

    <!-- Query pages and show page autocomplete -->
    <whppt-autocomplete
      label="Select a Page"
      :items="pages"
      placeholder="Start typing..."
      info="Search for a page to clone the component into"
    />
    <!-- If multiple contents on a page show select -->
  </div>
</template>

<script>
import WhpptAutocomplete from '../ui/Autocomplete';

export default {
  name: 'DuplicateComponentEditor',
  components: {
    WhpptAutocomplete,
  },
  data: () => ({
    pages: [],
    selectedPageType: null,
  }),
  created() {
    this.loadAllPages();
  },
  methods: {
    loadAllPages() {},
  },
};
</script>

<style lang="scss" scoped></style>
