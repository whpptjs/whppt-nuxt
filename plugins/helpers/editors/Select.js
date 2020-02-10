const selectActiveClass = 'whppt-component__select--active';
const contentActiveClass = 'whppt-component__content--active';

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
    $whppt.selectedElement.classList.add(selectActiveClass);
  };

  const selectContents = (el, value) => {
    $whppt.selectedContents = value;
    $whppt.selectedContentsElement = el;
    formatSelectedContentsElement();
  };
  const clearContents = () => {
    $whppt.selectedContents = undefined;
    clearSelectedContentsFormatting();
    $whppt.selectedContentsElement = undefined;
  };

  const clearSelectedContentsFormatting = () => {
    if ($whppt.selectedContentsElement) {
      $whppt.selectedContentsElement.classList.remove(selectActiveClass, contentActiveClass);
    }
  };

  const clearSelectedFormatting = () => {
    if (!$whppt.selectedElement) return;
    $whppt.selectedElement.classList.remove(contentActiveClass, selectActiveClass);
  };

  const formatSelectedElement = () => {
    $whppt.selectedElement.classList.add(contentActiveClass);
  };
  const formatSelectedContentsElement = () => {
    if ($whppt.selectedContentsElement) {
      $whppt.selectedContentsElement.classList.add(selectActiveClass);
      $whppt.selectedContentsElement.classList.remove(contentActiveClass);
    }
  };

  const remove = () => {
    if (!$whppt.selectedContents || !$whppt.editData) return;
    const i = $whppt.selectedContents.data.indexOf($whppt.editData);
    if (i < 0) return;
    $whppt.selectedContents.data.splice(i, 1);

    clearSelected();
  };

  const moveUp = () => {
    if (!$whppt.selectedContents || !$whppt.editData) return;
    const i = $whppt.selectedContents.data.indexOf($whppt.editData);
    if (i <= 0) return;

    const current = $whppt.selectedContents.data[i];
    const prev = $whppt.selectedContents.data[i - 1];

    clearSelectedFormatting();
    $whppt.selectedContents.data[i] = prev;
    $whppt.selectedContents.data[i - 1] = current;
    $whppt.selectedContents.data.__ob__.dep.notify();
    // formatSelectedElement();
  };

  const moveDown = () => {
    if (!$whppt.selectedContents || !$whppt.editData) return;
    const i = $whppt.selectedContents.data.indexOf($whppt.editData);
    if ($whppt.selectedContents.data.length === i + 1 || i < 0) return;
    const current = $whppt.selectedContents.data[i];
    const prev = $whppt.selectedContents.data[i + 1];
    clearSelectedFormatting();

    $whppt.selectedContents.data[i] = prev;
    $whppt.selectedContents.data[i + 1] = current;
    $whppt.selectedContents.data.__ob__.dep.notify();
    // formatSelectedElement();
  };

  Object.assign($whppt, {
    clearSelected,
    clearSelectedFormatting,
    select,
    selectContents,
    formatSelectedElement,
    moveUp,
    moveDown,
    remove,
    clearSelectedContentsFormatting,
    clearContents,
    formatSelectedContentsElement,
  });
}
