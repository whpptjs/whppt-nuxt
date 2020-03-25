import SiteSettingsChapters from '../components/SiteSettingsChapters';
import PageSettingsChapters from '../components/PageSettingsChapters';
import BooksPageMenu from '../components/BooksPageMenu';
import ChapterLinksMenu from '../components/ChapterLinksMenu';

const formatSlug = ({ page, slug }) => {
  if (!page.book) return slug;
  return `chapters/${page.book._id}/${slug}`;
};

global.$whppt.types = {
  book: {
    siteSettings: { name: 'chapters', label: 'Chapters', component: SiteSettingsChapters },
    pageSettings: { name: 'chapters', label: 'Chapters', component: PageSettingsChapters },
    pageTypes: { name: 'chapters', label: 'Chapters', component: BooksPageMenu, formatSlug },
    editors: [
      { name: 'chapter-links', label: 'Chapter Links', directive: 'chapter-links', component: ChapterLinksMenu },
    ],
  },
};
