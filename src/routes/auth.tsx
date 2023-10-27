import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(
      auth,
      data.get("email") as string,
      data.get("password") as string
    )
      .then((userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/event/list");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
          Authenticate
        </Typography>
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
            <Button variant="contained" color="primary" type="submit">
              Log In
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
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
  );
}
