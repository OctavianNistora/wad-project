import { PropsWithChildren, createContext, useMemo, useState } from "react";

type LocationsState = {
  allLocations: string[];
  setAllLocations: React.Dispatch<React.SetStateAction<string[]>>;
  allLocationsLoading: boolean;
  setAllLocationsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LocationsContext = createContext<LocationsState>({
  allLocations: [],
  setAllLocations: () => null,
  allLocationsLoading: false,
  setAllLocationsLoading: () => null,
});

export const LocationsContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [allLocations, setAllLocations] = useState<string[]>([]);
  const [allLocationsLoading, setAllLocationsLoading] = useState(false);

  const locationsValue = useMemo(() => {
    return {
      allLocations,
      setAllLocations,
      allLocationsLoading,
      setAllLocationsLoading,
    };
  }, [
    allLocations,
    setAllLocations,
    allLocationsLoading,
    setAllLocationsLoading,
  ]);

  return (
    <LocationsContext.Provider value={locationsValue}>
      {children}
    </LocationsContext.Provider>
  );
};
