import axios from 'axios';

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

export const API_URL = (
  configuredApiUrl || 'https://api-ecommerce-5aby.onrender.com'
).replace(/\/+$/, '');

export function getAuthorizationHeader(token: string): string {
  const normalizedToken = token
    .trim()
    .replace(/^(?:Bearer(?:\s+|$))+/i, '')
    .trim();

  if (!normalizedToken) {
    throw new Error('A valid session token is required.');
  }

  return `Bearer ${normalizedToken}`;
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage: string,
): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error && error.message ? error.message : fallbackMessage;
  }

  const responseData: unknown = error.response?.data;

  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (responseData && typeof responseData === 'object') {
    const data = responseData as Record<string, unknown>;
    const serverMessage = data.message ?? data.Message ?? data.error ?? data.detail;

    if (typeof serverMessage === 'string' && serverMessage.trim()) {
      return serverMessage;
    }
  }

  return error.message || fallbackMessage;
}
