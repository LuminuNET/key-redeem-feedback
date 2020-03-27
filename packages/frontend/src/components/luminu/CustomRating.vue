<template>
  <div class="custom-rating">
    <select name @input="updateValue($event.target.value)" :class="{error: isError}">
      <option selected value disabled>{{ $t('feedback.pleaseChoose') }}</option>
      <option v-for="(custom, index) in customs" :key="index" :value="custom">{{ custom }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { valueUpdateEvent } from '../../mixins/valueUpdateEvent';

export default Vue.extend({
  name: 'LmCustomRating',
  mixins: [valueUpdateEvent],
  props: {
    customs: {
      type: Array,
      required: true,
    },
    isError: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import '~@luminu/core/scss/variables';

.custom-rating {
  width: 200px;
  height: 28px;
  border-radius: 5px;
  margin-top: 5px;

  * {
    cursor: pointer;
  }

  &::after {
    font-family: 'award', sans-serif;
    content: '\f107';
    font-size: 20px;
    height: 28px;
    font-weight: 400;
    position: absolute;
    transform: translate(-20px, 3px);
    z-index: 0;
  }

  select {
    position: relative;
    z-index: 1;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: none;

    border-radius: 5px;
    border: 1px solid #333;
    box-shadow: 0px 2px rgba($color: #000000, $alpha: 0.2);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($color: $lmColor3, $alpha: 0.4);
    }

    padding-left: 5px;
    width: inherit;
    height: inherit;
    font-size: 14px;
    text-transform: uppercase;

    &.error {
      box-shadow: 0px 0px 0px 3px rgba($color: $lmError, $alpha: 0.4);
    }
  }
}
</style>
