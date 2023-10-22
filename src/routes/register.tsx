import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const phoneNumber = data.get("phoneNumber") as string;
    console.log(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      phoneNumber
    );
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        set(ref(database, `users/${user.uid}`), {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          accountType: "user",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack spacing={2}>
        <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
          Register
        </Typography>
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
            name="firstName"
          />
          <TextField
            margin="normal"
            label="Last Name"
            required
            fullWidth
            autoComplete="family-name"
            id="lastName"
            name="lastName"
          />
          <TextField
            margin="normal"
            label="Email"
            required
            fullWidth
            type="email"
            id="email"
            name="email"
          />
          <TextField
            margin="normal"
            label="Password"
            required
            fullWidth
            type="password"
            id="password"
            name="password"
          />
          <TextField
            margin="normal"
            label="Confirm Password"
            required
            fullWidth
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <TextField
            margin="normal"
            label="Phone Number"
            fullWidth
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                navigate("/");
              }}
              fullWidth
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
