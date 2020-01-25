<template>
  <lm-sticky-header
    type="noLogin"
    :dropdownItems="[]"
    :notLoggedInAction="''"
    :image="require('../../assets/luminu.png')"
    :links="links"
  ></lm-sticky-header>
</template>

<script lang="ts">
import Vue from 'vue';
import { LmStickyHeader } from '@luminu/components';

export default Vue.extend({
	name: 'LmCustomStickyHeader',
	components: {
		LmStickyHeader,
	},
	data: () => ({
		links: [
			{
				name: 'home',
				to: 'https://luminu.net',
				isExternal: true,
				hasChildren: false,
			},
			{
				name: 'forum',
				to: 'https://luminu.net/forums',
				isExternal: true,
				hasChildren: false,
			},
		],
	}),
});
</script>

<style lang="scss" scoped>
@import '~@luminu/core/scss/_variables.scss';

.user-auth {
	.logo {
		background-color: $lmColor1;
		border-radius: 2px;
		padding: 5px;
		transition: background-color 0.2s;

		&:hover {
			background-color: $lmColor3;
		}
	}
}
</style>
