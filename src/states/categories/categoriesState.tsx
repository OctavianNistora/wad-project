import { useCallback, useContext, useMemo } from "react";
import { database } from "../../firebase";
import { ref, get } from "@firebase/database";
import { CategoriesContext } from "./categories.context";

export const useCategoriesState = () => {
  const {
    allCategories,
    setAllCategories,
    allCategoriesLoading,
    setAllCategoriesLoading,
  } = useContext(CategoriesContext);

  const getAllCategories = useCallback(async () => {
    setAllCategoriesLoading(true);
    try {
      get(ref(database, "category-names")).then((snapshot) => {
        if (snapshot.exists()) {
          const categoriesResponseData = snapshot.val();
          const newCategoriesList: string[] = [];
          Object.keys(categoriesResponseData).forEach((key) => {
            if (categoriesResponseData[key]) {
              newCategoriesList.push(key);
            }
          });
          setAllCategories(newCategoriesList);
        } else {
          console.log("No data available");
        }
      });
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setAllCategoriesLoading(false);
    }
  }, []);

  const data = useMemo(() => {
    return {
      allCategories,
      allCategoriesLoading,
      getAllCategories,
    };
  }, [allCategories, allCategoriesLoading, getAllCategories]);

  return data;
};
