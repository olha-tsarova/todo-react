const API_URL = 'http://127.0.0.1:9800'

export function getTodosFromServer(options) {
  return fetch(`${API_URL}${options}`)
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .catch((err) => console.error(err))
}

export function queryToServer(options, method, data) {
  console.log(`DATA: ${data}`)
  return fetch(`${API_URL}${options}`, {
    method,
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then((response) => response)
    .catch((err) => console.error(err))
}
