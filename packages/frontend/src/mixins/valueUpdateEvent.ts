import Vue from 'vue';

export const valueUpdateEvent = Vue.extend({
  methods: {
    updateValue(value: string) {
      this.$emit('value-update', value);
    },
  },
});
