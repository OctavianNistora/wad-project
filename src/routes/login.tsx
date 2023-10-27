import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginRequest, useAuthState } from "../states/auth/authState";
import { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const navigate = useNavigate();

  const { user, handleLogin, isLoginLoading, loginErrorMessage } =
    useAuthState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginRequest: LoginRequest = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    handleLogin(loginRequest);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <PageWrapper>
      <Container component="main" maxWidth="xs" disableGutters>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
            Authenticate
          </Typography>
          {loginErrorMessage && (
            <Typography variant="h4" color="error">
              {loginErrorMessage}
            </Typography>
          )}
          <Stack
            component="form"
            onSubmit={handleSubmit}
            alignItems="center"
            spacing={2}
          >
            <TextField
              label="Email Address"
              required
              fullWidth
              autoComplete="email"
              type="email"
              autoFocus
              id="email"
              name="email"
            />
            <TextField
              label="Password"
              required
              fullWidth
              autoComplete="current-password"
              type="password"
              id="password"
              name="password"
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={isLoginLoading}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                disabled={isLoginLoading}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </PageWrapper>
  );
}
