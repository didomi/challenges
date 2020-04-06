import { ADD_CONSENT } from "../actionCreators/addConsent";
export default function consents(state = [], action) {
  if (action.type === ADD_CONSENT) {
    return [...state, action.payload];
  }
  return state;
}
