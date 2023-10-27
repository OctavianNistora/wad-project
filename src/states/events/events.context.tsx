import { createContext, useState, PropsWithChildren, useMemo } from "react";

export type EventInfo = {
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventId: string;
};

type EventsState = {
  allEvents: EventInfo[];
  setAllEvents: React.Dispatch<React.SetStateAction<EventInfo[]>>;
  allEventsLoading: boolean;
  setAllEventsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EventsContext = createContext<EventsState>({
  allEvents: [],
  setAllEvents: () => null,
  allEventsLoading: false,
  setAllEventsLoading: () => null,
});

export const EventsContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [allEvents, setAllEvents] = useState<EventInfo[]>([]);
  const [allEventsLoading, setAllEventsLoading] = useState(false);

  const authValue = useMemo(() => {
    return {
      allEvents,
      setAllEvents,
      allEventsLoading,
      setAllEventsLoading,
    };
  }, [allEvents, setAllEvents, allEventsLoading, setAllEventsLoading]);
  return (
    <EventsContext.Provider value={authValue}>
      {children}
    </EventsContext.Provider>
  );
};
