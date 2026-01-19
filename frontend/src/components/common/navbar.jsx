import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Sign Up</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}
