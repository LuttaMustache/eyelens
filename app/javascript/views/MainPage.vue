<template>
	<div>
		<h1>{{ $t('Stories') }}</h1>
		<loader v-if="!isLoaded" width="100%" height="3px"></loader>
		<transition name="fade">
			<div v-if="isLoaded">
				<table-list>
					<router-link
						:to="{ name: 'story', params: { id: story.id } }"
						v-for="story in stories"
						:key="story.id"
					>
						{{ story.title }}
					</router-link>
				</table-list>
				<paginator
					:left="page > 1"
					:right="per_page * page < total"
					@next="next"
					@prev="prev"
				></paginator>
			</div>
		</transition>
	</div>
</template>

<script>
import api from '../packs/api'
import Loader from '../components/Loader.vue'
import CustomButton from '../components/CustomButton.vue'
import TableList from '../components/TableList.vue'
import Paginator from '../components/Paginator.vue'

export default {
	components: { Loader, CustomButton, TableList, Paginator },
	data() {
		return {
			isLoaded: false,
			stories: [],
			per_page: 0,
			page: 1,
			total: 0,
		}
	},
	methods: {
		next() {
			this.load(this.page + 1)
		},
		prev() {
			this.load(this.page - 1)
		},
		load(page = 1) {
			this.isLoaded = false
			api
				.get('stories?page=' + page)
				.then(response => {
					this.isLoaded = true
					this.stories = response.data.data
					this.total = parseInt(response.data.total)
					this.per_page = parseInt(response.data.per_page)
					this.page = parseInt(response.data.page)
				})
				.catch(error => console.log(error))
		},
	},
	created() {
		this.load()
	},
}
</script>

<style scoped></style>
