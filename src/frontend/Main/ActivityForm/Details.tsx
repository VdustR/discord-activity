import TextField from "frontend/components/TextField";
import React, { memo } from "react";
import { useField } from "react-final-form";

const Detail = () => {
  const { input } = useField("form.details");
  return <TextField label="Detail" {...input} />;
};

export default memo(Detail);
