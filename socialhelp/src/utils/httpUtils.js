export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";

export const serverUrl = "http://localhost:3001";

export const serverPostRequestNoAuth = (route, body) =>
  fetch(`${serverUrl}/${route}`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const serverPostRequestAuth = (route, body, token) =>
  fetch(`${serverUrl}/${route}`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const serverGetRequest = (route, token) =>
  fetch(`${serverUrl}/${route}`, {
    method: GET,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const serverPutRequest = (route, body, token) =>
  fetch(`${serverUrl}/${route}`, {
    method: PUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
