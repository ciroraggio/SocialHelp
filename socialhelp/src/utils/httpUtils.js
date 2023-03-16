export const POST = "POST";
export const serverPostRequest = (url, body) =>
  fetch(url, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: body.username,
      password: body.password,
    }),
  });
