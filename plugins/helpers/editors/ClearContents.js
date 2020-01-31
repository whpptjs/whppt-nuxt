export default context => () => {
  const { $whppt } = context.app;
  $whppt.selectedContents = undefined;
  if ($whppt.selectedContentsElement) {
    $whppt.selectedContentsElement.classList.remove('whppt-component__content--active');
  }
  $whppt.selectedContentsElement = undefined;
};
