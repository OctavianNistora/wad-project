import { useCallback, useContext, useMemo } from "react";
import { AuthContext, UserAccountTypeEnum } from "./auth.context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, database } from "../../firebase";
import { ref, get, set } from "@firebase/database";

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
    setUser,
    isLoginLoading,
    setIsLoginLoading,
    loginErrorMessage,
    setLoginErrorMessage,
    isRegisterLoading,
    setIsRegisterLoading,
    registerErrorMessage,
    setRegisterErrorMessage,
  } = useContext(AuthContext);

  const handleGetUserAccountType = useCallback(async (userId: string) => {
    const userAccountTypeResponse = await get(
      ref(database, "users/" + userId + "/accountType")
    );
    return userAccountTypeResponse.val();
  }, []);

  const handleLogin = useCallback(async (request: LoginRequest) => {
    setIsLoginLoading(true);
    setLoginErrorMessage("");
    const { email, password } = request;
    try {
      const loginResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userAccountTypeResponse = await handleGetUserAccountType(
        loginResponse.user.uid
      );
      setUser({
        ...loginResponse.user,
        accountType: userAccountTypeResponse.val() as UserAccountTypeEnum,
      });
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
      const userAccountTypeResponse = await handleGetUserAccountType(
        createUserResponse.user.uid
      );
      setUser({
        ...userAccountTypeResponse.user,
        accountType: userAccountTypeResponse.val() as UserAccountTypeEnum,
      });
      if (createUserResponse) {
        set(ref(database, `users/${createUserResponse.user.uid}`), {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          accountType: "user",
        });
      }
    } catch (e) {
      console.error("register e: ", e);
      setRegisterErrorMessage("Something went wrong! ");
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
