import * as API from "../api/api";
export const ADD_CONSENT = "ADD_CONSENT";

export const fetchConsents = () => {
  return (dispatch) => {
    API.fetchData()
      .then((res) => res.json())
      .then((res) => {
        res.forEach((item) => {
          dispatch(addConsent(item));
        });
      });
  };
};

export const addConsent = (consentData) => {
  return { type: ADD_CONSENT, payload: consentData };
};
