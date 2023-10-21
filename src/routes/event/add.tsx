// WIP
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import AutoComplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { useEffect } from "react";

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
  const [location, setLocation] = React.useState<string | null>(null);
  return (
    <Container component="main" maxWidth="xs" disableGutters>
      <Typography variant="h2" align="center" gutterBottom color={"cyan"}>
        Add Event
      </Typography>
      <Stack component={"form"}>
        <TextField
          id="eventName"
          label="Event Name"
          variant="outlined"
          name="eventName"
        />
        <TextField
          id="eventDescription"
          label="Event Description"
          variant="outlined"
          name="eventDescription"
        />
        <TextField
          id="eventStartDate"
          label="Event Date"
          variant="outlined"
          name="eventStartDate"
        />
        <TextField
          id="eventEndDate"
          label="Event End Date"
          variant="outlined"
          name="eventEndDate"
        />
        <AutoComplete
          value={location}
          onChange={(event, newValue) => {
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
            />
          )}
        />
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary">
          Create Event
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Container>
  );
}
