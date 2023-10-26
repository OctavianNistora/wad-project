import { useCallback, useContext, useMemo } from "react";
import { database } from "../../firebase";
import { ref, get } from "@firebase/database";
import { EventInfo, EventsContext } from "./events.context";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
};

export const useEventState = () => {
  const { userEvents, setUserEvents, userEventsLoading, setUserEventsLoading } =
    useContext(EventsContext);

  const getUserEvents = useCallback(async () => {
    setUserEventsLoading(true);
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
          setUserEvents(newEventsList)
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setUserEventsLoading(false);
    }
  }, []);

  const data = useMemo(() => {
    return {
      userEvents,
      userEventsLoading,
      getUserEvents,
    };
  }, [userEvents, userEventsLoading, getUserEvents]);

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
