export function jsonResponse(status, data) {
  return {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data
  }
}
