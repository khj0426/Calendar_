import { useState } from "react";

export const useBoolean = () => {
  const [value, setValue] = useState(false);
  const setTrue = () => {
    setValue(true);
  };
  const setFalse = () => {
    setValue(false);
  };

  const toggleValue = () => {
    if (value) {
      setValue(false);
    } else {
      setValue(true);
    }
  };

  return {
    value,
    setTrue,
    setFalse,
    toggleValue,
  };
};
