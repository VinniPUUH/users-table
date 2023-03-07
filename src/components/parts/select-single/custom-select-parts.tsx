import SimpleBar from "simplebar-react";
import { components } from "react-select";
import clsx from "clsx";

import simpleBarStyles from "commonStyles/simplebar.module.scss";

const MenuList = ({ children, ...props }: any) => (
  <components.MenuList {...props}>
    <div
      className={clsx(
        simpleBarStyles.simpleBarArea,
        simpleBarStyles.selectSimpleBar
      )}
    >
      <SimpleBar style={{ maxHeight: "180px" }} autoHide={false}>
        {children}
      </SimpleBar>
    </div>
  </components.MenuList>
);

export { MenuList };
