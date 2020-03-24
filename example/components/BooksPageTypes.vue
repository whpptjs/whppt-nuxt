<template>
  <div>{{ books.length }} Books loaded</div>
</template>

<script>
export default {
  name: 'ChaptersPageTypes',
  data: () => ({
    books: [],
  }),
  mounted() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      this.$axios.get(`${process.env.BASE_API_URL}/api/obj/book`).then(response => {
        this.books = response.data;
      });
    },
  },
};
</script>
