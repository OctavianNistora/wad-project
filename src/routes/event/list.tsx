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

export default function EventList() {
  const navigate = useNavigate();

  const { allEvents, getAllEvents } = useEventState();
  console.log('allEvents: ', allEvents);
  const { user } = useAuthState();

  useEffect(() => {
    getAllEvents();
  }, []);

  if (!user?.accountType) return null;

  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Stack sx={{ marginLeft: 19 }}>
        <Stack>
          <List>
            {allEvents.map((event) => (
              <ListItem key={event.eventId} disablePadding>
                <ListItemButton
                  onClick={() => navigate("/event/" + event.eventId)}
                >
                  <ListItemText primary={event.eventName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        {(user.accountType === "admin" || user.accountType === "organizer") && (
          <Button variant="contained" onClick={() => navigate("/event/add")}>
            Add Event
          </Button>
        )}
      </Stack>
    </Container>
  );
}
