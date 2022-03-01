import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8010/person";

const initialState = {
  persons: [],
  singlePerson: {},
};

export const getPersonAllData = () => async (dispatch) => {
  try {
    await axios.get(`${API_URL}`).then((answer) => {
      dispatch(populatePersonState(answer.data));
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePersonData = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/${id}`).then(() => {
      dispatch(getPersonAllData());
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const createPersonData = (model) => async (dispatch) => {
  try {
    await axios.post(`${API_URL}`, model).then(() => {
      dispatch(getPersonAllData());
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const updatePersonData = (formState) => async (dispatch) => {
  try {
    await axios.patch(`${API_URL}/${formState.id}`, formState).then(() => {
      dispatch(getPersonAllData());
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const apiSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    populatePersonState: (state, action) => {
      state.persons = action.payload;
    },
    getPerson: (state, action) => {
      state.singlePerson = action.payload;
    },
  },
});

export const { populatePersonState, getPerson } = apiSlice.actions;
export const personsData = (state) => state.person.persons;
export const singlePersonData = (state) => state.person.singlePerson;

export default apiSlice.reducer;
