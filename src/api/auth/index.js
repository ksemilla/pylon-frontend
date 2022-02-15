import axios from "axios"

import { API_URL } from "config"


export const login = (data) => {
	const url = `${API_URL}/api/token/`
	return axios.post(url, data)
}

export const verify = (token) => {

	const url = `${API_URL}/api/token/verify/`
	return axios.post(url, { token })
}