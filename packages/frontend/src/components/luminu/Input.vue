<template>
  <input
    ref="input"
    type="text"
    :class="{error: isError, success: isSuccess}"
    :maxlength="maxlength"
    @input="updateValue($event.target.value)"
  />
</template>

<style lang="scss" scoped>
@import '~@luminu/core/scss/_variables.scss';

input {
  width: 100%;
  height: 28px;
  text-align: left;
  text-indent: 5px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #333;
  box-shadow: 0px 2px rgba($color: #000000, $alpha: 0.2);
  transition: box-shadow 0.15s;
  outline: none;

  &:focus {
    box-shadow: 0px 0px 0px 3px rgba($color: $lmColor2, $alpha: 0.4);
  }

  &.error {
    box-shadow: 0px 0px 0px 3px rgba($color: $lmError, $alpha: 0.4);
  }

  &.success {
    box-shadow: 0px 0px 0px 3px rgba($color: $lmSuccess, $alpha: 0.4);
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { valueUpdateEvent } from '../../mixins/valueUpdateEvent';

export default Vue.extend({
  name: 'LmInput',
  mixins: [valueUpdateEvent],
  props: {
    isSuccess: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    maxlength: {
      type: Number,
      default: 128,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.autofocus) {
      (this.$refs.input as HTMLInputElement).focus();
    }
  },
});
</script>
