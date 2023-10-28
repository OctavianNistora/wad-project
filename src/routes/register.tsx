import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { RegisterRequest, useAuthState } from "../states/auth/authState";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();

  const { user, handleRegister, isRegisterLoading, registerErrorMessage } =
    useAuthState();

  const { control, handleSubmit } = useForm<FormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    const registerRequest: RegisterRequest = {
      ...data,
    };
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

        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="First Name"
                  required
                  fullWidth
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="Last Name"
                  required
                  fullWidth
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="Email"
                  required
                  fullWidth
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="Password"
                  required
                  fullWidth
                  type="password"
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="Confirm Password"
                  required
                  fullWidth
                  type="password"
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field, fieldState: { error } }) => {
              return (
                <TextField
                  {...field}
                  inputRef={field.ref}
                  label="Phone Number"
                  fullWidth
                  error={Boolean(error)}
                  helperText={error?.message}
                  disabled={isRegisterLoading}
                />
              );
            }}
          />

          <Stack direction="row" spacing={2} width="100%">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleSubmit(onSubmit)()}
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
          {registerErrorMessage && (
            <Typography variant="h4" color="error">
              {registerErrorMessage}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
