import { createContext, forwardRef, CSSProperties } from "react";
import { FixedSizeList as List } from "react-window";
import clsx from "clsx";

import styles from "./table-users.module.scss";

const StickyListContext = createContext({});
StickyListContext.displayName = "StickyListContext";

const ItemWrapper = ({ data, index, style }: any) => {
  const { ItemRenderer, stickyIndices, users } = data;

  if (stickyIndices && stickyIndices.includes(index)) {
    return null;
  }

  return <ItemRenderer index={index} style={style} user={users?.[index - 1]} />;
};

const Row = ({ style, user }: any) => {
  const birthday = new Date(user?.dob?.date).toLocaleDateString();

  return (
    <div className={styles.rowWrapper} style={style}>
      <div className={clsx(styles.grid, styles.row)}>
        <div className={styles.userPreview}>
          <img
            src={user.picture?.thumbnail}
            alt=""
            className={styles.userAvatar}
          />{" "}
          {`${user.name?.last} ${user.name?.first}`}
        </div>
        <div>{user.location?.city}</div>
        <div>{user.email}</div>
        <div>{birthday}</div>
        <div>{user.gender}</div>
        <div>{user.nat}</div>
        <div>{user.phone}</div>
      </div>
    </div>
  );
};

const StickyRow = ({ style }: { style: CSSProperties }) => (
  <div className={clsx(styles.grid, styles.stickyRow)} style={style}>
    <div>Profile</div>
    <div>Location</div>
    <div>Email</div>
    <div>Birthday</div>
    <div>Gender</div>
    <div>Nationality</div>
    <div>Phone</div>
  </div>
);

const innerElementType = forwardRef(({ children, ...rest }: any, ref) => (
  <StickyListContext.Consumer>
    {({ stickyIndices, users, isLoading }: any) => (
      <div ref={ref} {...rest}>
        {stickyIndices.map((index: number) => (
          <StickyRow
            key={index}
            style={{ top: 0, left: 0, width: "100%", height: 53 }}
          />
        ))}
        {!isLoading && !users?.length && (
          <div className={styles.notFound}>No matching results found</div>
        )}
        {!isLoading && users?.length && children}
      </div>
    )}
  </StickyListContext.Consumer>
));

const StickyList = ({
  children,
  stickyIndices,
  users,
  isLoading,
  ...rest
}: any) => (
  <StickyListContext.Provider
    value={{ ItemRenderer: children, stickyIndices, users, isLoading }}
  >
    {isLoading && (
      <img
        src="img/tail-spin.svg"
        className={styles.loader}
        alt="loader"
        width={38}
        height={38}
      />
    )}
    <List itemData={{ ItemRenderer: children, stickyIndices, users }} {...rest}>
      {ItemWrapper}
    </List>
  </StickyListContext.Provider>
);

export { innerElementType, StickyList, Row };
