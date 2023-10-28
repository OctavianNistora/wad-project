import { useCallback, useContext, useMemo } from "react";
import { database } from "../../firebase";
import { ref, get } from "@firebase/database";
import { LocationsContext } from "./locations.context";

export const useLocationsState = () => {
  const {
    allLocations,
    setAllLocations,
    allLocationsLoading,
    setAllLocationsLoading,
  } = useContext(LocationsContext);

  const getAllLocations = useCallback(async () => {
    setAllLocationsLoading(true);
    try {
      get(ref(database, "location-names")).then((snapshot) => {
        if (snapshot.exists()) {
          const locationsResponseData = snapshot.val();
          const newLocationsList: string[] = [];
          Object.keys(locationsResponseData).forEach((key) => {
            if (locationsResponseData[key]) {
              newLocationsList.push(key);
            }
          });
          setAllLocations(newLocationsList);
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setAllLocationsLoading(false);
    }
  }, []);
  const data = useMemo(() => {
    return {
      allLocations,
      allLocationsLoading,
      getAllLocations,
    };
  }, [allLocations, allLocationsLoading, getAllLocations]);

  return data;
};
