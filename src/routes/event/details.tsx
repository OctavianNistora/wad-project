import { useNavigate, useParams } from "react-router-dom";
import { database } from "../../firebase";
import { get, ref } from "firebase/database";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PermissionWrapper from "../../components/PermissionWrapper";

type EventDetailsProps = {
  eventCategory: string;
  eventDescription: string;
  eventEndDate: string;
  eventLocation: string;
  eventOrganizer: string;
  eventStartDate: string;
};

type EventMetadataProps = {
  eventName: string;
};

export default function EventDetails() {
  // HOOKS #1
  const { eventId } = useParams();
  const navigate = useNavigate();

  // CUSTOM HOOKS #2
  // useAuthState

  // useState #3
  console.log("eventId: ", eventId);
  const [eventDetails, setEventDetails] = useState<EventDetailsProps>();
  console.log("eventDetails: ", eventDetails);
  const [eventMetadata, setEventMetadata] = useState<EventMetadataProps>({
    eventName: "",
  });
  console.log("eventMetadata: ", eventMetadata);

  // functions #4
  // whatever

  // useEffect #5

  useEffect(() => {
    get(ref(database, `event-details/${eventId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setEventDetails(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  useEffect(() => {
    get(ref(database, `event-names/${eventId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setEventMetadata(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Stack component="form" spacing={2}>
        <TextField label="Event name" defaultValue={eventMetadata.eventName} />
        <TextField
          label="Event description"
          defaultValue={eventDetails?.eventDescription}
        />
        <TextField
          label="Event start date"
          defaultValue={eventDetails?.eventStartDate}
        />
        <TextField
          label="Event end date"
          defaultValue={eventDetails?.eventEndDate}
        />
        <TextField
          label="Event location"
          defaultValue={eventDetails?.eventLocation}
        />
        <TextField
          label="Event category"
          defaultValue={eventDetails?.eventCategory}
        />
        <Box>
          <Grid container spacing={2}>
            <PermissionWrapper
              roleRequired="admin"
              ownerId={eventDetails?.eventOrganizer}
            >
              <Grid item xs={6}>
                <Button variant="contained" color="primary" fullWidth>
                  Edit
                </Button>
              </Grid>
            </PermissionWrapper>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => {
                  navigate("/");
                }}
              >
                Go Back
              </Button>
            </Grid>
            <PermissionWrapper
              roleRequired="admin"
              ownerId={eventDetails?.eventOrganizer}
            >
              <Grid item xs={6}>
                <Button variant="contained" color="error" fullWidth>
                  Delete
                </Button>
              </Grid>
            </PermissionWrapper>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
