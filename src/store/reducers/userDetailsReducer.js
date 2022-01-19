import { FOR_MYSELF } from "../../enums/setupEnums";
import {
  SAVE_USER_DETAILS,
  SAVE_USER_SETUP,
  SAVE_USER_WORKSPACE_DETAILS,
  SET_COMPLETED_STEPS,
} from "../../enums/userDetailsEnum";

const initialState = {
  fullName: null,
  displayName: null,
  workSpaceName: null,
  workSpaceUrl: null,
  setup: FOR_MYSELF,
  stepCompleted: [0],
};

function userDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_DETAILS: {
      const { fullName, displayName } = action.payload;
      return { ...state, fullName, displayName };
    }
    case SAVE_USER_WORKSPACE_DETAILS: {
      const { url, workSpaceName } = action.payload;
      return { ...state, workSpaceName, workSpaceUrl: url };
    }
    case SAVE_USER_SETUP:
      return { ...state, setup: action.payload };
    case SET_COMPLETED_STEPS:
      return {
        ...state,
        stepCompleted: [...state.stepCompleted, action.payload],
      };
    default:
      return state;
  }
}

export default userDetailsReducer;

export const getUserDetails = (state) => state?.userDetails;
export const getCompletedSteps = (state) => state?.userDetails?.stepCompleted;
