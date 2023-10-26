import { User as FirebaseUser} from "@firebase/auth";
import { createContext, useState, PropsWithChildren, useMemo } from "react";

export enum UserAccountTypeEnum {
  Admin ="admin",
  Organizer = 'organizer',
  User = 'user'
}

export type User = FirebaseUser & {
  accountType: UserAccountTypeEnum
}

type AuthState = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoginLoading: boolean;
  setIsLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loginErrorMessage: string;
  setLoginErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isRegisterLoading: boolean;
  setIsRegisterLoading: React.Dispatch<React.SetStateAction<boolean>>;
  registerErrorMessage: string;
  setRegisterErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthState>({
  user: null,
  setUser: () => null,
  isLoginLoading: false,
  setIsLoginLoading: () => null,
  loginErrorMessage: "",
  setLoginErrorMessage: () => null,
  isRegisterLoading: false,
  setIsRegisterLoading: () => null,
  registerErrorMessage: "",
  setRegisterErrorMessage: () => null,
});

export const AuthContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const authValue = useMemo(() => {
    return {
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
    };
  }, [
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
  ]);
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
