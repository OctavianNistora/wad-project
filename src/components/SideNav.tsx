import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAuthState } from "../states/auth/authState";
import { useNavigate } from "react-router";

const Navs = [
  {
    text: "Subscribed events",
    link: "/subscribed",
    access: ["user", "organizer", "admin"],
  },
  {
    text: "View events list",
    link: "/",
    access: ["user", "organizer", "admin"],
  },
  { text: "View accounts list", link: "/accounts", access: ["admin"] },
];
export const DRAWER_WIDTH = 250;

export default function SideNav() {
  const navigate = useNavigate();

  const { user } = useAuthState();

  if (!user?.accountType) return null;

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>
        {Navs.map(
          (item) =>
            item.access.includes(user.accountType) && (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => navigate(item.link)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
    </Drawer>
  );
}
