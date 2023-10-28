import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase";
import AutoComplete from "@mui/material/Autocomplete";
import React, { useEffect } from "react";
import { addEvent } from "../../firebaseFunctions";
import { get, ref } from "firebase/database";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers-pro";

export default function EventAdd() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  const [locationOptions, setLocationOptions] = React.useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = React.useState<string[]>([]);
  const [eventStartDate, setEventStartDate] = React.useState<Date | null>(null);
  const [eventEndDate, setEventEndDate] = React.useState<Date | null>(null);

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
    get(ref(database, "location-names")).then((snapshot) => {
      if (snapshot.exists()) {
        const locationsResponseData = snapshot.val();
        const newLocationOptions: string[] = [];
        Object.keys(locationsResponseData).forEach((key) => {
          newLocationOptions.push(key);
        });
        setLocationOptions(newLocationOptions);
      } else {
        setLocationOptions([]);
      }
    });
  }, []);
  useEffect(() => {
    get(ref(database, "category-names")).then((snapshot) => {
      if (snapshot.exists()) {
        const categoriesResponseData = snapshot.val();
        const newCategoryOptions: string[] = [];
        Object.keys(categoriesResponseData).forEach((key) => {
          newCategoryOptions.push(key);
        });
        setCategoryOptions(newCategoryOptions);
      } else {
        setCategoryOptions([]);
      }
    });
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
        <AutoComplete
          freeSolo
          options={locationOptions}
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
        <AutoComplete
          freeSolo
          options={categoryOptions}
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
