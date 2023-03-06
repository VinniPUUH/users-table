import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  ChangeEventHandler,
} from "react";
import { useDebounce } from "use-debounce";

import MainContainer from "components/main-container/main-container";
import SelectSingle from "components/parts/select-single/select-single";
import Input from "components/parts/input/input";
import Pagination from "components/pagination/pagination";
import TableUsers from "components/table-users/table-users";
import useGetUserFilterOptions from "hooks/useGetUserFilterOptions";

import { getRequest } from "api/axios";
import { filterUsers } from "utils/filter-users";
import { AMOUNT_PER_PAGE_VARIANTS, MAX_PAGES } from "constants/filters-data";
import URL from "constants/url";
import { IFilterOption } from "constants/types/form-parts.type";
import { IUser } from "constants/types/user.type";

import styles from "./App.module.scss";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  const [currNationalitie, setCurrNationalitie] = useState<IFilterOption>("");
  const [currGender, setCurrGender] = useState<IFilterOption>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [amountPerPage, setAmountPerPage] = useState<IFilterOption>({
    value: AMOUNT_PER_PAGE_VARIANTS[0],
    label: AMOUNT_PER_PAGE_VARIANTS[0],
  });
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setLoading] = useState(false);

  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    setLoading(true);

    const queryParams = `results=${
      amountPerPage ? amountPerPage.value : AMOUNT_PER_PAGE_VARIANTS[0]
    }&page=${currPage}&seed=abc`;

    const getData = async () => {
      const { data } = await getRequest(
        `${URL.USER_URL}/?inc=picture,name,location,email,dob,gender,nat,phone&${queryParams}`
      );
      setUsers(data.results);
      setLoading(false);
    };
    getData();
  }, [currNationalitie, currGender, amountPerPage, currPage]);

  const filteredUsers = useMemo(() => {
    if (users) {
      return filterUsers(
        users,
        debouncedSearchValue,
        currGender,
        currNationalitie
      );
    }

    return users;
  }, [debouncedSearchValue, users, currGender, currNationalitie]);

  const {
    AmountPerPageOptions,
    SelectNationalitiesOptions,
    SelectGendersOptions,
  } = useGetUserFilterOptions();

  const nationalitieHandler = useCallback((value: IFilterOption) => {
    setCurrNationalitie(value);
  }, []);

  const genderHandler = useCallback((value: IFilterOption) => {
    setCurrGender(value);
  }, []);

  const searchHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setSearchValue(event.target.value);
    },
    []
  );

  const amountPerPageHandler = useCallback((value: IFilterOption) => {
    setAmountPerPage(value);
  }, []);

  const NextPageHandler = useCallback(() => {
    currPage < MAX_PAGES && setCurrPage((prevValue) => prevValue + 1);
  }, [currPage]);

  const PrevPageHandler = useCallback(() => {
    currPage > 1 && setCurrPage((prevValue) => prevValue - 1);
  }, [currPage]);

  return (
    <MainContainer>
      <div className={styles.wrapper}>
        <div className={styles.searchInput}>
          <Input
            value={searchValue}
            changeHandler={searchHandler}
            placeholder={"Search"}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.gendersSelect}>
            <SelectSingle
              title="Gender equal"
              options={SelectGendersOptions}
              value={currGender}
              changeHandler={genderHandler}
              isClearable
            />
          </div>
          <div className={styles.nationalitiesSelect}>
            <SelectSingle
              title="Nationality"
              options={SelectNationalitiesOptions}
              value={currNationalitie}
              changeHandler={nationalitieHandler}
              isClearable
            />
          </div>
        </div>

        <div className={styles.table}>
          <TableUsers
            users={filteredUsers}
            count={filteredUsers.length}
            isLoading={isLoading}
          />
        </div>

        <div className={styles.footer}>
          <div className={styles.pagination}>
            <Pagination
              currValue={currPage}
              maxValue={MAX_PAGES}
              nextHandler={NextPageHandler}
              prevHandler={PrevPageHandler}
            />
          </div>
          <div className={styles.amountPerPageSelect}>
            <p className={styles.amountPerPageSelectText}>Rows per page:</p>
            <SelectSingle
              options={AmountPerPageOptions}
              value={amountPerPage}
              changeHandler={amountPerPageHandler}
              showAtTop
            />
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default App;
