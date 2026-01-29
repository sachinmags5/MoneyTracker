// Profile.jsx
import React from "react";
import { useSelector } from "react-redux";
export  function Profile() {
  
  const {user} = useSelector((state) => state.auth);
  const { name = "No name", email = "No email", mobilenumber = "No number" } = user;
  return (
    <div style={{
      maxWidth: 480,
      margin: "24px auto",
      padding: 16,
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "#1976d2",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 600
        }}>
          {name && name[0] ? name[0].toUpperCase() : "U"}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{name}</div>
          <div style={{ color: "#666", fontSize: 14 }}>{email}</div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        <label style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>Name</label>
        <input
          readOnly
          value={name}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fafafa"
          }}
        />

        <label style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>Email</label>
        <input
          readOnly
          value={email}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fafafa"
          }}
        />

        <label style={{ fontSize: 13, color: "#333", fontWeight: 600 }}>Mobile Number</label>
        <input
          readOnly
          value={mobilenumber}
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fafafa"
          }}
        />
      </div>
    </div>
  );
}
