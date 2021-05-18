<template>
	<div>
		<div style="display: flex; align-items: center">
			<custom-button
				primary
				@click.native="isFormActive = true"
				:disabled="isFormActive"
				:class="{ hidden: isFormActive }"
				style="transition: 0.4s; margin-bottom: 0.5rem"
			>
				{{ $t('New story') }}
			</custom-button>
			<div
				:style="{ opacity: error != 'none' && isFormActive ? 1 : 0 }"
				style="transition: 0.4s"
			>
				{{ $t('errors.' + error) }}
			</div>
		</div>
		<form class="new" :class="{ active: isFormActive }" @submit.prevent="save">
			<custom-input :placeholder="$t('Title')" v-model="title"></custom-input>
			<custom-text
				:placeholder="$t('Synopsis')"
				v-model="synopsis"
			></custom-text>
			<div class="footer">
				<custom-button outline @click.native.prevent="isFormActive = false">
					{{ $t('Cancel') }}
				</custom-button>
				<custom-button primary>
					{{ $t('Create') }}
				</custom-button>
			</div>
		</form>
		<h3 v-if="stories.length > 0">{{ $t('My works') }}:</h3>
		<table-list>
			<router-link
				v-for="story in stories"
				:key="story.id"
				:to="{ name: 'story', params: { id: story.id } }"
				@click.native="$store.commit('update_story', story)"
			>
				{{ story.title }}
			</router-link>
		</table-list>
	</div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'
import CustomInput from '../components/CustomInput.vue'
import CustomText from '../components/CustomText.vue'
import TableList from '../components/TableList.vue'
import api from '../packs/api'
export default {
	components: { CustomButton, CustomInput, CustomText, TableList },
	data() {
		return {
			isFormActive: false,
			stories: [],
			title: '',
			synopsis: '',
			error: 'none',
		}
	},
	methods: {
		save() {
			api
				.post('stories', { title: this.title, synopsis: this.synopsis })
				.then(response => {
					if (response.data.errors) {
						if (response.data.errors.title) this.error = 'Title taken'
						if (response.data.errors.synopsis)
							this.error = 'Synopsis is too short'
					} else {
						this.isFormActive = false
						this.load()
					}
				})
				.catch(error => console.log(error))
		},
		load() {
			api
				.get('my-stories')
				.then(response => (this.stories = response.data))
				.catch(error => {
					// TODO: notify
					console.log(error)
				})
		},
	},
	created() {
		this.load()
	},
}
</script>

<style scoped>
.new {
	height: 0;
	transition: 0.5s ease-out;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	max-width: 400px;
}

.new.active {
	height: 250px;
	margin-bottom: 1rem;
}

.new > * {
	margin-top: 0.5rem;
}

.hidden {
	opacity: 0;
	cursor: initial !important;
}

.footer {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
</style>
