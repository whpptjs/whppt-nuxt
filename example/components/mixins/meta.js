const mixin = {
  head() {
    console.log('head -> this.siteSettings', this.siteSettings);
    const page = this.page || {};
    const site = this.siteSettings || {};
    const og = this.og || {};
    const twitter = this.twitter || {};

    return {
      title:
        (page && page.title) ||
        (page.header && page.header.title) ||
        (page.header && page.header.heading) ||
        (site && site.title) ||
        '',
      titleTemplate: '%s | Barossa',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: page.description || twitter.description || og.description || site.description || '',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: page.keywords || twitter.keywords || og.keywords || site.keywords || '',
        },
        {
          hid: 'ogTitle',
          name: 'og:title',
          property: 'og:title',
          content:
            og.title ||
            page.title ||
            (page.header && page.header.title) ||
            (page.header && page.header.heading) ||
            twitter.title ||
            (site && site.title) ||
            '',
        },
        {
          hid: 'ogDescriptions',
          name: 'og:description',
          property: 'og:description',
          content: og.description || page.description || site.description || '',
        },
        {
          hid: 'ogKeywords',
          name: 'og:keywords',
          property: 'og:keywords',
          content: og.keywords || page.keywords || site.keywords || '',
        },
        { hid: 'ogUrl', name: 'og:url', property: 'og:url', content: og.url || twitter.url },
        { hid: 'ogImage', name: 'og:image', property: 'og:image', content: og.image || twitter.image },
        // { hid: 'ogType', name: 'og:type', property: 'og:type', content: 'website' },
        // { hid: 'twitterCard', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        {
          hid: 'twitterTitle',
          name: 'twitter:title',
          property: 'twitter:title',
          content:
            twitter.title ||
            page.title ||
            (page.header && page.header.title) ||
            (page.header && page.header.heading) ||
            og.title ||
            (site && site.title) ||
            '',
        },
        {
          hid: 'twitterDescription',
          name: 'twitter:description',
          property: 'twitter:description',
          content: twitter.description || page.description || site.description || '',
        },
        {
          hid: 'twitterKeywords',
          name: 'twitter:keywords',
          property: 'twitter:keywords',
          content: twitter.keywords || page.keywords || site.keywords || '',
        },
        { hid: 'twitterUrl', name: 'twitter:url', property: 'twitter:url', content: twitter.url || og.url },
        { hid: 'twitterImage', name: 'twitter:image', property: 'twitter:image', content: twitter.image || og.image },
      ],
    };
  },
  computed: {
    og() {
      return {
        title:
          (this.page && this.page.og && this.page.og.title) ||
          (this.siteSettings && this.siteSettings.og && this.siteSettings.og.title),
        description:
          (this.page && this.page.og && this.page.og.description) ||
          (this.siteSettings && this.siteSettings.og && this.siteSettings.og.description),
        keywords:
          (this.page && this.page.og && this.page.og.keywords) ||
          (this.siteSettings && this.siteSettings.og && this.siteSettings.og.keywords),
        url: this.page && this.page.slug && `${process.env.BASE_URL}/${this.page.slug}`,
        image:
          (this.page &&
            this.page.og &&
            this.page.og.image &&
            this.page.twitter.image.crop &&
            this.$whppt.getImage(this.page.og.image.imageId, 400, 209, this.page.og.image.crop.desktop)) ||
          (this.siteSettings &&
            this.siteSettings.og &&
            this.siteSettings.og.image &&
            this.siteSettings.twitter.image.crop &&
            this.$whppt.getImage(
              this.siteSettings.og.image.imageId,
              400,
              209,
              this.siteSettings.og.image.crop.desktop
            )),
      };
    },
    twitter() {
      return {
        title:
          (this.page && this.page.twitter && this.page.twitter.title) ||
          (this.siteSettings && this.siteSettings.twitter && this.siteSettings.twitter.title),
        description:
          (this.page && this.page.twitter && this.page.twitter.description) ||
          (this.siteSettings && this.siteSettings.twitter && this.siteSettings.twitter.description),
        keywords:
          (this.page && this.page.twitter && this.page.twitter.keywords) ||
          (this.siteSettings && this.siteSettings.twitter && this.siteSettings.twitter.description),
        url: this.page && this.page.slug && `${process.env.BASE_URL}/${this.page.slug}`,
        image:
          (this.page &&
            this.page.twitter &&
            this.page.twitter.image &&
            this.page.twitter.image.crop &&
            this.$whppt.getImage(this.page.twitter.image.imageId, 400, 209, this.page.twitter.image.crop.desktop)) ||
          (this.siteSettings &&
            this.siteSettings.twitter &&
            this.siteSettings.twitter.image &&
            this.siteSettings.twitter.image.crop &&
            this.$whppt.getImage(
              this.siteSettings.twitter.image.imageId,
              400,
              209,
              this.siteSettings.twitter.image.crop.desktop
            )),
      };
    },
  },
};

export default mixin;
