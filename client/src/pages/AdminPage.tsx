import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

type AdminResponse = {
  ok: boolean;
  requiredPermission: string;
};

export function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [result, setResult] = useState<AdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminCheck() {
      const token = await getAccessTokenSilently();
      const data = await apiGet<AdminResponse>("/api/admin/check", token);
      setResult(data);
    }
    void loadAdminCheck().catch((requestError: Error) => setError(requestError.message));
  }, [getAccessTokenSilently]);

  return (
    <section className="page-section">
      <p className="eyebrow">Admin area</p>
      <h1>Admin permission check</h1>
      {result ? (
        <div className="data-panel">
          <span>Backend authorised: {String(result.ok)}</span>
          <span>Required permission: {result.requiredPermission}</span>
        </div>
      ) : (
        <div className="status-panel">{error || "Checking admin permission..."}</div>
      )}
    </section>
  );
}
