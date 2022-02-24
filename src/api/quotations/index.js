import { PrivateAPI } from "api"

export const getQuotations = () => {
	const url = `api/quotations/`
	return PrivateAPI.get(url, )
}

export const fectchQuotation = (id) => {
	const url = `api/quotations/${id}/`
	return PrivateAPI.get(url)
}

export const createQuotation = (data) => {
	const url = `api/quotations/`
	return PrivateAPI.post(url, data)
}

export const updateQuotation = (data, ) => {
	const url = `api/quotations/${data.id}/`
	return PrivateAPI.put(url, data)
}