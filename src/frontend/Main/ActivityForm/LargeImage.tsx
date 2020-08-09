import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import TextField from "frontend/components/TextField";
import React, { memo, useCallback } from "react";
import { useField } from "react-final-form";
import { useClient } from "./ClientContext";

const LargeImage = () => {
  const {
    input: { onChange, value },
  } = useField("form.largeImageKey");
  const client = useClient();
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);
  const { input: imageTextInput } = useField("form.largeImagText");
  return (
    <Grid container spacing={1} direction="column" wrap="nowrap">
      <Grid item>
        <Typography variant="h6">Large Image</Typography>
      </Grid>
      <Grid item>
        {client.images.length === 0 ? (
          <Typography>No images.</Typography>
        ) : (
          <Grid container spacing={1}>
            <FormControl component="fieldset">
              <RadioGroup value={value} onChange={handleChange} row>
                <Grid item>
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label={<i>n/a</i>}
                  />
                </Grid>
                {client.images.map((image) => (
                  <Grid item key={image}>
                    <FormControlLabel
                      value={image}
                      control={<Radio />}
                      label={image}
                    />
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        )}
      </Grid>
      <Grid item>
        <TextField label="Large Image Text" {...imageTextInput} />
      </Grid>
    </Grid>
  );
};

export default memo(LargeImage);
