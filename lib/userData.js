import { getToken } from './authenticate';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function makeRequest(url, method, data = null) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${token}`,
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);
    if (res.status === 200) {
      return await res.json();
    } else {
      console.error('Request failed:', res.status);
      return [];
    }
  } catch (err) {
    console.error('Error during fetch:', err);
    return [];
  }
}

export async function addToFavourites(id) {
  const url = `${API_URL}/favourites/${id}`;
  return await makeRequest(url, 'PUT');
}

export async function removeFromFavourites(id) {
  const url = `${API_URL}/favourites/${id}`;
  return await makeRequest(url, 'DELETE');
}

export async function getFavourites() {
  const url = `${API_URL}/favourites`;
  return await makeRequest(url, 'GET');
}

export async function addToHistory(id) {
  const url = `${API_URL}/history/${id}`;
  return await makeRequest(url, 'PUT');
}

export async function removeFromHistory(id) {
  const url = `${API_URL}/history/${id}`;
  return await makeRequest(url, 'DELETE');
}

export async function getHistory() {
  const url = `${API_URL}/history`;
  return await makeRequest(url, 'GET');
}
