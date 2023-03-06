import { FC, ReactNode } from "react";

import styles from "./main-container.module.scss";

interface IMainContainer {
  children: ReactNode;
}

const MainContainer: FC<IMainContainer> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default MainContainer;
