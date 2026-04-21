import axios, { isAxiosError } from "axios"

//esta clase será un wrapper de axios. Pondremos aquí ciertas "configuraciones" para ahorrar código común
//y para facilitar la modificación si cambia algo en serbidos

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('AUTH-TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'Ocurrió un error inesperado en el servidor';

        if (isAxiosError(error) && error.response) {
            message = error.response.data.error || message;
        } else {
            message = error.message || message;
        }

        return Promise.reject(new Error(message));
    }
)

export default api