import SiteSettingsChapters from '../components/SiteSettingsChapters';
import PageSettingsChapters from '../components/PageSettingsChapters';

global.$whppt.types = {
  book: {
    siteSettings: { name: 'chapters', label: 'Chapters', component: SiteSettingsChapters },
    pageSettings: { name: 'chapters', label: 'Chapters', component: PageSettingsChapters },
  },
};
