import { FC, memo } from "react";
import clsx from "clsx";

import styles from "./pagination.module.scss";

interface IPagination {
  maxValue: number;
  currValue: number;
  prevHandler: () => void;
  nextHandler: () => void;
}

const Pagination: FC<IPagination> = ({
  maxValue,
  currValue,
  prevHandler,
  nextHandler,
}) => {
  return (
    <div className={styles.pagination}>
      <button
        className={clsx(styles.button, styles.buttonLeft)}
        onClick={prevHandler}
      ></button>
      <div className={styles.text}>{`${currValue} of ${maxValue}`}</div>
      <button
        className={clsx(styles.button, styles.buttonRight)}
        onClick={nextHandler}
      ></button>
    </div>
  );
};

export default memo(Pagination);
