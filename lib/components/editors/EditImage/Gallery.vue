<template>
  <div>
    <loading v-if="loading" />
    <div v-else class="whppt-gallery-container">
      <div class="whppt-gallery-item-container" :style="`flex-basis: ${imageDisplaySize}`">
        <div id="new-image-button" class="whppt-gallery__add" @click="$refs.fileInput.click()">
          <input ref="fileInput" type="file" :accept="'image/*'" style="display: none;" @input="upload" />
          <span>+</span>
        </div>
      </div>
      <div v-if="newImageLoading" class="whppt-gallery-item-container" :style="`flex-basis: ${imageDisplaySize}`">
        <div class="whppt-gallery__new">
          <loading />
        </div>
      </div>
      <div
        v-for="image in images"
        :key="image._id"
        class="whppt-gallery-item-container"
        :style="`flex-basis: ${imageDisplaySize}`"
      >
        <div
          :style="`background-image: url(${img(image._id)})`"
          class="whppt-gallery-item"
          @click="$emit('input', image._id)"
        >
          <div class="whppt-gallery-item__remove" @click.stop="remove(image._id)">
            <trash class="whppt-gallery-item__remove-icon" />
          </div>
        </div>
      </div>
    </div>
    <whppt-pagination
      :page.sync="currentPage"
      :per-page.sync="limitPerPage"
      :total="total || (images && images.length)"
      direction="up"
      class="whhpt-gallery__pagination"
      @update:page="loadGallery"
      @update:perPage="loadGallery"
    />

    <div v-if="dependencies.length" class="whppt-gallery__warning-message">
      <h4>Warning: this image is in use on the following pages:</h4>
      <div v-for="dep in dependencies" :key="dep._id" class="whppt-gallery__warning-dependencies">/{{ dep.slug }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Trash } from '../../icons';
import WhpptPagination from '../../ui/components/Pagination';
import Loading from '../../icons/Loading';

export default {
  name: 'EditorGallery',
  components: { Trash, WhpptPagination, Loading },
  props: {
    value: {
      type: String,
      default: () => '',
    },
    imageDisplaySize: {
      type: String,
      default: '50%',
    },
    limit: {
      type: Number,
      default: 9,
    },
  },
  data() {
    return {
      loading: false,
      newImageLoading: false,
      images: [],
      total: 0,
      currentPage: 1,
      limitPerPage: this.limit,
      dependencies: [],
    };
  },
  computed: {
    ...mapState('whppt/editor', ['baseImageUrl', 'baseCdnImageUrl']),
  },
  mounted() {
    this.loading = true;
    return this.loadGallery(this.currentPage).then(() => (this.loading = false));
  },
  methods: {
    loadGallery() {
      return this.$axios
        .$get(`${this.$whppt.apiPrefix}/image/loadGallery`, {
          params: { limit: this.limitPerPage, currentPage: this.currentPage },
        })
        .then(({ images, total }) => {
          this.images = images;
          this.total = total;
        });
    },
    img(id) {
      return `${this.baseCdnImageUrl || this.baseImageUrl}/${id}?w=360&h=200`;
    },
    upload(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.newImageLoading = true;

      return this.$axios
        .$post(`${this.baseImageUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => this.loadGallery(1))
        .then(() => (this.newImageLoading = false));
    },
    remove(id) {
      return this.$axios
        .$get(`${this.$whppt.apiPrefix}/dependencies/checkDependencies`, { params: { imageId: id, type: 'image' } })
        .then(dependencies => {
          this.dependencies = dependencies;

          if (dependencies.length) return;

          return this.$axios.$post(`${this.baseImageUrl}/remove`, { id }).then(() => {
            this.$toast.global.editorSuccess('Image Deleted');
            this.loadGallery(this.currentPage);
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$warning-500: #f59e0b;

.whppt-gallery-container {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;
}

.whppt-gallery__add {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-color: white;
  border-width: 1px;
  border-style: dashed;
  font-size: 40px;
  cursor: pointer;
}

.whppt-gallery__add:hover {
  background: white;
  color: black;
}

.whppt-gallery__new {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: linear-gradient(45deg, #444 0%, #666 50%, #888 100%);
}

.whppt-gallery-item-container {
  flex-basis: 50%;
  padding: 5px;
}

.whppt-gallery-item-container div:hover {
  filter: brightness(1.1);
}

.whppt-gallery-item-container div:hover .whppt-gallery-item__remove {
  display: inline-flex;
}

.whppt-gallery-item {
  height: 100px;
  cursor: pointer;
  background-color: grey;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.whppt-gallery-item__remove {
  background: black;
  display: none;
  align-items: center;
  justify-content: center;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: relative;
  left: 5%;
  top: 5%;
}

.whppt-gallery-item__remove-icon {
  width: 12px;
}

.whhpt-gallery__pagination {
  margin-top: 16px;
}

.whppt-gallery__warning-message {
  color: $warning-500;
  margin-top: 1rem;
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 1rem;
  }
}

.whppt-gallery__warning-dependencies {
  color: $warning-500;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
}
</style>
