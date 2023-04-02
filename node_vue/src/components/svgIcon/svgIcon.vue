<template>
	<svg aria-hidden="true" class="svgIcon">
		<use :xlink:href="iconName" />
	</svg>
</template>
<script setup lang="ts">
	import { computed } from "vue";
	const props = defineProps({
		iconClass: { type: String, required: true }
	})
	const iconName = computed(() => `#icon-${props.iconClass}`);
</script>
<style scoped>
	.svgIcon {
		width: 24px;
		height: 24px;
		fill: currentColor;
		stroke: currentColor;
		overflow: hidden;
	}
</style>
