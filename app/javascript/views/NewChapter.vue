<template>
	<div>
		<h2 v-if="story">{{ story.title }}</h2>
		<custom-input
			v-model="title"
			style="margin-bottom: 1rem; font-size: 1.4rem"
			:placeholder="this.$t('New chapter')"
			autofocus
		></custom-input>
		<editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
			<div class="menubar">
				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.bold() }"
					@click="commands.bold"
				>
					<em class="bi-type-bold" />
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.italic() }"
					@click="commands.italic"
				>
					<em class="bi-type-italic" />
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.strike() }"
					@click="commands.strike"
				>
					<em class="bi-type-strikethrough" />
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.underline() }"
					@click="commands.underline"
				>
					<em class="bi-type-underline" />
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.paragraph() }"
					@click="commands.paragraph"
				>
					<em class="bi-paragraph" />
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 1 }) }"
					@click="commands.heading({ level: 1 })"
				>
					H1
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 2 }) }"
					@click="commands.heading({ level: 2 })"
				>
					H2
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 3 }) }"
					@click="commands.heading({ level: 3 })"
				>
					H3
				</button>

				<button class="menubar__button" @click="commands.horizontal_rule">
					<em class="bi-hr" />
				</button>

				<button class="menubar__button" @click="commands.undo">
					<em class="bi-chevron-left" />
				</button>

				<button class="menubar__button" @click="commands.redo">
					<em class="bi-chevron-right" />
				</button>
			</div>
		</editor-menu-bar>
		<editor-content :editor="editor" class="editor"> </editor-content>
		<custom-button primary style="float:right" @click.native="save">
			{{ $t('Post') }}
		</custom-button>
	</div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
	HardBreak,
	Heading,
	HorizontalRule,
	Bold,
	Italic,
	Link,
	Strike,
	Underline,
	History,
} from 'tiptap-extensions'
import CustomInput from '../components/CustomInput.vue'
import CustomButton from '../components/CustomButton.vue'
import api from '../packs/api'

export default {
	components: {
		EditorContent,
		EditorMenuBar,
		CustomInput,
		CustomButton,
	},
	props: {
		story: Object,
	},
	data() {
		return {
			editor: null,
			title: '',
		}
	},
	methods: {
		save() {
			api
				.post('stories/' + this.story.id + '/chapters', {
					title: this.title,
					content: this.editor.getHTML(),
				})
				.then(() => {
					this.$emit('update')
					this.$router.push({ name: 'story', params: { id: this.story.id } })
				})
				.catch(error => console.log(error))
		},
	},
	mounted() {
		let vm = this
		window.onbeforeunload = function(event) {
			localStorage.setItem('chapter-' + vm.story.id, vm.editor.getHTML())
		}

		let saved = localStorage.getItem('chapter-' + this.story.id)
		this.editor = new Editor({
			extensions: [
				new HardBreak(),
				new Heading({ levels: [1, 2, 3] }),
				new HorizontalRule(),
				new Link(),
				new Bold(),
				new Italic(),
				new Strike(),
				new Underline(),
				new History(),
			],
			content: saved
				? saved
				: '<p>Начни печатать прямо здесь!</p><p>Все изменения будут сохранены даже после закрытия</p>',
		})
	},
	beforeDestroy() {
		this.editor.destroy()
	},
}
</script>

<style scoped>
.menubar__button {
	color: white;
	background: none;
	font-size: 1.2rem;
	border: none;
	cursor: pointer;
}

.editor {
	border: 2px solid rgba(255, 255, 255, 0.08);
	padding: 0 1rem 0 1rem;
	border-radius: 0.5rem;
	margin: 1rem 0 1rem 0;
}
</style>
