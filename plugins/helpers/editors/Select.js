export default function($whppt) {
  $whppt.selected = undefined;
  $whppt.selectedElement = undefined;
  $whppt.selectedContents = undefined;
  $whppt.selectedContentsElement = undefined;

  const clearSelected = () => {
    clearSelectedFormatting();
    $whppt.selected = undefined;
    $whppt.selectedElement = undefined;
  };

  const select = (el, value) => {
    $whppt.selected = value;
    $whppt.selectedElement = el;
  };

  const clearSelectedContentsFormatting = () => {
    if ($whppt.selectedContentsElement)
      $whppt.selectedContentsElement.classList.remove('whppt-component__select--active');
  };

  const clearSelectedFormatting = () => {
    if ($whppt.selectedElement) $whppt.selectedElement.classList.remove('whppt-component__content--active');
  };

  const formatSelectedElement = () => {
    $whppt.selectedElement.classList.add('whppt-component__content--active');
  };

  const moveUp = () => {
    const i = $whppt.selectedContents.indexOf($whppt.selected);
    if (i === 0) return;

    const current = $whppt.selectedContents[i];
    const prev = $whppt.selectedContents[i - 1];

    clearSelectedFormatting();
    $whppt.selectedContents[i] = prev;
    $whppt.selectedContents[i - 1] = current;
    $whppt.selectedContents.__ob__.dep.notify();
    // formatSelectedElement();
  };

  const moveDown = () => {
    const i = $whppt.selectedContents.indexOf($whppt.selected);
    if ($whppt.selectedContents.length === i + 1) return;
    const current = $whppt.selectedContents[i];
    const prev = $whppt.selectedContents[i + 1];
    clearSelectedFormatting();

    $whppt.selectedContents[i] = prev;
    $whppt.selectedContents[i + 1] = current;
    $whppt.selectedContents.__ob__.dep.notify();
    // formatSelectedElement();
  };

  Object.assign($whppt, {
    clearSelected,
    clearSelectedFormatting,
    select,
    formatSelectedElement,
    moveUp,
    moveDown,
    clearSelectedContentsFormatting,
  });
}
