import React, { useState } from "react";
import { MdPerson, MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Button, Card, CardContent } from "@mui/material";
import { getUserDetails } from "../../store/reducers/userDetailsReducer";
import { saveUserUsage } from "../../store/actions/userDetailsAction";
import { FOR_MYSELF, FOR_TEAM } from "../../enums/usageEnums";
import "./usage.scss";

const Usage = ({ onSuccess }) => {
  const dispatch = useDispatch();
  
  const { usage } = useSelector(state => getUserDetails(state));
  const [selectedCard, setSelectedCard] = useState(usage);

  const onSubmit = () => {
    onSuccess();
    dispatch(saveUserUsage(selectedCard));
  };
  return (
    <Grid className="flex column items-center">
      <Typography className="heading">
        How are you planning to use Eden?
      </Typography>
      <Typography className="sub-heading">
        We'll streamline your Usage experience accordingly.
      </Typography>
      <Grid container className="card-container flex justify-between">
        <Card
          className={`card ${selectedCard === FOR_MYSELF ? "selected" : ""}`}
          onClick={() => setSelectedCard(FOR_MYSELF)}
        >
          <CardContent>
            <MdPerson />
            <Typography variant="h5">For myself</Typography>
            <Typography>
              Write better. Think more clearly. Stay organized.
            </Typography>
          </CardContent>
        </Card>

        <Card
          className={`card ${selectedCard === FOR_TEAM ? "selected" : ""}`}
          onClick={() => setSelectedCard(FOR_TEAM)}
        >
          <CardContent>
            <MdGroups />
            <Typography variant="h5">With my team</Typography>
            <Typography>
              Wikis, docs, tasks & <br /> projects, all in one <br /> place.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <Button className="primary-button" type="submit" onClick={onSubmit}>
          Create Workspace
        </Button>
      </Grid>
    </Grid>
  );
};

export default Usage;
