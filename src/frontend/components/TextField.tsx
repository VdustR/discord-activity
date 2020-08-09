import { TextField as MuiTextField, TextFieldProps } from "@material-ui/core";
import React, { forwardRef, memo } from "react";

const TextField = forwardRef(
  ({ ...props }: TextFieldProps, ref: TextFieldProps["ref"]) => {
    return <MuiTextField variant="outlined" fullWidth {...props} ref={ref} />;
  }
);

export default memo(TextField);
