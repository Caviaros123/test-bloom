import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const apiInstance = axios.create({
  withCredentials: false,
})

apiInstance.interceptors.response.use(
  (response: any) => {
    return response
  },
  (error: any) => {
    if (error.response.status === 401) {
      // handle 401 error
      console.log("401 error")
    }
    return Promise.reject(error)
  }
)


export class Api {
  public apiInstance: AxiosInstance

  constructor(instance: AxiosInstance) {
    this.apiInstance = instance
  }

  async get(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
    return await apiInstance.get(url, config)
  }
  async post(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<AxiosResponse<any, any>> {
    return await apiInstance.post(url, data, config)
  }
}

const api = new Api(apiInstance)

export default api



