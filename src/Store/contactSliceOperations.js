import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNewContact, deleteContact, getAllContacts } from 'API/contactsAPI';

export const getContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await getAllContacts();
      console.log(response.data);
      return response.data;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
export const deleteContactbyId = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      const response = await deleteContact(id);

      return response.id;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkApi) => {
    try {
      const response = await addNewContact(data);
      console.log(response);
      return response;
    } catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);
