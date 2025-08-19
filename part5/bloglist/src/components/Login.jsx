import React, { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth, useField } from "../hooks";

const Login = () => {
  const username = useField("text");
  const password = useField("password");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      username: username.inputProps.value,
      password: password.inputProps.value,
    });
    username.reset();
    password.reset();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, maxWidth: 420, mx: "auto", mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>

      <Box
        component="form"
        data-testid="login-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Stack spacing={2}>
          <TextField
            label="Username"
            fullWidth
            inputProps={{ "data-testid": "username" }}
            {...username.inputProps}
          />

          <TextField
            label="Password"
            fullWidth
            // spread hook props first so our controlled type wins
            {...password.inputProps}
            type={showPassword ? "text" : "password"}
            inputProps={{ "data-testid": "password" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" data-testid="login-button">
            Login
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Login;
