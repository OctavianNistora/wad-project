import { push, ref, update } from "firebase/database";
import { auth, database } from "./firebase";

type EventInfoDataType = {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
};

type EventDetailsDataType = {
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLocation: string;
  eventCategory: string;
};

type EventData = {
  eventName: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  eventLocation: string;
  eventCategory: string;
};

export function addEvent(eventData: EventData) {
  const newEventKey = push(ref(database, "events")).key;
  if (newEventKey === null) {
    return;
  }
  const eventInfoData = {
    eventName: eventData.eventName,
    eventStartDate: eventData.eventStartDate,
    eventEndDate: eventData.eventEndDate,
  };
  const eventDetailsData = {
    eventName: eventData.eventName,
    eventDescription: eventData.eventDescription,
    eventOrganizer: auth.currentUser?.uid,
    eventStartDate: eventData.eventStartDate,
    eventEndDate: eventData.eventEndDate,
    eventLocation: eventData.eventLocation,
    eventCategory: eventData.eventCategory,
  };
  const locationData = {
    [eventData.eventLocation]: true,
  };
  const locationEventData = {
    [newEventKey]: true,
  };
  const categoryData = {
    [eventData.eventCategory]: true,
  };
  const categoryEventData = {
    [newEventKey]: true,
  };

  const setEventData: Record<string, EventInfoDataType | EventDetailsDataType> =
    {};
  setEventData[`event-info/${newEventKey}`] = eventInfoData;
  setEventData[`event-details/${newEventKey}`] = eventDetailsData;
  update(ref(database), setEventData);
  update(ref(database, `location-names`), locationData);
  update(
    ref(database, `location-events/${eventData.eventLocation}`),
    locationEventData
  );
  update(ref(database, `category-names`), categoryData);
  update(
    ref(database, `category-events/${eventData.eventCategory}`),
    categoryEventData
  );
}
