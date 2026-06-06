import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";

type AdminEvent = {
  id: string;
  event_name: string;
  club: string;
  organiser: string;
  contact: string;
  captured_fields: number;
  total_fields: number;
  event_date: string;
  created_at: string;
  key_event: boolean;
  event_request: unknown;
  monday_mock?: unknown;
};

type AdminEventsResponse = {
  events: AdminEvent[];
};

export function AdminPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [activePayload, setActivePayload] = useState<unknown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyEventId, setBusyEventId] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      const token = await getAccessTokenSilently();
      const data = await apiGet<AdminEventsResponse>("/api/event-readiness/admin/events", token);
      setEvents(data.events);
    }
    void loadEvents().catch((requestError: Error) => setError(requestError.message));
  }, [getAccessTokenSilently]);

  async function createMondayPayload(eventId: string) {
    setBusyEventId(eventId);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const result = await apiPost<{ monday_mock: unknown }>("/api/event-readiness/admin/events/" + encodeURIComponent(eventId) + "/monday", {}, token);
      setActivePayload(result.monday_mock);
      const data = await apiGet<AdminEventsResponse>("/api/event-readiness/admin/events", token);
      setEvents(data.events);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : String(requestError));
    } finally {
      setBusyEventId(null);
    }
  }

  return (
    <section className="page-section">
      <p className="eyebrow">Admin area</p>
      <h1>Event Readiness events</h1>
      <p className="lead">Events are saved as soon as a user creates a new event session, whether or not the request is complete.</p>
      {error ? <div className="status-panel">{error}</div> : null}
      <div className="admin-table-wrap">
        <table className="admin-events-table">
          <thead>
            <tr>
              <th>EventName</th>
              <th>Club</th>
              <th>Organiser</th>
              <th>Contact</th>
              <th>Fields</th>
              <th>Event date</th>
              <th>Created</th>
              <th>KeyEvent</th>
              <th>Monday</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td><strong>{event.event_name}</strong></td>
                <td>{event.club}</td>
                <td>{event.organiser}</td>
                <td>{event.contact}</td>
                <td>{event.captured_fields}/{event.total_fields}</td>
                <td>{event.event_date}</td>
                <td>{new Date(event.created_at).toLocaleString()}</td>
                <td>{event.key_event ? "Yes" : "No"}</td>
                <td>
                  <button type="button" onClick={() => void createMondayPayload(event.id)} disabled={busyEventId === event.id}>
                    {busyEventId === event.id ? "Creating..." : event.monday_mock ? "View / refresh" : "Create payload"}
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 ? (
              <tr><td colSpan={9}>No events have been created yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
      {activePayload ? (
        <div className="data-panel admin-payload-panel">
          <h2>Monday.com mock payload</h2>
          <pre>{JSON.stringify(activePayload, null, 2)}</pre>
        </div>
      ) : null}
    </section>
  );
}
