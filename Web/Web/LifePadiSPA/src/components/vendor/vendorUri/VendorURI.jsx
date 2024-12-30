import baseUrl from '../../../api/baseUrl'

export const vendorProductsUrl = baseUrl + 'vendor/{id}/products'
export const vendorProductStatUrl = baseUrl + 'product/vendorStat/{id}'

export const getCategoriesUrl = baseUrl + 'category/allLite'

export const createProductUrl = baseUrl + 'product/create' //POST request
export const toggolProductStatusUrl = baseUrl + 'product/toogleStatus/{id}' //PUT request
export const deleteProductUrl = baseUrl + 'product/{id}/delete' //DELETE request
export const updateProductUrl = baseUrl + 'product/update/{id}' //PUT request
export const getProductUrl = baseUrl + 'product/get/{id}' //GET request
