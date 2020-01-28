<template>
  <div id="app">
    <lm-header :image="require('@/assets/style-logo.png')" />
    <lm-custom-sticky-header />
    <router-view />
    <lm-custom-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { LmHeader } from '@luminu/components';
import LmCustomStickyHeader from '@/components/layout/CustomStickyHeader.vue';
import LmCustomFooter from '@/components/layout/CustomFooter.vue';

export default Vue.extend({
  components: {
    LmHeader,
    LmCustomStickyHeader,
    LmCustomFooter,
  },
});
</script>

<style lang="scss">
@import '~@luminu/core/scss/_globals.scss';
</style>
