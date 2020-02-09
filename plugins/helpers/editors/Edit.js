const className = 'whppt-component__edit--active';

export default function($whppt) {
  $whppt.editData = undefined;
  $whppt.editDataProperty = undefined;
  $whppt.editingElement = undefined;
  $whppt.editComponentList = undefined;

  const edit = (el, value) => {
    $whppt.editData = value.data;
    $whppt.editDataProperty = value.property;
    $whppt.editingElement = el;
    el.classList.add(className);
  };

  const editContent = (el, value) => {
    $whppt.editData = value.data;
    $whppt.editComponentList = value.componentList;
    $whppt.editingElement = el;
    el.classList.add(className);
  };

  const clearEditData = () => {
    clearEditingElementFormatting();
    $whppt.editData = undefined;
    $whppt.editingElement = undefined;
    $whppt.editComponentList = undefined;
  };

  const clearEditingElementFormatting = () => {
    if ($whppt.editingElement) $whppt.editingElement.classList.remove(className);
  };

  const formatEditingElement = () => {
    $whppt.selectedElement.classList.add(className);
  };

  Object.assign($whppt, {
    edit,
    editContent,
    formatEditingElement,
    clearEditingElementFormatting,
    clearEditData,
  });
}
