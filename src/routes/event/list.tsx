import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { auth, database } from "../../firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
//import { useCounterState } from "../../states/useCounterState";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { useAuthState } from "../../states/auth/authState";
import { useEventState } from "../../states/events/eventsState";

const Tabs = [
  {
    text: "Subscribed events",
    link: "/subscribed",
    access: ["user", "organizer", "admin"],
  },
  {
    text: "View events list",
    link: "/event/list",
    access: ["user", "organizer", "admin"],
  },
  { text: "View accounts list", link: "/accounts/list", access: ["admin"] },
];

export default function EventList() {
  const navigate = useNavigate();

  const { userEvents, getUserEvents } = useEventState();

  // const [events, setEvents] = useState<Record<string, EventInfo>>({});
  // let eventList: EventListProps[] = [];

  useEffect(() => {
    getUserEvents();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Stack sx={{ marginLeft: 19 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box />
          <Typography
            noWrap
            variant="h2"
            align="center"
            gutterBottom
            color={"cyan"}
          >
            Events List
          </Typography>
          <Box>
            <Button onClick={handleClick} size="large">
              Account
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <Stack>
                <MenuItem onClick={() => navigate("/profile")}>
                  Edit Profile
                </MenuItem>
                <MenuItem onClick={() => auth.signOut()}>Logout</MenuItem>
              </Stack>
            </Menu>
          </Box>
        </Stack>
        <Divider />
        <Stack>
          <List>
            {/* {Object.keys(events).map((key) => (
              <ListItem key={key} disablePadding>
                <ListItemButton onClick={() => navigate("/event/" + key)}>
                  <ListItemText primary={events[key].eventName} />
                </ListItemButton>
              </ListItem>
            ))} */}
          </List>
        </Stack>
        {/* {(accountType === "admin" || accountType === "organizer") && (
          <Button variant="contained" onClick={() => navigate("/event/add")}>
            Add Event
          </Button>
        )} */}
      </Stack>
      <Drawer
        sx={{
          width: 150,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 150,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <List>
          {Tabs.map(
            (item) =>
              item.access.includes(accountType) && (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => navigate(item.link)}>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List> */}
      </Drawer>
    </Container>
  );
}
