<template>
	<textarea
		cols="30"
		rows="10"
		:value="value"
		@input="$emit('input', $event.target.value)"
	></textarea>
</template>

<script>
export default {
	props: {
		value: String,
	},
}
</script>

<style scoped>
textarea {
	background-color: rgba(255, 255, 255, 0.05);
	border: none;
	border-radius: 0.5rem;
	font-size: 1rem;
	outline: none;
	color: white;
	padding: 0.8rem;
	width: calc(100% - 1.6rem);
	resize: none;
}
</style>
