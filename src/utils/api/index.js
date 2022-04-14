const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080";

export async function loginUser(credentials) {
    return fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}

export async function createUser(user, signal) {}
