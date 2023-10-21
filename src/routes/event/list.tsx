import {
  Box,
  Button,
  Container,
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

const Tabs = [
  { text: "Subscribed events", link: "/subscribed" },
  { text: "View events list", link: "/event/list" },
];

export default function EventList() {
  //const { counter, fetchCounter } = useCounterState();
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(database, "users/" + auth.currentUser?.uid + "/firstName"))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setFirstName(snapshot.val());
              console.log(firstName);
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("No user signed in");
        navigate("/");
      }
    });
  }, []);
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
        <Button variant="contained" onClick={() => navigate("/event/add")}>
          Add Event
        </Button>
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
        <List>
          {Tabs.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.link)}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Container>
  );
}

/*
<Stack spacing={2}>
        <Stack alignItems="center" spacing={2}>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome {firstName}!
          </Typography>
        </Stack>
      </Stack>
      <Typography>Counter: {counter}</Typography>
      <Button onClick={fetchCounter}>Quetz</Button>
      */
