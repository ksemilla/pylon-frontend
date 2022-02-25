let backendHost = ''
// const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname

if (hostname === 'pylon.ksemilla.com') {
  backendHost = 'https://pylon-api.ksemilla.com'
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000'
}

export const API_URL = backendHost