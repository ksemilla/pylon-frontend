import { PrivateAPI } from "api"

export const getVendors = () => {
	const url = `api/vendors/`
	return PrivateAPI.get(url)
}

export const createVendor = (data) => {
	const url = `api/vendors/`
	return PrivateAPI.post(url, data)
}

export const fectchVendor = (id) => {
	const url = `api/vendors/${id}/`
	return PrivateAPI.get(url)
}

export const updateVendor = (id, data) => {
	const url = `api/vendors/${id}/`
	return PrivateAPI.put(url, data)
}

export const createVendorAddress = (id, data) => {
	const url = `api/vendors/${id}/addresses/`
	return PrivateAPI.post(url, data)
}

export const updateVendorAddress = (vendor_id, id, data) => {
	const url = `api/vendors/${vendor_id}/addresses/${id}/`
	return PrivateAPI.put(url, data)
}

export const createVendorContact = (id, data) => {
	const url = `api/vendors/${id}/contacts/`
	return PrivateAPI.post(url, data)
}

export const updateVendorContact = (vendor_id, id, data) => {
	const url = `api/vendors/${vendor_id}/contacts/${id}/`
	return PrivateAPI.put(url, data)
}