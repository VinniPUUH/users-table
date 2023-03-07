import { FC } from "react";

import { innerElementType, StickyList, Row } from "./table-users-components";

import { IUser } from "constants/types/user.type";

import simpleBarStyles from "commonStyles/simplebar.module.scss";
import styles from "./table-users.module.scss";

interface ITableUsers {
  users: IUser[];
  count: number;
  isLoading: boolean;
}

const TableUsers: FC<ITableUsers> = ({ users, count, isLoading }) => {
  return (
    <div className={simpleBarStyles.simpleBarArea}>
      <StickyList
        height={600}
        innerElementType={innerElementType}
        itemCount={count + 1}
        itemSize={72}
        stickyIndices={[0]}
        width="100%"
        className={styles.list}
        users={users}
        isLoading={isLoading}
      >
        {Row}
      </StickyList>
    </div>
  );
};

export default TableUsers;
