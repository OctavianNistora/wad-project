import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "./auth.context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { ref, set } from "@firebase/database";

const mapFirebaseErrorToMessage= (errorMessage: string) => {
  if(errorMessage.includes("auth/email-already-in-use")){
    return "Email is already in use"
  }
  return ""
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

export const useAuthState = () => {
  const {
    user,
    isLoginLoading,
    setIsLoginLoading,
    loginErrorMessage,
    setLoginErrorMessage,
    isRegisterLoading,
    setIsRegisterLoading,
    registerErrorMessage,
    setRegisterErrorMessage,
  } = useContext(AuthContext);

  const handleLogin = useCallback(async (request: LoginRequest) => {
    setIsLoginLoading(true);
    setLoginErrorMessage("");
    const { email, password } = request;
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e) {
      console.error("login e: ", e);
      setLoginErrorMessage("Wrong credentials");
    } finally {
      setIsLoginLoading(false);
    }
  }, []);

  const handleRegister = useCallback(async (request: RegisterRequest) => {
    setIsRegisterLoading(true);
    setRegisterErrorMessage("");
    const { email, password, firstName, lastName, phoneNumber } = request;
    try {
      const createUserResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (createUserResponse) {
        set(ref(database, `users/${createUserResponse.user.uid}`), {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          accountType: "user",
        });
      }
    } catch (error: any) {
      const authErrorMessage = error.message
      console.error("register error: ", error);
      setRegisterErrorMessage(mapFirebaseErrorToMessage(authErrorMessage));
    } finally {
      setIsRegisterLoading(false);
    }
  }, []);

  const data = useMemo(() => {
    return {
      user,
      isLoginLoading,
      loginErrorMessage,
      isRegisterLoading,
      registerErrorMessage,
      handleLogin,
      handleRegister,
    };
  }, [
    user,
    isLoginLoading,
    loginErrorMessage,
    isRegisterLoading,
    registerErrorMessage,
    handleLogin,
    handleRegister,
  ]);

  return data;
};
