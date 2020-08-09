import { Grid } from "@material-ui/core";
import React, { memo } from "react";
import Controls from "./Controls";
import Detail from "./Details";
import LargeImage from "./LargeImage";
import Party from "./Party";
import SmallImage from "./SmallImage";
import State from "./State";

const Form = () => {
  return (
    <Grid container spacing={1} direction="column" wrap="nowrap">
      <Grid item>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Detail />
          </Grid>
          <Grid item xs={12} sm={6}>
            <State />
          </Grid>
          <Grid item xs={12}>
            <LargeImage />
          </Grid>
          <Grid item xs={12}>
            <SmallImage />
          </Grid>
          <Grid item xs={12}>
            <Party />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Controls />
      </Grid>
    </Grid>
  );
};

export default memo(Form);
