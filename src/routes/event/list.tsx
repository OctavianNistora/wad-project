import {
  Autocomplete,
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../states/auth/authState";
import { useEventState } from "../../states/events/eventsState";

export default function EventList() {
  const navigate = useNavigate();

  const { allEvents, getAllEvents } = useEventState();
  const { user } = useAuthState();

  if (!user?.accountType) return null;

  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Stack sx={{ marginLeft: 19 }}>
        <Stack direction="row" spacing={2}>
          <TextField label="Search name" fullWidth />
          <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Event Location"
                variant="outlined"
                name="eventLocation"
                required
              />
            )}
          />
          <Autocomplete
            options={[]}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Event Category"
                variant="outlined"
                name="eventCategory"
                required
              />
            )}
          />
        </Stack>
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
