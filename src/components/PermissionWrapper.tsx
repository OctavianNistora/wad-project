import { PropsWithChildren } from "react";
import { useAuthState } from "../states/auth/authState";

type PropsType = {
  roleRequired: "user" | "organizer" | "admin";
  ownerId?: string;
};

export default function PermissionWrapper(props: PropsWithChildren<PropsType>) {
  const { children, roleRequired, ownerId } = props;
  const { user } = useAuthState();
  if (!user?.accountType) {
    return null;
  }
  if (roleRequired === "organizer" && user.accountType === "user") {
    return null;
  }
  if (
    roleRequired === "admin" &&
    user.accountType !== "admin" &&
    user.uid !== ownerId
  ) {
    return null;
  }
  return <>{children}</>;
}
