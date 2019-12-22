<template>
	<lm-sticky-header :links="links">
		<li class="user-auth">
			<a target="_blank" href="https://luminu.net">
				<img class="logo" src="@/assets/luminu.png" width="42" height="42" />
			</a>
		</li>
	</lm-sticky-header>
</template>

<script lang="ts">
import Vue from "vue";
import { LmStickyHeader } from "@luminu/components";

export default Vue.extend({
	name: "LmCustomStickyHeader",
	components: {
		LmStickyHeader
	},
	data: () => ({
		links: [
			{
				name: "home",
				to: "https://luminu.net",
				isExternal: true,
				hasChildren: false
			},
			{
				name: "forum",
				to: "https://luminu.net/forums",
				isExternal: true,
				hasChildren: false
			}
		]
	})
});
</script>

<style lang="scss" scoped>
@import "~@luminu/core/scss/_variables.scss";

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
