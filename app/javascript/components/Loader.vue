<template>
	<div :style="{ width: width, height: height }">
		<div class="outer">
			<div class="inner" :class="{ toggle }"></div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		width: { type: String, default: '100px' },
		height: { type: String, default: '8px' },
	},
	data() {
		return {
			toggle: false,
		}
	},
	beforeMount() {
		this.$nextTick().then(vm => {
			vm.toggle = !vm.toggle
			setInterval(() => (this.toggle = !this.toggle), 1500)
		})
	},
}
</script>

<style scoped>
.outer {
	height: 100%;
	width: 100%;
	overflow: hidden;
	position: relative;
}

.inner {
	position: absolute;
	width: 166.7%;
	height: 100%;
	left: -166.7%;
	top: 0;
	transition: 1.5s ease-in-out;
	background-color: #a3f7bf;
}

.inner.toggle {
	left: 100%;
}
</style>
