/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '../app.vue'
import MainPage from '../views/MainPage.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import NotFound from '../views/NotFound.vue'
import StoryView from '../views/StoryView.vue'
import Story from '../views/Story.vue'
import MyStories from '../views/MyStories.vue'
import NewChapter from '../views/NewChapter.vue'
import Reader from '../views/Reader.vue'
import VueI18n from 'vue-i18n'
import translations from '../translations'

Vue.use(VueI18n)

const i18n = new VueI18n({
	locale: process.env.VUE_APP_I18N_LOCALE || 'ru',
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ru',
	messages: translations,
})

Vue.use(VueRouter)

const routes = [
	// { path: '/', redirect: { name: 'main' } },
	{ path: '/home', component: MainPage, name: 'main' },
	{ path: '/about', component: About, name: 'about' },
	{ path: '/login', component: Login, name: 'login' },
	{ path: '/signup', component: Signup, name: 'signup' },
	{
		path: '/story/:id',
		component: StoryView,
		props: true,
		children: [
			{ path: '', component: Story, name: 'story' },

			{
				path: 'new-chapter',
				component: NewChapter,
				name: 'new-chapter',
			},

			{
				path: 'chapter/:chapter_id',
				component: Reader,
				name: 'chapter',
				props: true,
			},
		],
	},
	{ path: '/my-stories', component: MyStories, name: 'my-stories' },

	{ path: '/*', component: NotFound },
]

const router = new VueRouter({
	base: '/app/',
	mode: 'history',
	routes,
})

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: null,
		story: null,
	},
	mutations: {
		login(state, user) {
			state.user = user
		},
		update_story(state, story) {
			state.story = story
		},
	},
})

const app = new Vue({
	render: h => h(App),
	router,
	i18n,
	store,
}).$mount()

console.log('b')
const load = () => {
	console.log('a')
	if (document.readyState === 'complete') {
		document.body.appendChild(app.$el)
	}
}
load()
document.onreadystatechange = load

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>

// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })
