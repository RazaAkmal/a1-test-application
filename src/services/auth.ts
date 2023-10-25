import axios from 'axios';

const baseURL = 'https://3.93.15.104';

export const authApi = axios.create({
  baseURL,
});

const TOKEN_COOKIE_KEY = 'authToken';

export const authenticate = async (email: string, password: string): Promise<string> => {
  try {
    const response = await authApi.post('api/users/token/', { email, password });
    const accessToken = response.data.access_token;

    // Save the access token in an HTTP-only cookie
    document.cookie = `${TOKEN_COOKIE_KEY}=${accessToken}; Secure; HttpOnly`;

    return accessToken;
  } catch (error) {
    throw new Error('Authentication failed.');
  }
};

export const setAuthToken = (token: string | null): void => {
  // No need to set the token in the headers, as the browser automatically includes it in requests with an HTTP-only cookie
};

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === TOKEN_COOKIE_KEY) {
      return value;
    }
  }
  return null;
};
