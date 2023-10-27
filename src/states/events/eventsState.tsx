import { useCallback, useContext, useMemo } from "react";
import { database } from "../../firebase";
import { ref, get } from "@firebase/database";
import { EventInfo, EventsContext } from "./events.context";

export const useEventState = () => {
  const { allEvents, setAllEvents, allEventsLoading, setAllEventsLoading } =
    useContext(EventsContext);

  const getAllEvents = useCallback(async () => {
    setAllEventsLoading(true);
    try {
      get(ref(database, "event-info")).then((snapshot) => {
        if (snapshot.exists()) {
          const eventsInfoResponseData = snapshot.val();
          const newEventsList: EventInfo[] = [];
          Object.keys(eventsInfoResponseData).forEach((key) => {
            newEventsList.push({
              eventId: key,
              ...eventsInfoResponseData[key],
            });
          });
          newEventsList.sort(compare);
          setAllEvents(newEventsList);
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setAllEventsLoading(false);
    }
  }, []);

  const data = useMemo(() => {
    return {
      allEvents,
      allEventsLoading,
      getAllEvents,
    };
  }, [allEvents, allEventsLoading, getAllEvents]);

  return data;
};

function compare(a: EventInfo, b: EventInfo) {
  if (a.eventStartDate < b.eventStartDate) {
    return -1;
  }
  if (a.eventStartDate > b.eventStartDate) {
    return 1;
  }
  return 0;
}
