<template>
  <div
    v-content="nav.linkGroups"
    class="flex flex-grow items-center relative pl-4 md:pl-8 xl:pl-16 whppt-contents bg-red"
  >
    <div
      v-for="(menu, menuIndex) in nav.linkGroups"
      :key="menuIndex + 1"
      v-whppt-menu="menu"
      class="h-full -mt-2 group-link"
    >
      <button class="menu border-transparent">
        <whppt-link :to="menu" class="-mt-2">{{ menu.text || 'Enter link here' }}</whppt-link>
      </button>
      <div v-if="menu.links" class="absolute shadow-md w-64 group-link__links z-40 opacity-0">
        <div v-if="featuredLink(menu)" class="-mt-1">
          <ul class="bg-white">
            <li v-link="featuredLink(menu)" class="block text-sm bg-red-500 text-white">
              <whppt-link :to="featuredLink(menu)" class="flex flex-col">
                <span class="px-4 py-2">{{ featuredLink(menu).text }}</span>
              </whppt-link>
            </li>
          </ul>
        </div>
        <div v-if="normalLinks(menu)" class="-mt-1">
          <ul class="bg-white">
            <li v-for="(link, linkIndex) in normalLinks(menu)" :key="linkIndex">
              <div
                v-link="link"
                class="block text-sm hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white"
              >
                <whppt-link :to="link" class="flex flex-col">
                  <span class="px-4 py-2">
                    {{ link.text }}
                  </span>
                </whppt-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { filter, find } from 'lodash';

export default {
  name: 'NavbarLinksDesktop',
  props: {
    nav: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activeMenu: undefined,
  }),
  methods: {
    featuredLink(menu) {
      return find(menu.links, l => l.featured);
    },
    normalLinks(menu) {
      if (!this.featuredLink(menu)) return menu.links;
      return filter(menu.links, l => l !== this.featuredLink(menu));
    },
  },
};
</script>
<style scoped>
.group-link__links {
  transition: visibility 300ms, opacity 300ms;
  opacity: 0;
  visibility: hidden;
}
.group-link:hover .group-link__links {
  visibility: visible;
  opacity: 1;
}
.menu:hover {
  border-color: #e52f2f;
}
</style>
