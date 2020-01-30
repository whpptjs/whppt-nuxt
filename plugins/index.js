import richTextDirective from './directives/richText';
import linkDirective from './directives/link';
import save from './helpers/save';

export default ({ app, store, ...v }, inject) => {
  const whppt = {
    editData: undefined,
    save,
  };

  app.$whppt = whppt;
  inject('whppt', whppt);

  richTextDirective(store, whppt);
  linkDirective(store, whppt);
};
