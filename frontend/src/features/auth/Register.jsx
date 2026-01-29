import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./authApi";
import { resetAuthState } from "./authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobilenumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form)).catch(error=> console.log(error));
   ;
  };

  useEffect(() => {
    if (success) {
      setForm({
        name: "",
        email: "",
        password: "",
        mobilenumber: "",
      });
      navigate("/login");
      dispatch(resetAuthState());
    }
  }, [success, dispatch,navigate]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" mb={2}>
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Registration successful</Alert>}

      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        margin="normal"
        label="Mobile Number"
        name="mobilenumber"
        type="number"
        value={form.mobilenumber}
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </Button>
    </Box>
  );
}
