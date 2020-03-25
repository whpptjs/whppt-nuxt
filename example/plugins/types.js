import SiteSettingsChapters from '../components/SiteSettingsChapters';
import PageSettingsChapters from '../components/PageSettingsChapters';
import BooksPageMenu from '../components/BooksPageMenu';

global.$whppt.types = {
  book: {
    siteSettings: { name: 'chapters', label: 'Chapters', component: SiteSettingsChapters },
    pageSettings: { name: 'chapters', label: 'Chapters', component: PageSettingsChapters },
    pageTypes: { name: 'chapters', label: 'Chapters', component: BooksPageMenu, slugPrefix: 'chapters' },
  },
};
