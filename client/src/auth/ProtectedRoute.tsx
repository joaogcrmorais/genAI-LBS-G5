import { useAuth0 } from "@auth0/auth0-react";
import type { PropsWithChildren } from "react";
import { useEffect, useMemo, useState } from "react";

type ProtectedRouteProps = PropsWithChildren<{
  allowedPermissions: string[];
}>;

function decodePermissions(token: string): string[] {
  const [, payload] = token.split(".");
  if (!payload) return [];
  const json = JSON.parse(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  return Array.isArray(json.permissions) ? json.permissions : [];
}

export function ProtectedRoute({ allowedPermissions, children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState<string[] | null>(null);
  const required = useMemo(() => new Set(allowedPermissions), [allowedPermissions]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect({ appState: { returnTo: window.location.pathname } });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    let isMounted = true;
    async function loadPermissions() {
      if (!isAuthenticated) return;
      const token = await getAccessTokenSilently();
      if (isMounted) setPermissions(decodePermissions(token));
    }
    void loadPermissions().catch(() => {
      if (isMounted) setPermissions([]);
    });
    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading || !isAuthenticated || permissions === null) {
    return <div className="status-panel">Checking access...</div>;
  }

  const canAccess = permissions.some((permission) => required.has(permission));
  if (!canAccess) {
    return <div className="status-panel">You are signed in, but this page needs additional Auth0 permission.</div>;
  }

  return <>{children}</>;
}
