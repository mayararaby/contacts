import { GET_CONTACT_URL } from "../constants/api";
import axios from 'axios';
import { setFilterContacts, setNewContacts } from "../redux/actions";
import { mapResultWithLetters } from "../helpers";

export const fetchContacts = async (dispatch) => {

  try {
    // Make the GET request
    const contacts = await axios.get(GET_CONTACT_URL);

    // Handle the response data
    dispatch(setNewContacts(contacts.data.results))
    const filteredResult = mapResultWithLetters(contacts.data.results)
    dispatch(setFilterContacts(filteredResult))
    
    return contacts.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error; 
  }
}
