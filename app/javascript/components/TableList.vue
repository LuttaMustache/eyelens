<template>
	<div class="table-list">
		<slot></slot>
	</div>
</template>

<script>
export default {}
</script>

<style>
.table-list {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.table-list > * {
	width: 100%;
	border-bottom: 2px solid rgba(255, 255, 255, 0.12);
	padding: 0.25rem 0 0.25rem 0;
	line-height: 2rem;
}

.table-list > *:hover {
	background-color: rgba(255, 255, 255, 0.05);
}
</style>
