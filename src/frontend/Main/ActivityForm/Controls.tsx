import { Button, Grid } from "@material-ui/core";
import React, { memo, useCallback } from "react";
import { useForm, useFormState, UseFormStateParams } from "react-final-form";

const useFormStateParams: UseFormStateParams = {
  subscription: {
    initialValues: true,
  },
};

const Controls = () => {
  const { reset } = useForm();
  const { initialValues } = useFormState(useFormStateParams);
  const resetForm = useCallback(() => {
    reset(initialValues);
  }, [initialValues, reset]);
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button color="primary" onClick={resetForm}>
          Reset
        </Button>
      </Grid>
      <Grid item>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(Controls);
