import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../states/auth/authState";
import { useEventState } from "../../states/events/eventsState";

export default function EventList() {
  const navigate = useNavigate();

  const { allEvents, getAllEvents } = useEventState();
  console.log("allEvents: ", allEvents);
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
