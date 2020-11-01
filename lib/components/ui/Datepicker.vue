<template>
  <client-only>
    <div class="whppt-datepicker" :class="{ 'whppt-datepicker--dark': dark }">
      <v-date-picker
        :value="value"
        v-bind="$attrs"
        :min-date="minDate ? minDate : undefined"
        :max-date="maxDate ? maxDate : undefined"
        :update-on-input="true"
        :popover="{ visibility: 'click' }"
        color="#5a67d8"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
      >
        <div slot-scope="{ inputProps, inputEvents }">
          <label v-if="label" :for="`${$options._scopeId}-whppt-date-input`">{{ label }}</label>
          <div class="whppt-datepicker__input-wrapper">
            <whppt-input
              :id="`${$options._scopeId}-whppt-date-input`"
              :placeholder="placeholder"
              v-bind="inputProps"
              v-on="inputEvents"
            ></whppt-input>
            <button v-if="clearable && value" class="icon" @click.stop="$emit('input', undefined)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="transform: rotate(360deg)">
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </v-date-picker>
    </div>
  </client-only>
</template>

<script>
import WhpptInput from '../ui/Input';

let VDatePicker;

if (process.client) VDatePicker = require('v-calendar-ie11/lib/v-calendar.umd.js').DatePicker;

export default {
  name: 'WhpptDatepicker',
  components: { WhpptInput, VDatePicker },
  props: {
    dark: { type: Boolean, default: true },
    label: { type: String, default: '' },
    placeholder: { type: String, default: () => '' },
    value: { type: [Date, String], default: undefined },
    minDate: { type: [Date, String], default: '' },
    maxDate: { type: [Date, String], default: '' },
    clearable: { type: Boolean, default: true },
  },
};
</script>

<style lang="scss" scoped>
$gray-200: #edf2f7;
$gray-500: #a0aec0;
$gray-700: #4a5568;
$gray-800: #2d3748;
$gray-900: #1a202c;

.whppt-datepicker {
  position: relative;
  width: 100%;

  label {
    text-transform: uppercase;
    color: $gray-700;
    font-weight: bold;
    letter-spacing: 0.025em;
    font-size: 0.75rem;
  }

  .whppt-datepicker__input-wrapper {
    position: relative;

    input {
      box-sizing: border-box;
      display: block;
      appearance: none;
      width: 100%;
      background-color: $gray-200;
      color: $gray-700;
      border: 1px solid $gray-200;
      border-radius: 0.25rem;
      padding: 1rem 2rem 1rem 0.75rem;
      line-height: 1.25;

      &:focus {
        outline: none;
        background-color: white;
        border-color: $gray-500;
      }
    }

    .icon {
      cursor: pointer;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      color: $gray-700;
      background: transparent;
      border: none;
      border-radius: 0.25rem;

      &:focus {
        outline: none;
        color: black;
        background: $gray-500;
        border: 1px solid transparent;
      }

      svg {
        fill: currentColor;
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }

  &--dark {
    label {
      color: white;
    }

    .whppt-datepicker__input-wrapper {
      position: relative;

      input {
        background-color: $gray-900;
        color: white;
        border: 1px solid $gray-500;

        &:focus {
          background-color: $gray-800;
        }
      }

      .icon {
        &:focus {
          color: white;
          background: $gray-700;
        }
      }
    }
  }
}
</style>
