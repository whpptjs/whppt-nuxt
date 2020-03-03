const mixin = {
  head() {
    const page = this.page || {};
    const site = this.siteSettings || {};
    const og = this.og || {};
    const twitter = this.twitter || {};

    return {
      title: (page && page.title) || (site && site.title) || '',
      titleTemplate: '%s | Example',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: (page && page.description) || (site && site.description) || '',
        },
        { hid: 'keywords', name: 'keywords', content: (page && page.keywords) || (site && site.keywords) || '' },
        { hid: 'ogTitle', name: 'og:title', property: 'og:title', content: og.title },
        {
          hid: 'ogDescriptions',
          name: 'og:description',
          property: 'og:description',
          content: page.description,
        },
        { hid: 'ogUrl', name: 'og:url', property: 'og:url', content: og.url },
        { hid: 'ogImage', name: 'og:image', property: 'og:image', content: og.image },
        // { hid: 'ogType', name: 'og:type', property: 'og:type', content: 'website' },
        // { hid: 'twitterCard', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitterTitle', name: 'twitter:title', property: 'twitter:title', content: twitter.title || og.title },
        {
          hid: 'twitterDescription',
          name: 'twitter:description',
          property: 'twitter:description',
          content: page.description,
        },
        { hid: 'twitterUrl', name: 'twitter:url', property: 'twitter:url', content: twitter.url || og.url },
        { hid: 'twitterImage', name: 'twitter:image', property: 'twitter:image', content: twitter.image || og.image },
      ],
    };
  },
  computed: {
    og() {
      return {
        title: this.page && this.page.og && this.page.og.title,
        description: this.page && this.page.og && this.page.og.description,
        url: this.page && this.page.slug && `${process.env.BASE_API_URL}/${this.page.slug}`,
        image:
          this.page &&
          this.page.og &&
          this.page.og.image &&
          this.page.twitter.image.crop &&
          this.$whppt.getImage(this.page.og.image.imageId, 400, 209, this.page.og.image.crop.desktop),
      };
    },
    twitter() {
      return {
        title: this.page && this.page.twitter && this.page.twitter.title,
        description: this.page && this.page.twitter && this.page.twitter.description,
        url: this.page && this.page.slug && `${process.env.BASE_API_URL}/${this.page.slug}`,
        image:
          this.page &&
          this.page.twitter &&
          this.page.twitter.image &&
          this.page.twitter.image.crop &&
          this.$whppt.getImage(this.page.twitter.image.imageId, 400, 209, this.page.twitter.image.crop.desktop),
      };
    },
  },
};

export default mixin;
