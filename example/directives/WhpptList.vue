<template>
  <div v-whppt-list="{ data: myComponentData, addNew: pushNewToListItems }" data-property="listItems">
    <div v-for="(listItem, index) in myComponentData.listItems" :key="index">{{ listItem.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  data: () => ({
    myComponentData: {
      listItems: [],
    },
  }),
  methods: {
    pushNewToListItems() {
      this.myComponentData.listItems.push({ text: 'New List Item' });
    },
  },
};
</script>
