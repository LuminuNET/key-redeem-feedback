<template>
	<div id="app">
		<lm-header :image="require('@/assets/style-logo.png')" />
		<lm-custom-sticky-header />
		<router-view />
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { LmHeader } from "@luminu/components";
import LmCustomStickyHeader from "@/components/layout/CustomStickyHeader.vue";

export default Vue.extend({
	components: {
		LmHeader,
		LmCustomStickyHeader
	}
});
</script>

<style lang="scss">
@import "~@luminu/ui-kit/scss/_globals.scss";
</style>
