import {
  Autocomplete,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import React, { useEffect } from "react";
import { addEvent } from "../../firebaseFunctions";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers-pro";
import { useCategoriesState } from "../../states/categories/categoriesState";
import { useLocationsState } from "../../states/locations/locationsState";

export default function EventAdd() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  const [eventStartDate, setEventStartDate] = React.useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = React.useState<Date | null>(null);

  const [allCategories, getAllCategories] = useCategoriesState();
  const [allLocations, getAllLocations] = useLocationsState();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const eventData = {
      eventName: data.get("eventName") as string,
      eventDescription: data.get("eventDescription") as string,
      eventStartDate: eventStartDate?.toISOString().split("T")[0] as string,
      eventEndDate: eventEndDate?.toISOString().split("T")[0] as string,
      eventLocation: data.get("eventLocation") as string,
      eventCategory: data.get("eventCategory") as string,
    };
    addEvent(eventData);
    navigate("/");
  };

  useEffect(() => {
    getAllLocations();
  }, []);
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
        Add Event
      </Typography>
      <Stack component={"form"} spacing={2} onSubmit={handleSubmit}>
        <TextField
          id="eventName"
          label="Event Name"
          variant="outlined"
          name="eventName"
          required
          autoComplete="off"
        />
        <TextField
          id="eventDescription"
          label="Event Description"
          variant="outlined"
          name="eventDescription"
          required
          autoComplete="off"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2} justifyContent="center">
            <DatePicker
              label="Event Start Date"
              format="DD/MM/YYYY"
              views={["year", "month", "day"]}
              openTo="day"
              value={eventStartDate}
              onChange={(newValue) => {
                setEventStartDate(newValue);
              }}
            />
            <DatePicker
              label="Event End Date"
              format="DD/MM/YYYY"
              views={["year", "month", "day"]}
              openTo="day"
              value={eventEndDate}
              onChange={(newValue) => {
                setEventEndDate(newValue);
              }}
            />
          </Stack>
        </LocalizationProvider>
        <Autocomplete
          freeSolo
          options={allLocations}
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
          freeSolo
          options={allCategories}
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
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            Create Event
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/event/list");
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
