<template>
  <div class="flex">
    <w-editor-menu></w-editor-menu>
    <div class="content" @click="testing"><slot> </slot></div>
    <div class="sidebar" :class="{ openEditor: editing }"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
//
import WEditorMenu from './EditorMenu';
export default {
  name: 'WhpptEditorSidebar',
  components: { WEditorMenu },
  computed: mapState('whppt-nuxt', ['editing']),
  methods: {
    testing(ev) {
      console.log(ev);

      const attType = ev.target.attributes['data-w-html'];
      console.log("EV.TARGET.ATTRIBUTES['DATA-W-DATA']", ev.target.attributes['data-w-data']);
      // const attData = ev.target.attributes['data-w-data'].value;
      const attData = ev.target.getAttribute('data-w-data');

      const data = attData();
      console.log(data);
      console.log('aaaaaaa');
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  width: 400px;
  margin-right: -400px;
  transition: 0.5s;
}
.openEditor {
  margin-right: 0;
}
.flex {
  height: 100vh;
  display: flex;
  background-color: gray;
  overflow-x: hidden;
}
.content {
  flex-grow: 1;
  background-color: red;
}
</style>
