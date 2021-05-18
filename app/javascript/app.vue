<template>
	<div id="app" v-show="loaded">
		<navigation class="navigation"></navigation>
		<div class="content">
			<router-view class="view"></router-view>
		</div>
	</div>
</template>

<script>
import MainPage from './views/MainPage.vue'
import Header from './components/Header'
import api from './packs/api'

export default {
	components: { MainPage, navigation: Header },
	data: function() {
		return {
			loaded: false,
		}
	},
	created() {
		this.loaded = false
		api
			.get('auto_login')
			.then(response => {
				this.$store.commit('login', response.data)
			})
			.catch(error => {
				// TODO: notification
			})
			.finally(() => {
				this.loaded = true
			})
	},
}
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css');

html {
	font-family: Arial, Helvetica, sans-serif;
	background-color: #121212;
	color: white;
}

a {
	color: white;
	text-decoration: none;
}

p,
pre,
textarea {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1em;
}

:focus {
	outline: none;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>

<style scoped>
.navigation {
	position: fixed;
	left: 0;
	top: 0;
	height: 70px;
	z-index: 12;
}

.content {
	padding-top: 70px;
	width: 100%;
	display: inline-flex;
	justify-content: center;
}

.view {
	width: 70%;
	color: white;
	margin-top: 1rem;
	border-radius: 0.3rem;
	padding: 1rem;

	background-color: rgba(255, 255, 255, 0.07);
}

@media screen and (max-width: 800px) {
	.view {
		width: 90%;
	}
}
</style>
