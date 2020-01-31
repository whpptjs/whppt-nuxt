export default function($whppt) {
  $whppt.editData = undefined;
  $whppt.editingElement = undefined;

  const clearEditData = () => {
    clearEditingElementFormatting();
    $whppt.editData = undefined;
    $whppt.editingElement = undefined;
  };

  const clearEditingElementFormatting = () => {
    if ($whppt.editingElement) $whppt.editingElement.classList.remove('whppt-component__content--active');
  };

  const formatEditingElement = () => {
    $whppt.selectedElement.classList.add('whppt-component__content--active');
  };

  Object.assign($whppt, {
    formatEditingElement,
    clearEditingElementFormatting,
    clearEditData,
  });
}
