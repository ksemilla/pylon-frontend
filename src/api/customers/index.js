import { PrivateAPI } from "api"

export const getCustomers = () => {
	const url = `api/customers/`
	return PrivateAPI.get(url)
}

export const fectchCustomer = (id) => {
	const url = `api/customers/${id}/`
	return PrivateAPI.get(url)
}

export const createCustomer = (data) => {
	const url = `api/customers/`
	return PrivateAPI.post(url, data)
}

export const updateCustomer = (data) => {
	const url = `api/customers/${data.id}/`
	return PrivateAPI.put(url, data)
}

export const deleteCustomer = (id) => {
	const url = `api/customers/${id}/`
	return PrivateAPI.delete(url)
}

export const createCustomerContact = (customer_id, data) => {
	const url = `api/customers/${customer_id}/contacts/`
	return PrivateAPI.post(url, data)
}

export const updateCustomerContact = (customer_id, id, data) => {
	const url = `api/customers/${customer_id}/contacts/${id}/`
	return PrivateAPI.put(url, data)
}

export const createCustomerAddress = (customer_id, data) => {
	const url = `api/customers/${customer_id}/addresses/`
	return PrivateAPI.post(url, data)
}

export const updateCustomerAddress = (customer_id, id, data) => {
	const url = `api/customers/${customer_id}/addresses/${id}/`
	return PrivateAPI.put(url, data)
}