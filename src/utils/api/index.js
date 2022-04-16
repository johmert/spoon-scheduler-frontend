const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options, onCancel) {
    try {
        const response = await fetch(url, options);
        if (response.status < 200 || response.status > 399) {
            throw new Error(`${response.status} - ${response.statusText}`);
        }
        if (response.status === 204) {
            return null;
        }
        return await response.json();
    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error.stack);
            throw error;
        }
      return Promise.resolve(onCancel);
    }
}

export async function createUser(credentials, signal) {
    const url = `${API_BASE_URL}/users`;
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials),
        signal
    }
    return await fetchJson(url, options, {});
}

export async function loginUser(credentials, signal) {
    const url = `${API_BASE_URL}/login`;
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(credentials),
        signal
    }
    return await fetchJson(url, options, {});
}

export async function readUser(userId, signal) {
    const url = `${API_BASE_URL}/users/${userId}`;
    const user = await fetch(url, {
        method: 'GET',
        headers,
        signal
    })
    .then(data => data.json())
    const { data } = user;
    return data;
}