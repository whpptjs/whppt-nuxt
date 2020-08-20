// const className = 'whppt__component--hover';
const componentHoverClass = 'whppt__component--hover';
const contentHoverClass = 'whppt__content--hover';

export default function($whppt) {
  const mouseoutContent = el => {
    el.classList.remove(contentHoverClass);
  };

  const mouseoverContent = el => {
    el.classList.add(contentHoverClass);
  };
  const mouseoutComponent = el => {
    el.classList.remove(componentHoverClass);
  };

  const mouseoverComponent = el => {
    el.classList.add(componentHoverClass);
  };

  Object.assign($whppt, {
    mouseoutContent,
    mouseoverContent,
    mouseoutComponent,
    mouseoverComponent,
  });
}
