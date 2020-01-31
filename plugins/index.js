import contentDirective from './directives/content';
import richTextDirective from './directives/richText';
import textBoxDirective from './directives/textBox';
import linkDirective from './directives/link';
import SavePage from './helpers/SavePage';
import LoadPage from './helpers/LoadPage';
import Select from './helpers/editors/Select';
import Edit from './helpers/editors/Edit';
import Hover from './helpers/editors/Hover';

const options = JSON.parse(`<%= JSON.stringify(options) %>`);

export default (context, inject) => {
  const { store } = context;
  const whppt = {
    editData: undefined,
    savePage: SavePage(context),
    loadPage: LoadPage(context),
    templates: options.templates,
    // loadPage(slug) {
    //   return $axios.get(`http://localhost:3001/api/page/load?slug=${slug}`)
    // }
  };

  const menuIsInState = type => {
    const editorState = store.state[`whppt-nuxt/editor`];
    return editorState.selector === type;
  };
  const MENUSTATES = {
    SELECT: 'select',
    CONTENT: 'content',
  };

  Select(whppt);
  Edit(whppt);
  Hover(whppt);

  context.app.$whppt = whppt;
  inject('whppt', whppt);

  contentDirective({ ...context, menuIsInState, MENUSTATES });
  textBoxDirective({ ...context, menuIsInState, MENUSTATES });
  richTextDirective({ ...context, menuIsInState, MENUSTATES });
  linkDirective({ ...context, menuIsInState, MENUSTATES });
};
