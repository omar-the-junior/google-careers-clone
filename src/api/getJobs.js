import axios from 'axios'

export default async function getJobs() {
  const url = `${import.meta.env.VITE_APP_API_URL}/jobs`
  const response = await axios.get(url)
  return response.data
}
