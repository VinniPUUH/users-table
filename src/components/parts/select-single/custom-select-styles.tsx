const selectStyles = {
  control: () => ({
    display: "none",
  }),

  menu: (baseStyles: any, { placement }: any) => {
    return {
      ...baseStyles,
      width: "fit-content",
      minWidth: "100px",
      backgroundColor: "#202128",
      border: "1px solid #CF7B5A1A",
      borderRadius: "16px",
      boxShadow: "inset 0px 4px 12px -4px rgba(207, 123, 90, 0.24)",
      right: placement === "top" ? "0" : "unset",
      marginBottom: placement === "top" ? "45px" : "",
    };
  },

  menuList: (baseStyles: any) => ({
    ...baseStyles,
    padding: "0 8px 8px",

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "16px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "16px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),

  option: (baseStyles: any, { hasValue }: any) => ({
    ...baseStyles,
    backgroundColor: "inherit",
    borderRadius: "16px",
    transition: "0.3s",
    cursor: "pointer",

    "&:first-of-type": hasValue
      ? {
          color: "#CF7B5A",
          borderBottom: "1px solid #797675",
          borderRadius: "0",
          marginBottom: "8px",
          pointerEvents: "none",
        }
      : null,

    "&:not(&:first-of-type):hover": {
      backgroundColor: "#13161D",
      color: "#CF7B5A80",
    },
  }),
};

export default selectStyles;
