const requiredEnv = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  appOrigin: import.meta.env.VITE_APP_ORIGIN
};

export const authConfig = {
  domain: requiredEnv.domain,
  clientId: requiredEnv.clientId,
  authorizationParams: {
    audience: requiredEnv.audience,
    redirect_uri: requiredEnv.appOrigin || window.location.origin
  },
  logoutParams: {
    returnTo: requiredEnv.appOrigin || window.location.origin
  }
};

export const appConfig = {
  apiBaseUrl: requiredEnv.apiBaseUrl || "http://localhost:3001",
  missingEnv: Object.entries(requiredEnv)
    .filter(([, value]) => !value)
    .map(([key]) => key)
};
