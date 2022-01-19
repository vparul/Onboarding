import React from "react";
import { useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import {
  Grid,
  Typography,
  Button
} from "@mui/material";
import { getUserDetails } from "../../store/reducers/userDetailsReducer";
import './congratulations.scss';

const Congratulations = () => {
  const { displayName } = useSelector((state) => getUserDetails(state));

  return (
    <Grid className="flex column items-center page-container">
      <Grid item className="svg-container flex items-center justify-center">
        <MdDone />
      </Grid>
      <Grid container>
      <Grid item xs={12} direction="column" className="flex items-center justify-center mt-30">
        <Typography className="heading">
          Congratulations,{displayName}!
        </Typography>
        <Typography className="sub-heading">
          You have completed onboarding, you can start using the Eden!
        </Typography>
      </Grid>
      </Grid>
      <Grid container item xs={12} justifyContent="center" className="mt-30 action-button">
        <Button className="primary-button" type="submit">
          Launch Eden
        </Button>
      </Grid>
    </Grid>
  );
};

export default Congratulations;
