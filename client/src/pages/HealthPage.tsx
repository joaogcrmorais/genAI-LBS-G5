import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

type HealthResponse = {
  status: string;
  service: string;
  timestamp: string;
};

export function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void apiGet<HealthResponse>("/api/health")
      .then(setHealth)
      .catch((requestError: Error) => setError(requestError.message));
  }, []);

  return (
    <section className="page-section">
      <p className="eyebrow">System status</p>
      <h1>Backend health</h1>
      {health ? (
        <div className="data-panel">
          <span>Status: {health.status}</span>
          <span>Service: {health.service}</span>
          <span>Checked: {new Date(health.timestamp).toLocaleString()}</span>
        </div>
      ) : (
        <div className="status-panel">{error || "Checking backend..."}</div>
      )}
    </section>
  );
}
