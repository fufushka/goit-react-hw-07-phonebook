// import React, {  } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';

import ContactFilter from './components/ContactFilter/ContactFilter';
import { useDispatch, useSelector } from 'react-redux';

import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import {
  addContact,
  deleteContactbyId,
  getContacts,
} from 'Store/contactSliceOperations';
import { selectContacts, selectFilter, updateFilter } from 'Store/contactSlice';

function filterByString(field, filterValue) {
  return field.toLowerCase().trim().includes(filterValue.toLowerCase().trim());
}

export const App = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  const contacts = useSelector(selectContacts);

  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const onDeleteContact = contactId => {
    dispatch(deleteContactbyId(contactId));
  };

  const onAddContact = ({ name, number }) => {
    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number.toLowerCase() === number.toLowerCase()
      )
    ) {
      alert(`${name} or entered number is already in contacts.`);
      return;
    }

    dispatch(addContact({ name, number, id: nanoid() }));
  };

  const onChangeFilter = ({ target: { value } }) => {
    dispatch(updateFilter(value.toString()));
  };

  const filteredContacts = contacts.filter(
    contact =>
      filterByString(contact.name, filter) ||
      filterByString(contact.number, filter)
  );

  return (
    <>
      {error && <p>error</p>}
      {isLoading && <p>Loading...</p>}
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2>Contacts</h2>

      <ContactFilter filter={filter} onChangeFilter={onChangeFilter} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </>
  );
};
