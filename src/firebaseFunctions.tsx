import { push, ref, set, update } from "firebase/database";
import { auth, database } from "./firebase";

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
  const categoryData = {
    [newEventKey]: true,
  };
  const locationData = {
    [newEventKey]: true,
  };
  set(ref(database, `event-details/${newEventKey}`), eventDetailsData);
  set(ref(database, `event-info/${newEventKey}`), eventInfoData);
  update(ref(database, `locations/${eventData.eventLocation}`), locationData);
  update(ref(database, `categories/${eventData.eventCategory}`), categoryData);
}
