import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RegisterRequest, useAuthState } from "../states/auth/authState";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();

  const { user, handleRegister, isRegisterLoading, registerErrorMessage } =
    useAuthState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registerRequest: RegisterRequest = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      firstName: event.currentTarget.firstName.value,
      lastName: event.currentTarget.lastName.value,
      phoneNumber: event.currentTarget.phoneNumber.value,
    };
    // TODO: use hook forms for this.
    if (
      registerRequest.password !== event.currentTarget.confirmPassword.value
    ) {
      alert("Passwords do not match");
      return;
    }
    handleRegister(registerRequest);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack spacing={2}>
        <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
          Register
        </Typography>
        {registerErrorMessage && (
          <Typography variant="h4" color="error">
            {registerErrorMessage}
          </Typography>
        )}
        <Stack
          component="form"
          onSubmit={handleSubmit}
          alignItems="center"
          spacing={2}
        >
          <TextField
            margin="normal"
            label="First Name"
            required
            fullWidth
            autoComplete="given-name"
            id="firstName"
            disabled={isRegisterLoading}
            name="firstName"
          />
          <TextField
            margin="normal"
            label="Last Name"
            required
            fullWidth
            autoComplete="family-name"
            id="lastName"
            disabled={isRegisterLoading}
            name="lastName"
          />
          <TextField
            margin="normal"
            label="Email"
            required
            fullWidth
            type="email"
            id="email"
            disabled={isRegisterLoading}
            name="email"
          />
          <TextField
            margin="normal"
            label="Password"
            required
            fullWidth
            type="password"
            id="password"
            disabled={isRegisterLoading}
            name="password"
          />
          <TextField
            margin="normal"
            label="Confirm Password"
            required
            fullWidth
            type="password"
            id="confirmPassword"
            disabled={isRegisterLoading}
            name="confirmPassword"
          />
          <TextField
            margin="normal"
            label="Phone Number"
            fullWidth
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            disabled={isRegisterLoading}
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              disabled={isRegisterLoading}
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                navigate("/login");
              }}
              fullWidth
              disabled={isRegisterLoading}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
