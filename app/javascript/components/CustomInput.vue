<template>
	<input :value="value" @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
	props: {
		value: String,
	},
}
</script>

<style scoped>
input {
	background-color: rgba(255, 255, 255, 0.05);
	border: none;
	border-radius: 0.5rem;
	font-size: 1rem;
	outline: none;
	color: white;
	padding: 0.8rem;
	width: calc(100% - 1.6rem);
}

input::-ms-reveal,
input::-ms-clear {
	display: none;
}
</style>
