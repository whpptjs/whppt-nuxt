<template>
  <div>
    <loading v-if="loading" />
    <div v-else class="whppt-gallery-container">
      <div class="whppt-gallery-item-container" :style="`flex-basis: ${imageDisplaySize}`">
        <div class="whppt-gallery__add" @click="$refs.fileInput.click()" id="new-image-button">
          <input ref="fileInput" type="file" :accept="'image/*'" style="display: none;" @input="upload" />
          <span>+</span>
        </div>
      </div>
      <div class="whppt-gallery-item-container" :style="`flex-basis: ${imageDisplaySize}`" v-if="newImageLoading">
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
          class="whppt-gallery-item"
          :style="{ 'background-image': `url('${img(image._id)}')` }"
          @click="$emit('input', image._id)"
        >
          <div class="whppt-gallery-item__remove" @click.stop="remove(image._id)">
            <trash class="whppt-gallery-item__remove-icon" />
          </div>
        </div>
      </div>
      <whppt-pagination
        :current-page="currentPage"
        :total="total"
        :page-amount="Math.ceil(total / limit)"
        @pageChanged="loadGallery"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import icons from '../../icons';
import WhpptPagination from '../../whpptComponents/WhpptPagination';
import Loading from '../../icons/Loading';

export default {
  name: 'EditorGallery',
  components: { Trash: icons.Trash, WhpptPagination, Loading },
  props: {
    value: {
      type: String,
      default: () => '',
    },
    limit: {
      type: Number,
      default: 9,
    },
    imageDisplaySize: {
      type: String,
      default: '50%',
    },
  },
  computed: {
    ...mapState('whppt-nuxt/editor', ['baseImageUrl', 'baseAPIUrl']),
  },
  mounted() {
    this.loading = true;
    return this.loadGallery(this.currentPage).then(() => (this.loading = false));
  },
  data() {
    return {
      loading: false,
      newImageLoading: false,
      images: [],
      total: 0,
      // limit: 9,
      currentPage: 1,
    };
  },
  methods: {
    loadGallery(currentPage) {
      this.currentPage = currentPage;
      return this.$axios
        .get(`${this.baseAPIUrl}/api/image/loadGallery`, {
          params: { limit: this.limit, currentPage: this.currentPage },
        })
        .then(({ data: { images, total } }) => {
          this.images = images;
          this.total = total;
        });
    },
    img(id) {
      return `${this.baseImageUrl}/${id}`;
    },
    upload(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.newImageLoading = true;
      return this.$axios
        .post(`${this.baseImageUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => this.loadGallery(1))
        .then(() => {
          this.newImageLoading = false;
        });
    },
    remove(id) {
      return this.$axios
        .post(`${this.baseAPIUrl}/api/image/remove`, { id })
        .then(() => this.loadGallery(this.currentPage));
    },
  },
};
</script>
<style scoped>
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
  background: grey;
  height: 100px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
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
</style>
