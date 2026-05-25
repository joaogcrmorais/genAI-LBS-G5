import { Auth0Provider } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "./authConfig";

export function AuthProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  if (!authConfig.domain || !authConfig.clientId || !authConfig.authorizationParams.audience) {
    return (
      <main className="configuration-message">
        <h1>Authentication configuration is incomplete</h1>
        <p>Add the required Vite Auth0 variable names to the root .env file.</p>
      </main>
    );
  }

  return (
    <Auth0Provider
      domain={authConfig.domain}
      clientId={authConfig.clientId}
      authorizationParams={authConfig.authorizationParams}
      cacheLocation="memory"
      onRedirectCallback={(appState) => navigate(appState?.returnTo || window.location.pathname)}
    >
      {children}
    </Auth0Provider>
  );
}
