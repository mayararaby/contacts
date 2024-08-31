import * as actionTypes from "../../constants/actions"

const initialState = {
  contacts: [],
  filteredContacts: {},
  filter: {},
  detailedContacts :{}
}

export const contactsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_NEW_CONTACTS:
      return {
        ...state,
        contacts: payload
      }

    case actionTypes.SET_FILTER_CONTACT:
      console.log("payload", payload)
      return {
        ...state,
        filteredContacts: payload
      }

    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: payload
      }

      case actionTypes.SET_DETAILED_FILTERED_CONTACTS:
        return {
          ...state,
          detailedContacts: payload
        }
  
    default:
      return state
  }
}
