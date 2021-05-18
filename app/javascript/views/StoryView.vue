<template>
	<router-view v-if="story" :story="story" @update="load"></router-view>
</template>

<script>
import api from '../packs/api'
export default {
	props: {
		id: [String, Number],
	},
	data() {
		return {
			story: null,
		}
	},
	methods: {
		load(id = this.id) {
			api.get('stories/' + id).then(response => (this.story = response.data))
		},
	},
	created() {
		this.load()
	},
	beforeRouteUpdate(to, from, next) {
		if (to.params.id !== this.story.id) this.load(to.params.id)
		next()
	},
}
</script>

<style></style>
