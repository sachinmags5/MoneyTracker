import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authApi";
import { resetAuthState } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form)).then((res)=>{
        console.log(res,'ress');
        if (res?.payload?.token) { navigate("/dashboard");
          toast.dark(res?.payload?.message,{
            position: 'bottom-right',
          });
        } // or whatever route you want
    }).catch(error=> {console.log(error)
          toast.dark(error,{
            position: 'bottom-right',
          });
        }
  );
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
      dispatch(resetAuthState());
      // navigation can be added here
    }
  }, [isAuthenticated, dispatch,navigate]);

  // useEffect(() => { if (isAuthenticated) { navigate("/dashboard"); } }, [isAuthenticated, navigate]);

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
        Login
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
}
