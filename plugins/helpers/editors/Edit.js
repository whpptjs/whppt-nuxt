const className = 'whppt-component__edit--active';

export default function($whppt) {
  $whppt.editData = undefined;
  $whppt.editingElement = undefined;

  const edit = (el, value) => {
    $whppt.editData = value;
    $whppt.editingElement = el;
    el.classList.add(className);
  };

  const clearEditData = () => {
    clearEditingElementFormatting();
    $whppt.editData = undefined;
    $whppt.editingElement = undefined;
  };

  const clearEditingElementFormatting = () => {
    if ($whppt.editingElement) $whppt.editingElement.classList.remove(className);
  };

  const formatEditingElement = () => {
    $whppt.selectedElement.classList.add(className);
  };

  Object.assign($whppt, {
    edit,
    formatEditingElement,
    clearEditingElementFormatting,
    clearEditData,
  });
}
