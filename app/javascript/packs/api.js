import axios from 'axios'

const api = axios.create({
	baseURL: '/api/',
})

api.setToken = function() {
	if (localStorage.getItem('token')) {
		this.defaults.headers.common['Authorization'] =
			'Bearer ' + localStorage.getItem('token')
	}
}

api.setToken()

export default api
