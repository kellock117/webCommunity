import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    if (event.target.className === "MuiBox-root css-164r41r")
      event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
