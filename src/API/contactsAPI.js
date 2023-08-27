import axios from 'axios';

export const getAllContacts = () => {
  const data = axios.get(
    'https://64eaff72e51e1e82c576e82b.mockapi.io/Contacts'
  );
  return data;
};
export const addNewContact = async contactData => {
  const data = await axios({
    method: 'post',
    url: 'https://64eaff72e51e1e82c576e82b.mockapi.io/Contacts',
    data: contactData,
  });
  console.log(data);
  return data.data;
};
export const deleteContact = async id => {
  const data = await axios.delete(
    `https://64eaff72e51e1e82c576e82b.mockapi.io/Contacts/${id}`
  );
  return data.data;
};
