export const APP_URL = 'http://localhost:3000'

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'x-api-key': localStorage.getItem('token'),
}
