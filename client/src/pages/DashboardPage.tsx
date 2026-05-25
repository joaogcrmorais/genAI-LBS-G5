import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

type MeResponse = {
  subject: string;
  permissions: string[];
};

export function DashboardPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [profile, setProfile] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const token = await getAccessTokenSilently();
      const data = await apiGet<MeResponse>("/api/me", token);
      setProfile(data);
    }
    void loadProfile().catch((requestError: Error) => setError(requestError.message));
  }, [getAccessTokenSilently]);

  return (
    <section className="page-section">
      <p className="eyebrow">Authenticated area</p>
      <h1>Course project dashboard</h1>
      <p className="lead">This route requires Auth0 login and a normal or admin permission.</p>
      {profile ? (
        <div className="data-panel">
          <span>Auth0 subject: {profile.subject}</span>
          <span>Permissions: {profile.permissions.join(", ") || "none in token"}</span>
        </div>
      ) : (
        <div className="status-panel">{error || "Loading your verified token claims..."}</div>
      )}
    </section>
  );
}
