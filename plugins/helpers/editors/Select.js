const componentActiveClass = 'whppt__component--active';
const contentActiveClass = 'whppt__content--active';

export default function($whppt) {
  $whppt.selectedElement = undefined;
  $whppt.selectedContentsElement = undefined;

  const clearSelectedComponent = () => {
    clearSelectedComponentFormatting();
    $whppt.selectedElement = undefined;
  };
  const clearSelectedComponentFormatting = () => {
    if (!$whppt.selectedElement) return;
    $whppt.selectedElement.classList.remove(componentActiveClass);
  };
  const selectComponent = el => {
    $whppt.selectedElement = el;
    $whppt.selectedElement.classList.add(componentActiveClass);
  };
  const selectContent = el => {
    $whppt.selectedContentElement = el;
    formatSelectedContentElement();
  };

  const formatSelectedContentElement = () => {
    if ($whppt.selectedContentElement) {
      $whppt.selectedContentElement.classList.add(contentActiveClass);
      $whppt.selectedContentElement.classList.remove(componentActiveClass);
    }
  };
  const clearSelectedContent = () => {
    clearSelectedContentFormatting();
    $whppt.selectedContentElement = undefined;
  };
  const clearSelectedContentFormatting = () => {
    if ($whppt.selectedContentElement) {
      $whppt.selectedContentElement.classList.remove(contentActiveClass);
    }
  };

  const moveUp = (component, content) => {
    const i = content.indexOf(component);
    if (i <= 0) return;

    const current = content[i];
    const prev = content[i - 1];

    clearSelectedComponentFormatting();
    content[i] = prev;
    content[i - 1] = current;
    content.__ob__.dep.notify();
  };

  const moveDown = (component, content) => {
    const i = content.indexOf(content);
    if (content.length === i + 1 || i < 0) return;
    const current = content[i];
    const prev = content[i + 1];
    clearSelectedComponentFormatting();

    content[i] = prev;
    content[i + 1] = current;
    content.__ob__.dep.notify();
  };
  const remove = () => {
    if (!$whppt.selectedContents || !$whppt.editData) return;
    const i = $whppt.selectedContents.data.indexOf($whppt.editData);
    if (i < 0) return;
    $whppt.selectedContents.data.splice(i, 1);

    clearSelected();
  };

  Object.assign($whppt, {
    clearSelectedComponent,
    clearSelectedComponentFormatting,
    selectComponent,
    selectContent,
    formatSelectedContentElement,
    clearSelectedContent,
    clearSelectedContentFormatting,
    moveDown,
    moveUp,
    remove,
  });
}
