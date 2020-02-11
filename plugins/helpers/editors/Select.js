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

  Object.assign($whppt, {
    clearSelectedComponent,
    clearSelectedComponentFormatting,
    selectComponent,
    selectContent,
    formatSelectedContentElement,
    clearSelectedContent,
    clearSelectedContentFormatting,
  });
}
