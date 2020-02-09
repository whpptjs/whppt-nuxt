const className = 'whppt-component__select--hover';

export default function($whppt) {
  const mouseout = el => {
    el.classList.remove(className);
  };

  const mouseover = el => {
    el.classList.add(className);
  };

  Object.assign($whppt, {
    mouseout,
    mouseover,
  });
}
