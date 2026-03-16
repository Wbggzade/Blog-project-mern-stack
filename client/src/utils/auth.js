const TOKEN_KEY = 'blog_token';
export const AUTH_CHANGE_EVENT = 'authChange';

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token) => {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const clearToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const isAuthenticated = () => {
  return Boolean(getToken());
};

// Wrapper around fetch to add authorization header and auto-redirect on 401
export const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Ensure JSON content-type unless a FormData body is being sent
  if (
    !(options.body instanceof FormData) &&
    !headers['Content-Type'] &&
    !(options.headers && options.headers['Content-Type'])
  ) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (response.status === 401) {
    clearToken();
    window.location.href = '/login';
  }

  return response;
};
