import axios from "axios"

// Configuração base do axios
export const api = axios.create({
  baseURL: "http://localhost:8080", // URL do backend Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar token de autenticação (quando implementado)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Tratamento de erros comuns
    if (error.response) {
      // Erro de autenticação
      if (error.response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/"
      }

      // Erro de permissão
      if (error.response.status === 403) {
        console.error("Acesso negado")
      }
    }

    return Promise.reject(error)
  },
)
