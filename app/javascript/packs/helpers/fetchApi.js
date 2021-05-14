import { convertKeysToCamelCase, convertKeysToSnakeCase } from "./stringConversion";

export const postFetch = async (request) => {
  let { url, body } = request;
  let headers = { 'Content-Type': 'application/json' }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(convertKeysToSnakeCase(body))
  })
  const responseBody = await response.json();
  const status = await response.status;

  if (status === 200) {
    const resJSON = {
      status,
      body: convertKeysToCamelCase(responseBody)
    }
    return { response: resJSON };
  } else {
    return { error: responseBody.message || 'Something Went Wrong' };
  }
}


export const getFetch = async (request) => {
  let url = request.url;
  let headers = { 'Content-Type': 'application/json' }

  const params = new URLSearchParams(
    convertKeysToSnakeCase(request.body)
  ).toString();

  url = `${url}?${params}`
  const response = await fetch(url, {
    method: 'GET',
    headers,
  })
  const responseBody = await response.json();
  const status = await response.status;

  if (status === 200) {
    const resJSON = {
      status,
      body: convertKeysToCamelCase(responseBody)
    }
    return { response: resJSON }
  } else {
    return { error: responseBody.message || 'Something Went Wrong' };
  }
}
