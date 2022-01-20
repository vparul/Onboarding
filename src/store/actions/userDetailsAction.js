import { SAVE_USER_DETAILS, SAVE_USER_USAGE, SAVE_USER_WORKSPACE_DETAILS, SET_COMPLETED_STEPS } from '../../enums/userDetailsEnum';

export const saveUserDetails = details => async dispatch => {
    dispatch({
        type: SAVE_USER_DETAILS,
        payload: details,
    })
};

export const saveUserWorkSpaceDetails = details => async dispatch => {
    dispatch({
        type: SAVE_USER_WORKSPACE_DETAILS,
        payload: details,
    })
};

export const saveUserUsage = details => async dispatch => {
    dispatch({
        type: SAVE_USER_USAGE,
        payload: details,
    })
};

export const setCompletedSteps = step => async dispatch => {
    dispatch({
        type: SET_COMPLETED_STEPS,
        payload: step,
    })
};
