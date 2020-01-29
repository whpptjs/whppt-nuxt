import richTextDirective from './directives/richText';
import linkDirective from './directives/link';

export default ({ app, store, ...v }, inject) => {
  const whppt = {
    editData: undefined,
  };

  app.$whppt = whppt;
  inject('whppt', whppt);

  richTextDirective(store, whppt);
  linkDirective(store, whppt);
};
