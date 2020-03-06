<template>
  <svg
    height="20"
    width="20"
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="paragraph"
    role="img"
    :fill="fill"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    class="svg-inline--fa fa-paragraph fa-w-14 fa-fw fa-2x"
  >
    <path
      d="M415 32H191a160 160 0 0 0 0 320h48v112a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16V80h48v384a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16V80h32a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM239 304h-48a112 112 0 0 1 0-224h48z"
    ></path>
  </svg>
</template>
<script>
export default {
  name: 'EditorIconParagraph',
  props: { fill: { type: String, default: 'white' } },
};
</script>
