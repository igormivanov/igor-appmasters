import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL
const apiKey = process.env.REACT_APP_API_KEY
const timeout = 5000 // 5s

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'dev-email-address': apiKey
  }
});

const getAll = async () => {
  try {
    const response = await api.get('/data', { timeout })
    return response.data
  }
  catch (error) {
    console.log('Error:', error.message)
    if (error.code === 'ECONNABORTED') {
      throw Error('O servidor demorou para responder, tente mais tarde')
    }
    if (error.response) {
      console.log('Status:', error.response.status)
      switch (error.response.status) {
        case 500: case 502: case 503: case 504: case 507: case 508: case 509:
          throw Error('O servidor fahou em responder, tente recarregar a página')
        default:
          throw Error('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde');
      }
    }
    throw Error(error.message)
  }
}

export const getAllGames = getAll
