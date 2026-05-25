import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import lbsLogo from "../assets/lbs-logo.jpg";
import type { PropsWithChildren } from "react";

export function AppShell({ children }: PropsWithChildren) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className="app-frame">
      <header className="topbar">
        <NavLink to="/" className="brand-link" aria-label="London Business School GenAI home">
          <img src={lbsLogo} alt="London Business School" />
          <span>GenAI Course Prototype</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary navigation">
          <NavLink to="/health">Health</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
        <div className="auth-actions">
          {isAuthenticated ? (
            <>
              <span className="user-label">{user?.name || user?.email || "Signed in"}</span>
              <button type="button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Logout
              </button>
            </>
          ) : (
            <button type="button" onClick={() => loginWithRedirect()}>
              Login
            </button>
          )}
        </div>
      </header>
      <main className="page-content">{children}</main>
    </div>
  );
}
