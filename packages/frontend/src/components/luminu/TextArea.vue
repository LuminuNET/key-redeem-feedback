<template>
  <div class="text-area">
    <textarea maxlength="1024" name @input="updateValue($event.target.value)"></textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { valueUpdateEvent } from '../../mixins/valueUpdateEvent';

export default Vue.extend({
  name: 'LmTextArea',
  mixins: [valueUpdateEvent],
});
</script>

<style lang="scss" scoped>
@import '~@luminu/core/scss/variables';

.text-area {
  margin-top: 5px;

  textarea {
    width: 100%;
    height: 100px;
    max-height: 200px;
    min-height: 100px;
    resize: vertical;
    padding: 5px;

    border-radius: 5px;
    border: 1px solid #333;
    box-shadow: 0px 2px rgba($color: #000000, $alpha: 0.2);

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba($color: $lmColor3, $alpha: 0.4);
    }
  }
}
</style>
