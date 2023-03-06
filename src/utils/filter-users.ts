import { IUser } from "constants/types/user.type";
import { IFilterOption } from "constants/types/form-parts.type";

const filterUsers = (
  users: IUser[],
  searchValue: string,
  currGender: IFilterOption,
  currNationalitie: IFilterOption
) =>
  users.filter((user: IUser) => {
    const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
    const isCorrectSearch = searchValue
      ? fullName.includes(searchValue.toLowerCase())
      : true;
    const isCorrectGender = currGender
      ? user.gender === currGender.value
      : true;
    const isCorrectNationalitie = currNationalitie
      ? user.nat === currNationalitie.value
      : true;
    return isCorrectSearch && isCorrectGender && isCorrectNationalitie;
  });

export { filterUsers };
