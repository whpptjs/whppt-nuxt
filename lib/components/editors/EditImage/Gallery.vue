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
          <!-- <div class="whppt-gallery-item__remove" @click.stop="remove(image._id)"> -->
          <div class="whppt-gallery-item__remove" @click.stop="openDeleteModal(image._id)">
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

    <!-- Delete image dialog -->
    <whppt-dialog v-if="showWarning" :is-active="showWarning" :height="350" :width="800">
      <template v-slot:header>
        <whppt-toolbar>
          <h3>Are you sure?</h3>
        </whppt-toolbar>
      </template>
      <whppt-card class="whppt-dialog__warning">
        <div class="whppt-dialog__warning-message">
          <h4>Are you sure you want to delete this image</h4>
          <p class="whppt-dialog__warning-dependencies">
            <em>Warning: Once you delete this image there is no way to recover it.</em>
          </p>
          <div v-if="foundDependencies.length" class="whppt-dialog__warning-dependencies">
            <p>
              <em>
                The current image is in use on the following page{{ foundDependencies.length !== 1 ? 's' : '' }}
              </em>
            </p>
            <div class="whppt-dialog__warning-dependencies-list">
              <p v-for="dep in foundDependencies" :key="dep._id">
                <em>{{ dep.slug }}</em>
              </p>
            </div>
          </div>
        </div>
        <div class="whppt-dialog__warning-actions">
          <whppt-button v-if="!foundDependencies.length" danger @click="remove()">Delete</whppt-button>
          <whppt-button flat @click="closeDeleteModal()">Cancel</whppt-button>
        </div>
      </whppt-card>
    </whppt-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Trash } from '../../icons';
import WhpptPagination from '../../ui/components/Pagination';
import WhpptDialog from '../../ui/components/Dialog';
import WhpptCard from '../../ui/components/Card';
import WhpptButton from '../../ui/components/Button';
import WhpptToolbar from '../../ui/components/Toolbar';
import Loading from '../../icons/Loading';

export default {
  name: 'EditorGallery',
  components: { Trash, WhpptPagination, WhpptDialog, WhpptCard, WhpptButton, WhpptToolbar, Loading },
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
      imageIdToDelete: '',
      foundDependencies: [],
      showWarning: false,
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
    checkDependencies(id) {
      const params = { imageId: id, type: 'image' };

      this.$axios.$get(`${this.$whppt.apiPrefix}/dependencies/checkDependencies`, { params }).then(dependencies => {
        if (dependencies && dependencies.length) this.foundDependencies = dependencies;
      });
    },
    openDeleteModal(id) {
      this.showWarning = true;
      this.imageIdToDelete = id;
      this.checkDependencies(id);
    },
    closeDeleteModal() {
      this.showWarning = false;
      this.foundDependencies = [];
      this.imageIdToDelete = '';
    },
    remove() {
      return this.$axios.$post(`${this.baseImageUrl}/remove`, { id: this.imageIdToDelete }).then(() => {
        this.$toast.global.editorSuccess('Image deleted');
        this.showWarning = false;
        this.foundDependencies = [];
        this.loadGallery(this.currentPage);
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

.whppt-dialog__warning {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;

  h3,
  h4 {
    font-weight: bold;
  }

  p {
    font-size: 0.75rem;
  }

  &-dependencies {
    color: $warning-500;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
    &-list {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
}

.whppt-dialog__warning-message {
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 1rem;
  }
}

.whppt-dialog__warning-actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;

  button {
    margin-left: 0.5rem;
  }
}
</style>
