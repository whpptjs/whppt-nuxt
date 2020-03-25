<template>
  <div v-if="pageType.name === 'chapters'" class="whppt-select">
    <label for="bookSelect" class="whppt-select__label">
      Associate this page to a Book
    </label>
    <select id="bookSelect" class="whppt-select__input" @change="selectBook">
      <option value="-1" selected>Please Select...</option>
      <option v-for="(book, bookIndex) in books" :key="bookIndex" :value="bookIndex">{{ book.title }}</option>
    </select>
  </div>
</template>

<script>
import { forEach } from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'ChaptersPageTypes',
  props: {
    pageType: {
      type: [Object, String],
      default: () => ({}),
    },
    slug: {
      type: String,
      default: () => '',
    },
    template: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    books: [],
  }),
  computed: {
    ...mapState('whppt-nuxt/page', ['page']),
  },
  mounted() {
    this.loadBooks();
  },
  methods: {
    loadBooks() {
      this.$axios.get(`${process.env.BASE_API_URL}/api/obj/book`).then(response => {
        this.books = response.data;
      });
    },
    selectBook(event) {
      Object.assign(this.page, { book: { ...this.books[event.target.value] } });
      const slugParts = this.slug.split('/');

      let slug = `${(this.page.book && this.page.book.slug) || 'testing-concat'}`;
      forEach(slugParts, part => {
        slug += `/${part}`;
      });

      this.$emit('applyData', { slug });
    },
  },
};
</script>

<style>
.whppt-select__label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.whppt-select__input {
  background-color: white;
  color: black;
  height: 2.6rem;
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  line-height: 1.25;
  font-size: 0.75rem;
  margin: 0.2rem 0 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
</style>
