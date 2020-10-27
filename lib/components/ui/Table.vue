<template>
  <div class="whppt-table" :class="{ 'whppt-table--dark': dark, 'whppt-table--dense': dense }">
    <div
      class="whppt-table__container"
      :style="height ? `height: ${typeof height === 'number' ? `${height}px` : height};` : ''"
    >
      <table>
        <slot name="headers" :headers="headers">
          <thead :class="{ 'whppt-table__headers--fixed': fixedHeader && height }">
            <tr>
              <th
                v-for="(header, index) in headers"
                :key="index"
                :class="header.align ? `whppt-table__header--${header.align}` : ''"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
        </slot>
        <slot name="footer">
          <tfoot class="whppt-table__footer">
            <tr>
              <td :colspan="headers && headers.length">
                <div class="whppt-table__pagination">
                  <whppt-pagination
                    :page="page"
                    :per-page="perPage"
                    :total="total || (items && items.length)"
                    direction="up"
                    @update:page="$emit('update:page', $event)"
                    @update:perPage="$emit('update:perPage', $event)"
                  ></whppt-pagination>
                </div>
              </td>
            </tr>
          </tfoot>
        </slot>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="(prop, key) in item" :key="key">
              <slot :name="`item.${key}`" :item="item">
                {{ prop }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import WhpptPagination from './Pagination';

export default {
  name: 'WhpptTable',
  components: {
    WhpptPagination,
  },
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    perPage: {
      type: Number,
      default: 5,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [String, Number],
      default: undefined,
    },
    fixedHeader: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: undefined,
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

.whppt-table {
  width: 100%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

  &__container {
    overflow: auto;
    border-radius: 0.25rem;
    width: 100%;
  }

  &__headers--fixed {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }

  &__footer {
    background-color: red;

    tr td {
      padding: 0.75rem 1.5rem;

      .whppt-table__pagination {
        width: 100%;
        display: flex;
      }
    }
  }

  table {
    min-width: 100%;
    border-collapse: collapse;
    border-style: solid;
    border-width: 1px;
    border-color: $gray-200;
    background-color: transparent;

    thead th {
      padding: 0.75rem 1.5rem;
      border-bottom: 2px solid $gray-200;
      background-color: $gray-100;
      font-size: 0.75rem;
      font-weight: 600;
      color: $gray-600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    tbody {
      background-color: white;

      td {
        border-bottom: 1px solid $gray-200;
        padding: 1rem 1.5rem;
        white-space: nowrap;
        font-size: 0.75rem;
      }
    }
  }

  &__header {
    &--start {
      text-align: left;
    }

    &--end {
      text-align: right;
    }
  }

  &--dark {
    .whppt-table__container {
      border-style: solid;
      border-width: 1px;
      border-color: $gray-500;

      table {
        thead th {
          border-bottom: 2px solid $gray-200;
          background-color: $gray-900;
          color: $gray-200;
        }

        tbody {
          background-color: $gray-800;

          tr:nth-child(even) {
            background-color: $gray-700;
          }

          td {
            border-bottom: 1px solid $gray-500;
          }
        }

        .whppt-table__footer {
          color: white;
          background-color: $gray-900;

          tr td {
            padding: 0.75rem 1.5rem;
          }
        }
      }

      table thead th,
      table tbody td {
        color: white;
      }
    }
  }

  &--dense {
    .whppt-table__container {
      thead th {
        padding: 0.5rem 0.75rem;
        background-color: $gray-100;
      }

      tbody td {
        padding: 0.5rem 0.75rem;
      }
    }
  }
}
</style>
