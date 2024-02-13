import axios from 'axios'
import type { Degree } from './types'

export default async function getDegrees() {
  const url = `${import.meta.env.VITE_APP_API_URL}/degrees`
  const response = await axios.get<Degree[]>(url)
  return response.data
}
