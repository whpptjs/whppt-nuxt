<template>
  <form class="p-8" @submit.prevent>
    <div class="w-full flex items-center mb-4">
      <h3 class="font-bold">Stories</h3>
      <button aria-label="Create New Story" class="whppt-settings__button" @click="newStoryVisible = !newStoryVisible">
        Create story
      </button>
    </div>
    <modal :is-active="newStoryVisible" @closeModal="newStoryVisible = false">
      <template v-slot:content>
        <div class="relative bg-white rounded shadow-lg" style="height: 80vh; width: 75%;">
          <div class="whppt-settings__heading whppt-flex-between">
            <p class="whppt-settings__heading-text">New Story</p>
          </div>
          <form @submit.prevent>
            <fieldset>
              <label for="title">Title</label>
              <input id="title" v-model="newStory.title" placeholder="Title" />
            </fieldset>
            <fieldset>
              <label for="slug">Slug</label>
              <input id="slug" v-model="newStory.slug" placeholder="eg. my-new-story" />
              <div class="italic text-sm text-gray-800">Your slug: {{ formatSlug(newStory.slug) }}</div>
            </fieldset>
            <fieldset>
              <label for="description">Description</label>
              <textarea id="description" v-model="newStory.description" rows="3" placeholder="Description" />
            </fieldset>
            <button class="whppt-settings__button" @click="createStory">Create</button>
          </form>
        </div>
      </template>
    </modal>
    <table class="w-full table-fixed">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2">Slug</th>
          <th class="px-4 py-2 w-2/12">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(story, storyIndex) in stories"
          :key="`story-${storyIndex}`"
          :class="{ 'bg-gray-200': storyIndex % 2 === 0 }"
        >
          <td class="border px-4 py-2">{{ story.title }}</td>
          <td class="border px-4 py-2">{{ story.slug }}</td>
          <td class="border px-4 py-2">
            <button aria-label="" class="hover:text-red-700" @click="deleteStory(story)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
import { remove } from 'lodash';
import slugify from 'slugify';
import Modal from '~/components/Modal';

const blankStory = {
  title: '',
  description: '',
  slug: '',
  chapters: [],
  header: { image: { imageId: '', crop: {} } },
  upNext: {
    inContainer: true,
    heading: '',
    link: { text: '', href: '', type: 'page' },
    subtitle: '',
    image: { imageId: '', crop: {} },
  },
};

export default {
  name: 'ChaptersSettings',
  components: {
    Modal,
  },
  data: () => ({
    stories: [],
    newStory: blankStory,
    newStoryVisible: false,
  }),
  mounted() {
    this.loadStories();
  },
  methods: {
    formatSlug(slug) {
      if (slug.startsWith('/')) slug = slug.replace(/^(\/*)/, '');

      slug = slug.replace(/\/{2,}/g, '/');

      slug = slugify(slug, { remove: /[*+~.()'"!:@]/g, lower: true });
      slug = slug.replace(/[#?]/g, '');

      return slug;
    },
    loadStories() {
      this.$axios
        .get(`${process.env.BASE_API_URL}/api/obj/story`)
        .then(response => {
          const { data } = response;
          this.stories = data;
          this.resetLoading();
        })
        .catch(err => {
          this.setError(err.message);
        });
    },
    createStory() {
      this.newStory.slug = this.formatSlug(this.newStory.slug || this.newStory._id);

      this.$axios
        .post(`${process.env.BASE_API_URL}/api/obj/story`, this.newStory)
        .then(response => {
          const createdStory = response.data;
          this.stories.push(createdStory);
          this.newStory = blankStory;
          this.resetLoading();
        })
        .catch(err => {
          this.setError(err.message);
        });
    },
    deleteStory(story) {
      this.resetLoading();

      // TODO: Consider Stories with existing chapters.
      this.$axios
        .delete(`${process.env.BASE_API_URL}/api/obj/story/${story._id}`)
        .then(() => {
          this.stories = remove(this.stories, s => s._id !== story._id);
        })
        .catch(err => {
          this.setError(err.message);
        });
    },
  },
};
</script>
