import axios from 'axios'

import { API_URL } from "config"

const getAccessToken = () => localStorage.getItem('access')

const buildUrl = (url) => `${API_URL}/${url}`

export const PrivateAPI = {
  get: (url, query) => {
    return axios({
      method: 'get',
      url: buildUrl(url),
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      },
      params: query
    })
  },

  post: (url, payload) => {
    return axios({
      method: 'post',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  },

  // postfile: function (url, payload) {
  //   const formData = getFormData(payload)
  //   return axios({
  //     method: 'post',
  //     url: buildUrl(url),
  //     data: formData,
  //     headers: {
  //       Authorization: `JWT ${getAccessToken()}`
  //     }
  //   })
  // },

  put: (url, payload) => {
    return axios({
      method: 'put',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  },

  delete: (url, payload) => {
    return axios({
      method: 'delete',
      url: buildUrl(url),
      data: payload,
      headers: {
        Authorization: `JWT ${getAccessToken()}`
      }
    })
  }
}