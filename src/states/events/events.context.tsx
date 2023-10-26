import { createContext, useState, PropsWithChildren, useMemo } from "react";

export type EventInfo = {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventId: string;
};

type EventsState = {
  userEvents: EventInfo[];
  setUserEvents: React.Dispatch<React.SetStateAction<EventInfo[]>>;
  userEventsLoading: boolean;
  setUserEventsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EventsContext = createContext<EventsState>({
  userEvents: [],
  setUserEvents: () => null,
  userEventsLoading: false,
  setUserEventsLoading: () => null,
});

export const EventsContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [userEvents, setUserEvents] = useState<EventInfo[]>([]);
  const [userEventsLoading, setUserEventsLoading] = useState(false);

  const authValue = useMemo(() => {
    return {
      userEvents,
      setUserEvents,
      userEventsLoading,
      setUserEventsLoading,
    };
  }, [userEvents, setUserEvents, userEventsLoading, setUserEventsLoading]);
  return (
    <EventsContext.Provider value={authValue}>
      {children}
    </EventsContext.Provider>
  );
};
