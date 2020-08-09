import { Grid, Typography } from "@material-ui/core";
import TextField from "frontend/components/TextField";
import React, { memo } from "react";
import { useField, UseFieldConfig } from "react-final-form";

const getInt = (str: string) => {
  const int = Number.parseInt(str);
  if (Number.isNaN(int)) return NaN;
  if (int <= 0) return NaN;
  return int;
};

const useFieldConfig: UseFieldConfig<number | undefined> = {
  format: (num) => (num === undefined || Number.isNaN(num) ? "" : String(num)),
  parse: getInt,
};

const Party = () => {
  const { input: partySizeInput } = useField("form.partySize", useFieldConfig);
  console.log("partySizeInput", partySizeInput.value);
  const { input: partyMaxInput } = useField("form.partyMax", useFieldConfig);
  return (
    <Grid container spacing={1} direction="column" wrap="nowrap">
      <Grid item>
        <Typography variant="h6">Party Size / Party Max</Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={1} wrap="nowrap" alignItems="center">
          <Grid item>
            <TextField {...partySizeInput} placeholder="Size >= 1" />
          </Grid>
          <Grid item>/</Grid>
          <Grid item>
            <TextField {...partyMaxInput} placeholder="Max >= 1" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(Party);
