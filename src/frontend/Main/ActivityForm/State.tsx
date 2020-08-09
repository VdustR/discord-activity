import TextField from "frontend/components/TextField";
import React, { memo } from "react";
import { useField } from "react-final-form";

const Detail = () => {
  const { input } = useField("form.state");
  return <TextField label="State" {...input} />;
};

export default memo(Detail);
