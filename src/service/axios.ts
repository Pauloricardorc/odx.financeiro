import axios from 'axios'
import Cookie from 'js-cookie'

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_SERVICE,
})

API.interceptors.request.use(
  async (config) => {
    const session = Cookie.get('session')

    if (session) {
      config.headers.authorization = `Bearer ${JSON.parse(session!).accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
