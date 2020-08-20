const MENUSTATES = {
  SELECT: 'select',
  CONTENT: 'content',
  LISTING: 'listing',
};

function menuIsInState(store, type) {
  const editorState = store.state[`whppt-nuxt/editor`];
  return editorState.activeMenuItem === type;
}

export { menuIsInState, MENUSTATES };
