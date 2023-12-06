const SERVER_URL = 'http://localhost:3000/';

export async function get<T>(url: string): Promise<T> {
  const api = `${SERVER_URL}${url}`;

  return (await fetch(api)).json();
}

export async function post<T>(data: any): Promise<T> {
  const api = `${SERVER_URL}`;

  return (await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })).json();
}