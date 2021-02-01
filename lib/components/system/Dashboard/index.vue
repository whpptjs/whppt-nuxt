<template>
  <div class="whppt-dashboard">
    <whppt-drawer fixed>
      <ul class="whppt-dashboard__drawer-items">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="whppt-dashboard__drawer-item"
          :class="{ 'whppt-dashboard__drawer-item--active': selectedDashboard === tab.name }"
          @click="setSelectedDashboard(tab)"
        >
          {{ tab.label }}
        </li>
      </ul>
    </whppt-drawer>
    <div class="whppt-dashboard__content">
      <component :is="selectedDashboard" v-if="selectedDashboard" @closed="$emit('closed')" />
    </div>
  </div>
</template>

<script>
import WhpptDrawer from '../../ui/components/Drawer';
import Users from './Users';

const { additionalComponents, additionalTabs } = global.$whppt.getAdditionalComponents('dashboard');

export default {
  name: 'WhpptDashboard',
  components: {
    ...additionalComponents,
    Users,
    WhpptDrawer,
  },
  data: () => ({
    selectedDashboard: undefined,
  }),
  computed: {
    tabs() {
      return [{ name: 'users', label: 'Users', component: Users }, ...additionalTabs];
    },
  },
  mounted() {
    if (!this.selectedDashboard) this.selectedDashboard = this.tabs[0].name;
  },
  methods: {
    setSelectedDashboard(tab) {
      this.selectedDashboard = tab.name;
    },
  },
};
</script>

<style lang="scss" scoped>
$gray-100: #f7fafc;
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-600: #718096;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-dashboard {
  display: flex;

  &__content {
    padding-left: 350px;
    width: 100%;
  }

  &__drawer-items {
    list-style-type: none;
    margin: 0;
    padding: 0;

    .whppt-dashboard__drawer-item {
      padding: 1rem 1.25rem;
      list-style: none;
      width: 100%;
      border-bottom: 1px solid transparent;
      transition: 0.15s ease;

      &--active {
        background-color: $gray-700;
      }

      &:hover {
        background-color: $gray-700;
      }
    }
  }
}
</style>
