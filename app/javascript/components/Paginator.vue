<template>
	<div class="paginator">
		<custom-button
			outline
			class="arrow"
			@click="$emit('prev')"
			:disabled="!left"
		>
			<em class="bi-arrow-left"></em>
		</custom-button>
		<custom-button
			outline
			class="arrow"
			@click="$emit('next')"
			:disabled="!right"
		>
			<em class="bi-arrow-right"></em>
		</custom-button>
	</div>
</template>

<script>
import CustomButton from './CustomButton.vue'
export default {
	components: { CustomButton },
	props: {
		left: Boolean,
		right: Boolean,
	},
}
</script>

<style scoped>
.arrow {
	font-size: 2rem;
}

.paginator {
	display: flex;
	justify-content: space-between;
}
</style>
