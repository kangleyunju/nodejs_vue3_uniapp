<template>
	<el-icon :size="size" :color="color" class="el-icons">
		<component :is="name"></component>
	</el-icon>
</template>

<script>
	import {defineComponent} from "vue";
	export default defineComponent({
		name: "ElIcons",
		props: {
			name: {
				type: String,
				required: true,
			},
			size: {
				type: String,
				default: "",
			},
			color: {
				type: String,
				default: ""
			}
		}
	})
</script>
