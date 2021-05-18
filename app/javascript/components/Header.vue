<template>
	<nav>
		<button class="toggler" @click="isNavActive = !isNavActive">
			<em class="bi-list"></em>
		</button>
		<div class="nav-items" :class="{ active: isNavActive }">
			<router-link
				@click.native="isNavActive = false"
				:to="{ name: link.route }"
				v-for="link in links"
				:key="link.route"
			>
				{{ $t('navbar.' + link.title) }}
				<div class="selector"></div>
			</router-link>
			<div class="space"></div>
			<router-link
				@click.native="isNavActive = false"
				class="writing"
				:to="{ name: 'my-stories' }"
				v-if="$store.state.user"
			>
				<div class="main"><em class="bi-pen"></em></div>
				<div class="sub">
					{{ $t('navbar.WriteAs', { nick: $store.state.user.nickname }) }}
				</div>
				<div class="selector"></div>
			</router-link>
			<div @click="logout" class="logout" v-if="$store.state.user">
				{{ $t('navbar.Logout') }}
			</div>
			<router-link
				@click.native="isNavActive = false"
				:to="{ name: 'signup' }"
				v-if="!$store.state.user"
			>
				{{ $t('navbar.Signup') }}
				<div class="selector"></div>
			</router-link>
			<router-link
				@click.native="isNavActive = false"
				class="ending"
				v-if="!$store.state.user"
				:to="{ name: 'login' }"
				>{{ $t('navbar.Login') }}</router-link
			>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			links: [
				{
					route: 'main',
					title: 'Home',
				},
				{
					route: 'about',
					title: 'About',
				},
			],
			isNavActive: false,
		}
	},
	methods: {
		logout() {
			this.isNavActive = false
			this.$store.state.user = null
			localStorage.setItem('token', undefined)
			this.$router.push({ name: 'main' })
			location.reload()
		},
	},
}
</script>

<style scoped>
nav {
	width: 100%;
	height: 100%;
	background-color: #2c2c2c;
	position: relative;
}

.nav-items {
	display: flex;
	height: 100%;
	overflow: hidden;
}

.nav-items > * {
	position: relative;
	margin-left: 2rem;
	height: calc(100% - 3px);
	display: flex;
	align-items: center;
	border-left: 3px solid #a3f7bf;
	padding-left: 1rem;
}

.ending {
	height: 100%;
	background-color: #a3f7bf;
	color: black;
	padding-right: 1rem;
	transition: 0.5s;
}

.ending:hover {
	background-color: #679b79;
}

.nav-items > * > .selector {
	position: absolute;
	background-color: #a3f7bf;
	bottom: -3px;
	left: -3px;
	height: 3px;
	width: 2.8px;
	content: none;
	transition: 0.4s ease-out;
}

.nav-items > *:hover > .selector {
	width: calc(100% + 1rem);
}

.nav-items a {
	text-decoration: none;
}

.toggler {
	display: none;
	position: absolute;
	right: 1rem;
	top: 1rem;
	background: none;
	color: white;
	font-size: 1.7rem;
	border: none;
	outline: none;
}

.space {
	border: none;
	flex-grow: 1;
}

.writing {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
}

.writing > .main {
	font-size: 2rem;
}

.writing > .sub {
	font-size: 1rem;
}

.logout {
	border-left: 3px solid#ff5126;
	cursor: pointer;
	padding-right: 1rem;
	height: 100%;
	transition: 0.4s ease-out;
}

.logout:hover {
	background-color: #ff5126;
}

@media screen and (max-width: 800px) {
	.space {
		border: none !important;
	}

	.toggler {
		display: block;
	}

	.nav-items::before {
		content: '';
		min-height: 70px;
	}

	.nav-items {
		background-color: #2c2c2c;
		flex-direction: column;
		height: 70px;
		transition: 0.4s ease-out;
	}

	/* Dropdown height */
	.nav-items.active {
		height: calc(5 * 3rem + 70px);
	}

	.selector {
		display: none;
	}

	.nav-items > * {
		border: none;
		border-right: 5px solid #a3f7bf;
		width: calc(100% - 2.5rem - 5px);
		margin-left: 0.5rem;
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		line-height: 2rem;
	}

	.logout {
		border-right: 5px solid #ff5126;
		padding-right: 0;
	}

	.ending {
		padding-right: 0;
	}
}
</style>
