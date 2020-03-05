<template>
  <section
    v-whppt-colours="content"
    :class="!content.backgroundColour && !content.fontColour ? 'text-black bg-white' : ''"
  >
    <div>
      <div class="block lg:flex" :class="{ 'flex-row-reverse': content.reversed }">
        <div class="w-full lg:w-7/12">
          <div
            v-edit-image="content"
            data-sizes='{ "desktop": { "width": 800, "height": 800, "quality": 4 } }'
            class="relative bg-cover bg-no-repeat bg-center pb-56 bg-red-500"
            :style="
              `background-image: url(${$whppt.getImage(content.image.imageId, 800, 800, content.image.crop.desktop)})`
            "
          >
            <whppt-link
              v-link="content.imageCaption"
              :to="content.imageCaption"
              class="absolute bottom-0 left-0 mb-4 ml-4 text-white"
            >
            </whppt-link>
          </div>
        </div>
        <div class="relative w-full lg:w-5/12 p-8 lg:p-0 flex items-center">
          <div class="w-full lg:absolute" :class="content.reversed ? 'lg:-right-8' : 'lg:-left-8'">
            <h2 v-plain-text="content" data-property="title" class="mt-8 mb-8 pl-8 lg:pl-16 text-5xl font-bold">
              {{ content.title || 'Title Text' }}
            </h2>
            <div v-list="{ data: content, addNew }" data-property="links" class="pt-8">
              <div
                v-for="(link, linkIndex) in content.links"
                :key="`link-${linkIndex}`"
                v-link="link"
                class="relative flex flex-col"
              >
                <whppt-link
                  v-if="link && link.href"
                  :to="link"
                  class="parent flex text-lg w-full items-center pl-8 lg:pl-16 cursor-pointer"
                >
                  <div class="w-full flex">
                    <span class="mr-auto w-full flex items-center">{{ link.text || 'Link Text' }}</span>
                    <span class="h-full bg-black ml-auto p-3 opacity-0 parent-hover:opacity-100">-></span>
                  </div>
                </whppt-link>
                <span v-if="!link.href">Missing Hyperlink Attribute</span>
                <hr class="lg:absolute w-full border-0 border-b border-gray-300 opacity-25 bottom-0" />
              </div>
              <div v-if="!content.links.length">Add New Link Group</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ImageNavigation',
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    addNew() {
      this.content.links.push({
        text: '',
        href: '/',
        type: 'page',
      });
    },
  },
};
</script>
