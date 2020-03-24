import SiteSettingsChapters from '../components/SiteSettingsChapters';
import PageSettingsChapters from '../components/PageSettingsChapters';
import BooksPageTypes from '../components/BooksPageTypes';

global.$whppt.types = {
  book: {
    siteSettings: { name: 'chapters', label: 'Chapters', component: SiteSettingsChapters },
    pageSettings: { name: 'chapters', label: 'Chapters', component: PageSettingsChapters },
    pageTypes: { name: 'chapters', label: 'Chapters', component: BooksPageTypes, slugPrefix: 'chapters' },
  },
};
