import React from "react";
import { Typography, TextField } from "@mui/material";
import { Field } from "formik";

const OutlinedInput = ({ label, name, error, touched, value }) => {
  return (
    <div className="input-container">
      <Typography className="input-label">{label}</Typography>
      <Field name={name}>
        {({ field }) => (
          <TextField
            variant="outlined"
            autoComplete="off"
            {...field}
            value={value}
            helperText={error && touched ? error : ""}
            error={error ? !!touched : false}
            fullWidth
          />
        )}
      </Field>
    </div>
  );
};
export default OutlinedInput;
