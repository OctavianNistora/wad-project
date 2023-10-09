import { Button, Container, Stack, TextField, Typography } from "@mui/material";

export default function Auth() {
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
          Event Planner
        </Typography>
        <Stack alignItems="center" spacing={2}>
          <TextField
            label="Email"
            required
            fullWidth
            autoComplete="email"
            type="email"
          />
          <TextField
            label="Password"
            required
            fullWidth
            autoComplete="current-password"
            type="password"
          />
          <Button variant="contained" color="primary" type="submit">
            Log In
          </Button>
          <Button variant="contained" color="secondary" type="button">
            Sign Up
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
