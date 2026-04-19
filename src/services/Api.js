import axios from 'axios'
import Session from '@/helpers/Session'
import { userStore } from '@/stores/userStore'

let appRouter = null

export function injectRouter(routerInstance) {
  appRouter = routerInstance
}

// -----------------------------------------------------
// FUNÇÕES PARA TRATAR FORM DATA (arquivos)
// -----------------------------------------------------
function hasFile(data) {
  if (!data || typeof data !== 'object') return false

  return Object.values(data).some(
    (value) =>
      value instanceof File ||
      value instanceof Blob ||
      (Array.isArray(value) && value.some((v) => v instanceof File || v instanceof Blob)),
  )
}

function toFormData(data) {
  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    const value = data[key]

    if (value === null || value === undefined) return

    if (Array.isArray(value)) {
      value.forEach((v) => {
        formData.append(`${key}[]`, v)
      })
    } else {
      formData.append(key, value)
    }
  })

  return formData
}

// -----------------------------------------------------
// SETUP AXIOS
// -----------------------------------------------------
const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 15000,
})

// -----------------------------------------------------
// FUNÇÕES DE TOKEN
// -----------------------------------------------------
function getToken() {
  return Session.get('token')
}

function setToken(token) {
  Session.set('token', token)
  Session.set('updated-token', Date.now())
}

function removeToken() {
  Session.remove('token')
  Session.remove('updated-token')
}

// -----------------------------------------------------
// FUNÇÕES DE USUARIO
// -----------------------------------------------------
function getUser() {
  return Session.get('user')
}

function setUser(user) {
  userStore().set(user)
}

function removeUser() {
  userStore().clear()
}

// -----------------------------------------------------
// REQUEST INTERCEPTOR (envia token)
// -----------------------------------------------------
Api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// -----------------------------------------------------
// RESPONSE INTERCEPTOR (renova token vindo do backend)
// -----------------------------------------------------
Api.interceptors.response.use(
  (response) => {
    if (response?.token) {
      setToken(response.token)
    } else {
      const headerToken =
        response.headers['x-new-token'] ||
        response.headers['authorization'] ||
        response.headers['x-access-token']

      if (headerToken) {
        const cleanToken = headerToken.replace(/^Bearer\s+/i, '')
        setToken(cleanToken)
      }
    }

    return response
  },
  (error) => {
    const headerToken =
      error.response.headers['x-new-token'] ||
      error.response.headers['authorization'] ||
      error.response.headers['x-access-token']

    if (headerToken) {
      const cleanToken = headerToken.replace(/^Bearer\s+/i, '')
      setToken(cleanToken)
    }
    return Promise.reject(error)
  },
)

// -----------------------------------------------------
// FUNÇÃO CENTRALIZADA DE REQUEST
// -----------------------------------------------------
async function request(method, url, data = null, params = null) {
  try {
    let config = {
      method,
      url,
      params,
    }

    if (data) {
      if (hasFile(data)) {
        config.data = toFormData(data)
        config.headers = {
          'Content-Type': 'multipart/form-data',
        }
      } else {
        config.data = data
      }
    }

    const response = await Api(config)

    const ret = {
      ...response.data,
      success: true,
      status: response.status ?? 200,
      error: null,
    }

    if ((import.meta.env.VITE_DEBUG || '') === 'true') {
      console.log('OK ==> ', { method, url, params, ret })
    }

    return ret
  } catch (err) {
    let message = 'Erro desconhecido'
    let status = null

    if (err.response) {
      status = err.response.status
      message =
        err.response.data?.error ||
        err.response.data?.message ||
        JSON.stringify(err.response.data) ||
        'Erro no servidor'
    } else if (err.request) {
      message = 'Falha de conexão com o servidor.'
    } else {
      message = err.message
    }

    console.log('ERRO ==> ', { method, url, params, error: err.response?.data })
    if (appRouter) {
      if (
        err.response?.data?.code == 'INVALID_TOKEN' ||
        err.response?.data?.code == 'USER_NOT_FOUND'
      ) {
        appRouter.push({ name: 'login' })
        removeToken()
      }
    }

    return {
      ...err.response?.data,
      success: false,
      status,
      error: message,
    }
  }
}

// -----------------------------------------------------
// MÉTODOS PÚBLICOS
// -----------------------------------------------------
export default {
  async get(url, params = {}) {
    return await request('get', url, null, params)
  },
  async post(url, data = {}) {
    return await request('post', url, data)
  },
  async put(url, data = {}) {
    return await request('put', url, data)
  },
  async delete(url) {
    return await request('delete', url)
  },

  // AUTENTICAÇÃO ---------------------------------------

  async login(data) {
    const res = await request('post', '/auth/login', data)
    if (res.success && res?.token) {
      setToken(res.token)
      setUser(res?.user)
    }
    return res
  },

  async logout() {
    const res = await request('post', '/auth/logout')
    removeToken()
    removeUser()
    Session.clear()
    return res
  },

  async me() {
    return await request('get', '/auth/me')
  },

  async user() {
    return await getUser()
  },

  async token() {
    return await getToken()
  },

  async refresh() {
    const res = await request('post', '/auth/refresh')
    if (res.success && res?.token) {
      setToken(res.token)
      setUser(res?.user)
    }
    return res
  },
}
