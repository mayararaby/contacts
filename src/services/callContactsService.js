import { GET_CONTACT_URL } from "../constants/api";
import axios from 'axios';
import { setNewContacts } from "../redux/actions";

export const fetchContacts = async (dispatch) => {

  try {
    // Make the GET request
    const contacts = await axios.get(GET_CONTACT_URL);

    // Handle the response data
    console.log('Data request:', contacts.data.results);
    dispatch(setNewContacts(contacts.data.results))
    return contacts.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
    throw error; 
  }
}
