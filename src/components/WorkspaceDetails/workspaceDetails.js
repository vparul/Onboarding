import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { REQUIRED_FIELD } from "../../utils/constants";
import OutlinedInput from "../OutlinedInput/outlinedInput";
import { saveUserWorkSpaceDetails } from "../../store/actions/userDetailsAction";
import { getUserDetails } from "../../store/reducers/userDetailsReducer";

const WorkSpaceDetails = ({ onSuccess }) => {
  const { workSpaceName, workSpaceUrl } = useSelector((state) =>
    getUserDetails(state)
  );

  const dispatch = useDispatch();

  const initialValues = {
    workSpaceName: workSpaceName ?? "",
    url: workSpaceUrl ?? "",
  };

  const validationSchema = Yup.object().shape({
    workSpaceName: Yup.string().required(REQUIRED_FIELD),
  });

  const onSubmit = (values) => {
    dispatch(saveUserWorkSpaceDetails(values));
    onSuccess();
  };

  return (
    <Grid className="flex column items-center">
      <Typography className="heading">
        Let's set up a home for all your work
      </Typography>
      <Typography className="sub-heading">
        You can always create another workspace later.
      </Typography>
      <Grid item xs={12} className="w-100">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ values, errors, touched, isSubmitting }) => {
            return (
              <Form>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  className="user-form"
                >
                  <Grid item xs={12} sm={5}>
                    <OutlinedInput
                      label="Workspace Name"
                      value={values?.workSpaceName}
                      name="workSpaceName"
                      error={errors.workSpaceName}
                      touched={touched.workSpaceName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} className="input-container">
                    <Typography className="input-label">
                      Workspace URL <span>(optional)</span>
                    </Typography>
                    <Field name="url">
                      {({ field }) => (
                        <TextField
                          variant="outlined"
                          autoComplete="off"
                          {...field}
                          value={values.url}
                          helperText={
                            errors?.url && touched?.url ? errors?.url : ""
                          }
                          error={errors?.url ? !!touched?.url : false}
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                www.eden.com/
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid container item xs={12} justifyContent="center">
                    <Button
                      className="primary-button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <CircularProgress color="primary" size={25} />
                      ) : (
                        "Create Workspace"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default WorkSpaceDetails;
