import { PropsWithChildren, createContext, useMemo, useState } from "react";

type CategoriesState = {
  allCategories: string[];
  setAllCategories: React.Dispatch<React.SetStateAction<string[]>>;
  allCategoriesLoading: boolean;
  setAllCategoriesLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CategoriesContext = createContext<CategoriesState>({
  allCategories: [],
  setAllCategories: () => null,
  allCategoriesLoading: false,
  setAllCategoriesLoading: () => null,
});

export const CategoriesContextProvider = (
  props: PropsWithChildren<Record<never, any>>
) => {
  const { children } = props;
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [allCategoriesLoading, setAllCategoriesLoading] = useState(false);

  const categoriesValue = useMemo(() => {
    return {
      allCategories,
      setAllCategories,
      allCategoriesLoading,
      setAllCategoriesLoading,
    };
  }, [
    allCategories,
    setAllCategories,
    allCategoriesLoading,
    setAllCategoriesLoading,
  ]);
  return (
    <CategoriesContext.Provider value={categoriesValue}>
      {children}
    </CategoriesContext.Provider>
  );
};
