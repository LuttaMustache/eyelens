<template>
	<div class="container">
		<form class="form" @submit.prevent="signup">
			<h1>{{ $t('navbar.Signup') }}</h1>
			<p v-html="$t('signup.rules')"></p>
			<custom-input
				v-model="username"
				:placeholder="$t('Username')"
			></custom-input>
			<custom-input
				v-model="nickname"
				:placeholder="$t('Nickname')"
			></custom-input>
			<custom-input
				v-model="password"
				:placeholder="$t('Password')"
				type="password"
			></custom-input>
			<custom-input
				v-model="passwordConfirm"
				:placeholder="$t('Confirm password')"
				type="password"
			></custom-input>
			<p
				:style="{ opacity: error ? 1 : 0 }"
				style="transition: 0.2s ease-out; color: #ff5126"
			>
				{{ error ? $t('errors.' + error) : 'you should not see this :)' }}
			</p>
			<custom-button primary> {{ $t("Let's go") }}</custom-button>
		</form>
	</div>
</template>

<script>
import CustomButton from '../components/CustomButton.vue'
import CustomInput from '../components/CustomInput.vue'
import api from '../packs/api'

export default {
	components: {
		CustomInput,
		CustomButton,
	},
	data() {
		return {
			username: '',
			password: '',
			passwordConfirm: '',
			nickname: '',
			error: null,
		}
	},
	methods: {
		signup() {
			if (this.password != this.passwordConfirm) {
				this.error = 'Passwords do not match'
				return
			}
			api
				.post('users', {
					username: this.username,
					password: this.password,
					nickname: this.nickname,
				})
				.then(response => {
					if (response.data.error) {
						this.error = response.data.error
					} else {
						localStorage.setItem('token', response.data.token)
						api.setToken()
						this.$store.commit('login', response.data.user)
						this.$router.replace({ name: 'main' })
					}
				})
				.catch(err => console.log(err))
		},
	},
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.form {
	display: flex;
	flex-direction: column;
}

.form > * {
	margin-top: 1rem;
}
</style>
