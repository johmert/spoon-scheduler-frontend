const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export async function loginUser(credentials, signal) {
    return fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        signal
    })
    .then(data => data.json())
}

export async function createUser(credentials, signal) {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        signal
    })
    .then(data => data.json())
}
