import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "../states/auth/authState";

export default function AuthWrapper(
  props: PropsWithChildren<Record<never, any>>
) {
  const { children } = props;

  const navigate = useNavigate();
  const { user } = useAuthState();

  useEffect(()=>{
    if(!user) navigate("/login");
  },[user])

  if (!user) return null

  return children;
}
