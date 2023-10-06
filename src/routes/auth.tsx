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

export default function Auth() {
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
          <Box
            sx={{
              mt: 10,
            }}
          >
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
            <Button variant="contained" color="primary" type="submit">
              Log In
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
