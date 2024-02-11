import axios from 'axios'
import type { Job } from './types'

export default async function getJobs() {
  const url = `${import.meta.env.VITE_APP_API_URL}/jobs`
  const response = await axios.get<Job[]>(url)
  return response.data
}
