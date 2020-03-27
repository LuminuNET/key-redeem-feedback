<template>
  <div class="number-rating">
    <div class="range-wrapper" @click="updateValue(3); value = 3">
      <input
        type="range"
        name
        step="1"
        max="5"
        min="1"
        @input="updateValue($event.target.value); value = $event.target.value"
        :class="{error: isError}"
        value
        :data-value="value"
      />
    </div>
    <div class="range-hint">
      <p v-for="i in 5" :key="i">{{ i }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { valueUpdateEvent } from '../../mixins/valueUpdateEvent';

export default Vue.extend({
  name: 'LmNumberRating',
  mixins: [valueUpdateEvent],
  props: {
    isError: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    value: '',
  }),
});
</script>

<style lang="scss" scoped>
@import '~@luminu/core/scss/variables';

.number-rating {
  .range-hint {
    display: flex;
    justify-content: space-between;

    width: calc(100% - 40px);
    margin: 0 auto;
  }

  input[type='range'] {
    -webkit-appearance: none;
    margin-top: 5px;
    border-radius: 5px;
    height: 28px;
    width: 100%;
    padding: 0 2px;
    border: 1px solid #333;
    box-shadow: 0px 2px rgba($color: #000000, $alpha: 0.2);
    overflow: hidden;
    transition: box-shadow 0.15s;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($color: $lmColor3, $alpha: 0.4);
    }

    &.error {
      box-shadow: 0px 0px 0px 3px rgba($color: $lmError, $alpha: 0.4);
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      cursor: pointer;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }

    &[data-value=''] {
      &::-webkit-slider-thumb {
        opacity: 0;
      }
    }

    &::-webkit-slider-thumb {
      background: $lmColor2;
      height: 20px;
      width: 40px;
      border-radius: 5px;
      cursor: pointer;
      -webkit-appearance: none;
      transition: background 0.15s;
    }

    &::-moz-range-thumb {
      background: $lmColor2;
      height: 20px;
      width: 40px;
      border-radius: 5px;
      cursor: pointer;
      -webkit-appearance: none;
      transition: background 0.15s;
    }

    &:focus::-webkit-slider-thumb {
      background: $lmColor1;
    }
  }
}
</style>
