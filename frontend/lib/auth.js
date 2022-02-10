import { jsonResponse } from "./response"

export async function getMe(access_token) {
  const response = await fetch("http://localhost:8000/api/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + access_token,
    }
  })
  if (!response.ok) {
    return jsonResponse(401, { error: { message: "login failed" } })
  }
  return response
}