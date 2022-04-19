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

export async function createDay(day, userId, signal) {
    const url = `${API_BASE_URL}/users/${userId}/days`;
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(day),
        signal
    }
    return await fetchJson(url, options, {});
}

export async function createEvent(event, userId, signal) {
    const { date } = event;
    const url = `${API_BASE_URL}/users/${userId}/days/${date}`;
    const options = {
        method: 'POST',
        headers,
        body: JSON.stringify(event),
        signal
    }
    return await fetchJson(url, options, {});
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

export async function readDay(date, userId, signal) {
    const url = `${API_BASE_URL}/users/${userId}/days/${date}`;
    const getDay = await fetch( url, {
        method: 'GET',
        headers,
        signal
    }).then(data => data.json());
    const { data } = getDay;
    return data;
}

export async function readEvent(date, eventId, userId, signal) {
    const url = `${API_BASE_URL}/users/${userId}/days/${date}/${eventId}`;
    const getEvent = await fetch(url, {
        method: 'GET',
        headers,
        signal
    }).then(data => data.json());
    const { data } = getEvent;
    return data;
}

export async function readUser(userId, signal) {
    const url = `${API_BASE_URL}/users/${userId}`;
    const user = await fetch(url, {
        method: 'GET',
        headers,
        signal
    }).then(data => data.json());
    const { data } = user;
    return data;
}

export async function updateDay(day, userId, signal) {
    const { date } = day;
    const url = `${API_BASE_URL}/users/${userId}/days/${date}`;
    const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify(day),
        signal
    }
    return await fetchJson(url, options, {});
}

export async function updateEvent(event, userId, signal) {
    const { date, event_id } = event;
    const url = `${API_BASE_URL}/users/${userId}/days/${date}/${event_id}`;
    const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify(event),
        signal
    }
    return await fetchJson(url, options, {});
}

export async function updateUser(user, signal) {
    const { user_id } = user;
    const url = `${API_BASE_URL}/users/${user_id}`;
    const options = {
        method: 'PUT',
        headers,
        body: JSON.stringify(user),
        signal
    }
    return await fetchJson(url, options, {});
}