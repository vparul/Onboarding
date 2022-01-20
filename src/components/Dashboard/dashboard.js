import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Stepper, Box, Step, StepLabel } from "@mui/material";
import UserDetails from "../UserDetails/userDetails";
import WorkSpaceDetails from "../WorkspaceDetails/workspaceDetails";
import Usage from "../Usage/usage";
import Congratulations from "../Congratulations/congratulations";
import { setCompletedSteps } from "../../store/actions/userDetailsAction";
import { getCompletedSteps } from "../../store/reducers/userDetailsReducer";
import Logo from "../../assets/icons/logo.png";

const Dashboard = () => {
  const stepsCompleted = useSelector(state => getCompletedSteps(state));
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();

  const steps = [
    { id: 0, label: "", onClick: () => setActiveStep(0) },
    { id: 1, label: "", onClick: () => setActiveStep(1) },
    { id: 2, label: "", onClick: () => setActiveStep(2) },
    { id: 3, label: "", onClick: () => setActiveStep(3) },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    dispatch(setCompletedSteps(activeStep + 1));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserDetails onSuccess={handleNext} />;
      case 1:
        return <WorkSpaceDetails onSuccess={handleNext} />;
      case 2:
        return <Usage onSuccess={handleNext} />;
      case 3:
        return <Congratulations />;
      default:
        return <UserDetails onSuccess={handleNext} />;
    }
  };

  return (
    <Box className="wrapper">
      <img src={Logo} alt="logo" />
      <Stepper activeStep={activeStep}>
        {steps.map(step => {
          const stepProps = {};
          return (
            <Step
              active={stepsCompleted?.includes(step.id)}
              key={step.id}
              {...stepProps}
              className="stepper"
              {...(stepsCompleted?.includes(step.id) && { onClick: step.onClick })}
            >
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>
        <Grid className="page-content">{getStepContent(activeStep)}</Grid>
      </React.Fragment>
    </Box>
  );
};

export default Dashboard;
