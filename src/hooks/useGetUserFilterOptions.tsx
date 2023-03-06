import { useMemo } from "react";

import {
  NATIONALITIES,
  GENDERS,
  AMOUNT_PER_PAGE_VARIANTS,
} from "constants/filters-data";

const useGetUserFilterOptions = () => {
  const AmountPerPageOptions = useMemo(() => {
    return AMOUNT_PER_PAGE_VARIANTS.map((item) => ({
      value: item,
      label: item,
    }));
  }, []);

  const SelectNationalitiesOptions = useMemo(() => {
    return NATIONALITIES.map((item) => ({ value: item, label: item }));
  }, []);

  const SelectGendersOptions = useMemo(() => {
    return GENDERS.map((item) => ({ value: item, label: item }));
  }, []);

  return {
    AmountPerPageOptions,
    SelectNationalitiesOptions,
    SelectGendersOptions,
  };
};

export default useGetUserFilterOptions;
