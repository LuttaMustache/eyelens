<template>
	<div>
		<div v-if="story">
			<h2>{{ story.title }}</h2>
			<custom-button
				danger
				@click.native="deleteStoryModal = true"
				v-if="isAuthor"
			>
				{{ $t('Delete') }}
			</custom-button>
			<p class="author">{{ story.user.nickname }}</p>
			<pre class="synopsis">{{ story.synopsis }}</pre>
			<h3>{{ $t('Chapters') }}</h3>
			<router-link :to="{ name: 'new-chapter', params: { id: story.id } }">
				<custom-button v-if="isAuthor" primary style="float: right">
					{{ $t('New chapter') }}
				</custom-button>
			</router-link>
			<table-list>
				<router-link
					v-for="chapter in story.chapters"
					:key="chapter.id"
					:to="{
						name: 'chapter',
						params: { id: story.id, chapter_id: chapter.id },
					}"
				>
					{{ chapter.title }}
					<em
						v-if="isAuthor"
						class="bi-x delete"
						@click.stop.prevent="showDeleteModal(chapter.id)"
					></em>
				</router-link>
			</table-list>

			<modal v-if="deleteModal">
				<template slot="body">
					{{ $t('Chapter delete warning') }}
				</template>
				<template slot="footer">
					<custom-button outline danger @click.native="deleteModal = false">
						{{ $t('Cancel') }}
					</custom-button>
					<custom-button primary danger @click.native="deleteChapter">
						{{ $t('Delete') }}
					</custom-button>
				</template>
			</modal>

			<modal v-if="deleteStoryModal">
				<template slot="body">
					{{ $t('Chapter delete warning') }}
				</template>
				<template slot="footer">
					<custom-button
						outline
						danger
						@click.native="deleteStoryModal = false"
					>
						{{ $t('Cancel') }}
					</custom-button>
					<custom-button primary danger @click.native="deleteStory">
						{{ $t('Delete') }}
					</custom-button>
				</template>
			</modal>
		</div>
	</div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'
import Modal from '../components/Modal.vue'
import TableList from '../components/TableList.vue'
import api from '../packs/api'

export default {
	components: { TableList, CustomButton, Modal },
	props: {
		story: Object,
	},
	data() {
		return {
			deleteModal: false,
			toDelete: 0,
			deleteStoryModal: false,
		}
	},
	computed: {
		isAuthor() {
			return (
				this.$store.state.user &&
				this.story.user_id == this.$store.state.user.id
			)
		},
	},
	methods: {
		showDeleteModal(id) {
			this.toDelete = id
			this.deleteModal = true
		},
		deleteChapter(id = this.toDelete) {
			this.deleteModal = false
			api
				.delete(`stories/${this.story.id}/chapters/${this.toDelete}`)
				.then(() => this.$emit('update'))
				.catch(error => /* TODO: notify */ console.log(error))
		},
		deleteStory() {
			api
				.delete(`stories/${this.story.id}`)
				.then(() => this.$router.push({ name: 'my-stories' }))
				.catch(error => /* TODO: notify */ console.log(error))
		},
	},
}
</script>

<style scoped>
.synopsis {
	padding-left: 2rem;
}

.author {
	color: rgba(255, 255, 255, 0.7);
	font-style: italic;
}

.delete {
	float: right;
	color: #ff5126;
	font-size: 2rem;
	transition: 0.3s;
}

.delete:hover {
	transform: rotate(90deg);
}
</style>
