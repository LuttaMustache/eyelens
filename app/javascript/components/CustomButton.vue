<template>
	<button v-on="$listeners" :class="{ primary, outline, danger }">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		primary: Boolean,
		secondary: Boolean,
		outline: Boolean,
		danger: Boolean,
	},
}
</script>

<style scoped>
button {
	background-color: rgba(255, 255, 255, 0.05);
	border: none;
	border-radius: 0.5rem;
	font-size: 1rem;
	outline: none;
	color: white;
	padding: 0.8rem;
	transition: 0.5s;
}

button:hover {
	cursor: pointer;
}

.primary {
	background-color: #a3f7bf;
	color: black;
}

.primary:hover {
	background-color: #93cea7;
}

.danger {
	background-color: #ff5126;
	color: white;
}

.danger:hover {
	background-color: #be4020;
}

.outline {
	background: none;
	color: #a3f7bf;
}

.outline.danger {
	background: none;
	color: #ff5126;
}

.outline:disabled {
	color: grey;
	cursor: auto;
}
</style>
