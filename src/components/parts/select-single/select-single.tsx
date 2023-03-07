import { FC, useState, MouseEventHandler, memo, useMemo, useRef } from "react";
import Select, { SingleValue, ActionMeta } from "react-select";

import { MenuList } from "./custom-select-parts";
import useOnClickOutside from "hooks/useClickOutside";

import { IOption, IFilterOption } from "constants/types/form-parts.type";

import selectStyles from "./custom-select-styles";
import styles from "./select-single.module.scss";

interface ISelectSingle {
  value: IFilterOption;
  changeHandler: (value: IFilterOption) => void;
  options: IOption[];
  title?: string;
  isClearable?: boolean;
  showAtTop?: boolean;
}

const SelectSingle: FC<ISelectSingle> = ({
  value,
  changeHandler,
  options,
  title,
  isClearable,
  showAtTop,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  const onClickButton = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onSelectChange = (value: IOption) => {
    changeHandler(value);
    setIsOpen(false);
  };

  const clearValue: MouseEventHandler<HTMLSpanElement> = (event) => {
    event.stopPropagation();
    changeHandler("");
  };

  useOnClickOutside(isOpen, wrapperRef, onClickButton);

  const formatedSelectOptions = useMemo(() => {
    if (!value) return options;

    const formatedOptions = options.filter(
      (item) => item.value !== value.value
    );
    formatedOptions.unshift(value);

    return formatedOptions;
  }, [value, options]);

  return (
    <div className={styles.selectWrapper} ref={wrapperRef}>
      <button className={styles.button} onClick={onClickButton}>
        <span>{title} </span>
        {value && value.label && (
          <>
            <span className={styles.buttonSelectedOption}>{value.label} </span>
            {isClearable ? (
              <span className={styles.buttonClear} onClick={clearValue}></span>
            ) : (
              <span className={styles.buttonArrow}></span>
            )}
          </>
        )}
      </button>
      {isOpen && (
        <Select
          value={value}
          onChange={
            onSelectChange as (
              newValue: SingleValue<IFilterOption>,
              actionMeta: ActionMeta<IFilterOption>
            ) => void
          }
          options={formatedSelectOptions}
          menuIsOpen
          onBlur={() => {
            onClickButton();
          }}
          autoFocus={true}
          maxMenuHeight={200}
          styles={selectStyles}
          components={{ MenuList }}
          menuPlacement={showAtTop ? "top" : "bottom"}
        />
      )}
    </div>
  );
};

export default memo(SelectSingle);
