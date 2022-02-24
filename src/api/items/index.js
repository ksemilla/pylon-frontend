import { PrivateAPI } from "api"

export const getInventory = () => {
	const url = `api/inventory/`
	return PrivateAPI.get(url)
}

export const createStock = (data) => {
	const url = `api/inventory/stocks/`
	return PrivateAPI.post(url, data)
}

export const fetchStock = (id) => {
	const url = `api/inventory/stocks/${id}/`
	return PrivateAPI.get(url)
}

export const updateStock = (id, data) => {
	const url = `api/inventory/stocks/${id}/`
	return PrivateAPI.put(url, data)
}

export const createStockInstance = (stock_id, data) => {
	const url = `api/inventory/stocks/${stock_id}/instances/`
	return PrivateAPI.post(url, data)
}

export const updateStockInstance = (stock_id, id, data) => {
	const url = `api/inventory/stocks/${stock_id}/instances/${id}/`
	return PrivateAPI.put(url, data)
}

export const createStockVendor = (stock_id, data) => {
	const url = `api/inventory/stocks/${stock_id}/vendors/`
	return PrivateAPI.post(url, data)
}

export const updateStockVendor = (stock_id, id, data) => {
	const url = `api/inventory/stocks/${stock_id}/vendors/${id}/`
	return PrivateAPI.put(url, data)
}

export const createLabor = (data) => {
	const url = `api/inventory/labor/`
	return PrivateAPI.post(url, data)
}

export const fetchLabor = (id) => {
	const url = `api/inventory/labor/${id}/`
	return PrivateAPI.get(url)
}

export const updateLabor = (id, data) => {
	const url = `api/inventory/labor/${id}/`
	return PrivateAPI.put(url, data)
}

export const createLaborVendor = (labor_id, data) => {
	const url = `api/inventory/labor/${labor_id}/vendors/`
	return PrivateAPI.post(url, data)
}

export const updateLaborVendor = (labor_id, id, data) => {
	const url = `api/inventory/labor/${labor_id}/vendors/${id}/`
	return PrivateAPI.put(url, data)
}

export const createDocument = (data) => {
	const url = `api/inventory/document/`
	return PrivateAPI.post(url, data)
}

export const fetchDocument = (id) => {
	const url = `api/inventory/document/${id}/`
	return PrivateAPI.get(url)
}

export const updateDocument= (id, data) => {
	const url = `api/inventory/document/${id}/`
	return PrivateAPI.put(url, data)
}

export const createDocumentVendor = (document_id, data) => {
	const url = `api/inventory/document/${document_id}/vendors/`
	return PrivateAPI.post(url, data)
}

export const updateDocumentVendor = (document_id, id, data) => {
	const url = `api/inventory/document/${document_id}/vendors/${id}/`
	return PrivateAPI.put(url, data)
}

export const createAssembly = (data) => {
	const url = `api/inventory/assembly/`
	return PrivateAPI.post(url, data)
}

export const fetchAssembly = (id) => {
	const url = `api/inventory/assembly/${id}/`
	return PrivateAPI.get(url)
}

export const updateAssembly= (id, data) => {
	const url = `api/inventory/assembly/${id}/`
	return PrivateAPI.put(url, data)
}

export const createAssemblyInstance = (assembly_id, data) => {
	const url = `api/inventory/assembly/${assembly_id}/instances/`
	return PrivateAPI.post(url, data)
}

export const updateAssemblyInstance = (assembly_id, id, data) => {
	const url = `api/inventory/assembly/${assembly_id}/instances/${id}/`
	return PrivateAPI.put(url, data)
}

export const createAssemblyVendor = (assembly_id, data) => {
	const url = `api/inventory/assembly/${assembly_id}/vendors/`
	return PrivateAPI.post(url, data)
}

export const updateAssemblyVendor = (assembly_id, id, data) => {
	const url = `api/inventory/assembly/${assembly_id}/vendors/${id}/`
	return PrivateAPI.put(url, data)
}