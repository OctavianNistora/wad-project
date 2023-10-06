import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { darkTheme } from "../theme";

export default function Register() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs" disableGutters>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
            Event Planner
          </Typography>
          <Box component="form" noValidate>
            <TextField
              margin="normal"
              label="First Name"
              required
              fullWidth
              autoComplete="given-name"
            />
            <TextField
              margin="normal"
              label="Last Name"
              required
              fullWidth
              autoComplete="family-name"
            />
            <TextField
              margin="normal"
              label="Email"
              required
              fullWidth
              autoComplete="email"
              type="email"
            />
            <TextField
              margin="normal"
              label="Password"
              required
              fullWidth
              autoComplete="current-password"
              type="password"
            />
            <TextField
              margin="normal"
              label="Confirm Password"
              required
              fullWidth
              autoComplete="current-password"
              type="password"
            />
            <TextField
              margin="normal"
              label="Phone Number"
              fullWidth
              autoComplete="tel"
              type="tel"
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
