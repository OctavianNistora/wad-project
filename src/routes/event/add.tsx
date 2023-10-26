import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase";
import AutoComplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { useEffect } from "react";
import { push, ref, set, update } from "firebase/database";
import { addEvent } from "../../firebaseFunctions";

const filter = createFilterOptions<string>();

export default function EventAdd() {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);
  const [location, setLocation] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const eventData = {
      eventName: data.get("eventName") as string,
      eventDescription: data.get("eventDescription") as string,
      eventStartDate: data.get("eventStartDate") as string,
      eventEndDate: data.get("eventEndDate") as string,
      eventLocation: location,
      eventCategory: category,
    };
    addEvent(eventData);
    navigate("/event/list");
  };

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
        <TextField
          id="eventStartDate"
          label="Event Date"
          variant="outlined"
          name="eventStartDate"
          required
          autoComplete="off"
        />
        <TextField
          id="eventEndDate"
          label="Event End Date"
          variant="outlined"
          name="eventEndDate"
          required
          autoComplete="off"
        />
        <AutoComplete
          value={location}
          onChange={(_event, newValue) => {
            if (typeof newValue === "string") {
              setLocation(newValue);
            } //else if (newValue && newValue.inputValue) {
            //  setLocation(newValue.inputValue);
            //} else {
            //  setLocation(newValue);
            //}
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
          options={[]}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option}</li>}
          freeSolo
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
          value={category}
          onChange={(_event, newValue) => {
            if (typeof newValue === "string") {
              setCategory(newValue);
            } //else if (newValue && newValue.inputValue) {
            //  setCategory(newValue.inputValue);
            //} else {
            //  setCategory(newValue);
            //}
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option);
            if (inputValue !== "" && !isExisting) {
              filtered.push(inputValue);
            }

            return filtered;
          }}
          options={[]}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option}</li>}
          freeSolo
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
