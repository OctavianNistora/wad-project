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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../states/auth/authState";
import { useEventState } from "../../states/events/eventsState";
import { useCategoriesState } from "../../states/categories/categoriesState";
import { useLocationsState } from "../../states/locations/locationsState";
import { database } from "../../firebase";
import { get, ref } from "firebase/database";
import PermissionWrapper from "../../components/PermissionWrapper";

export default function EventList() {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLocationEvents, setSelectedLocationEvents] = useState<
    string[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryEvents, setSelectedCategoryEvents] = useState<
    string[]
  >([]);

  const { user } = useAuthState();
  const { allEvents, getAllEvents } = useEventState();
  const { allLocations, getAllLocations } = useLocationsState();
  const { allCategories, getAllCategories } = useCategoriesState();

  useEffect(() => {
    getAllEvents();
    getAllLocations();
    getAllCategories();
  }, []);
  useEffect(() => {
    console.log(selectedLocation);
    if (selectedLocation) {
      get(ref(database, "location-events/" + selectedLocation)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            const locationEventsResponse = snapshot.val();
            const newLocationEvents: string[] = [];
            Object.keys(locationEventsResponse).forEach((key) => {
              if (locationEventsResponse[key]) {
                newLocationEvents.push(key);
              }
            });
            console.log(newLocationEvents);
            setSelectedLocationEvents(newLocationEvents);
          }
        }
      );
    }
  }, [selectedLocation]);
  useEffect(() => {
    console.log(selectedCategory);
    if (selectedCategory) {
      get(ref(database, "category-events/" + selectedCategory)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            const categoryEventsResponse = snapshot.val();
            const newCategoryEvents: string[] = [];
            Object.keys(categoryEventsResponse).forEach((key) => {
              if (categoryEventsResponse[key]) {
                newCategoryEvents.push(key);
              }
            });
            console.log(newCategoryEvents);
            setSelectedCategoryEvents(newCategoryEvents);
          }
        }
      );
    }
  }, [selectedCategory]);

  if (!user?.accountType) return null;

  return (
    <Container component="main" maxWidth={false} disableGutters>
      <Stack sx={{ marginLeft: 19 }}>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Search name"
            fullWidth
            onBlur={(event) => setSearchName(event.target.value)}
          />
          <Autocomplete
            options={allLocations}
            fullWidth
            onChange={(event, value) =>
              (value && setSelectedLocation(value)) ||
              (!value && setSelectedLocation(""))
            }
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
            options={allCategories}
            fullWidth
            onChange={(event, value) =>
              (value && setSelectedCategory(value)) ||
              (!value && setSelectedCategory(""))
            }
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
            {allEvents
              .filter((event) => {
                if (
                  event.eventName.includes(searchName) &&
                  (!selectedLocation ||
                    selectedLocationEvents.includes(event.eventId)) &&
                  (!selectedCategory ||
                    selectedCategoryEvents.includes(event.eventId))
                ) {
                  return true;
                }
                return false;
              })
              .map((event) => (
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
        <PermissionWrapper roleRequired="organizer">
          <Button variant="contained" onClick={() => navigate("/event/add")}>
            Add Event
          </Button>
        </PermissionWrapper>
      </Stack>
    </Container>
  );
}
