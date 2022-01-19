import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography, CircularProgress, Button } from "@mui/material";
import { saveUserDetails } from "../../store/actions/userDetailsAction";
import { getUserDetails } from "../../store/reducers/userDetailsReducer";
import { fullNameRegex } from "../../utils/regex";
import { VALID_FULL_NAME, REQUIRED_FIELD } from "../../utils/constants";
import OutlinedInput from "../OutlinedInput/outlinedInput";


const UserDetails = ({ onSuccess }) => {
  const {fullName, displayName } = useSelector(state => getUserDetails(state));

  const dispatch = useDispatch();
  const initialValues = {
    fullName: fullName ?? '',
    displayName: displayName ?? ''
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .matches(fullNameRegex, VALID_FULL_NAME)
      .required(REQUIRED_FIELD),
    displayName: Yup.string()
      .matches(fullNameRegex, VALID_FULL_NAME)
      .required(REQUIRED_FIELD),
  });

  const onSubmit = (values) => {
    dispatch(saveUserDetails(values));
    onSuccess();
  };

  return (
    <Grid className="flex column items-center">
      <Typography className="heading">
        Welcome! First things first...
      </Typography>
      <Typography className="sub-heading">
        You can always change them later.
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
                      label="Full Name"
                      value={values?.fullName}
                      name="fullName"
                      error={errors.fullName}
                      touched={touched.fullName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <OutlinedInput
                      label="Display Name"
                      value={values?.displayName}
                      name="displayName"
                      error={errors.displayName}
                      touched={touched.displayName}
                    />
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

export default UserDetails;
