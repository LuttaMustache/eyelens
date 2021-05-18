<template>
	<div v-if="story">
		<h2>{{ chapter.title }}</h2>
		<paginator
			:left="index > 0"
			:right="index < story.chapters.length - 1"
			@next="next"
			@prev="prev"
		></paginator>
		<editor-content class="reader" :editor="reader" />
		<paginator
			:left="index > 0"
			:right="index < story.chapters.length - 1"
			@next="next"
			@prev="prev"
		></paginator>
	</div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
	HardBreak,
	Heading,
	HorizontalRule,
	Bold,
	Italic,
	Link,
	Strike,
	Underline,
} from 'tiptap-extensions'
import Paginator from '../components/Paginator.vue'
import api from '../packs/api'
export default {
	components: { Paginator, EditorContent },
	props: {
		story: Object,
		chapter_id: [String, Number],
	},
	data() {
		return {
			chapter: this.story.chapters.find(
				chapter => chapter.id == this.chapter_id
			),
			reader: null,
		}
	},
	computed: {
		index() {
			return this.story.chapters.findIndex(
				chapter => chapter.id == this.chapter_id
			)
		},
	},
	methods: {
		load(id = this.chapter_id) {
			api
				.get(`stories/${this.story.id}/chapters/${id}`)
				.then(response => {
					this.chapter = response.data
					this.reader = new Editor({
						editable: false,
						extensions: [
							new HardBreak(),
							new Heading({ levels: [1, 2, 3] }),
							new HorizontalRule(),
							new Link(),
							new Bold(),
							new Italic(),
							new Strike(),
							new Underline(),
						],
						content: this.chapter.content,
					})
				})
				.catch(error => /* TODO: notify */ console.log(error))
		},
		next() {
			this.$router.push({
				name: 'chapter',
				params: {
					id: this.story.id,
					chapter_id: this.story.chapters[this.index + 1].id,
				},
			})
		},
		prev() {
			this.$router.push({
				name: 'chapter',
				params: {
					id: this.story.id,
					chapter_id: this.story.chapters[this.index - 1].id,
				},
			})
		},
	},
	created() {
		this.load()
	},
	beforeDestroy() {
		this.reader.destroy()
	},
	beforeRouteUpdate(to, from, next) {
		this.reader.destroy()
		this.load(to.params.chapter_id)
		next()
	},
}
</script>

<style></style>
