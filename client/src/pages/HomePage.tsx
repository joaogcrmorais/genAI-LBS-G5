import { Link } from "react-router-dom";
import { appConfig } from "../auth/authConfig";

export function HomePage() {
  return (
    <section className="page-section">
      <p className="eyebrow">London Business School</p>
      <h1>Generative AI elective prototype</h1>
      <p className="lead">
        A secure full-stack starting point for the group project, ready for Auth0-protected workflows,
        PostgreSQL-backed data, and backend-only AI features.
      </p>
      {appConfig.missingEnv.length > 0 && (
        <div className="notice">
          Missing browser-safe environment variable names: {appConfig.missingEnv.join(", ")}.
        </div>
      )}
      <div className="button-row">
        <Link className="primary-link" to="/dashboard">
          Open dashboard
        </Link>
        <Link className="secondary-link" to="/health">
          Check system health
        </Link>
      </div>
    </section>
  );
}
