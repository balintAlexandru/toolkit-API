import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-uuid";
import { useHistory } from "react-router-dom";
import {
  getPersonAllData,
  createPersonData,
  personsData,
  deletePersonData,
  singlePersonData,
  updatePersonData,
} from "./features/apiSlice";

function App() {
  const persons = useSelector(personsData);
  const singlePerson = useSelector(singlePersonData);
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteLayout, setShowDeleteLayout] = useState(false);
  const [showUpdateLayout, setShowUpdateLayout] = useState(false);
  const [personId, setPersonId] = useState("");
  const [formState, setFormstate] = useState(singlePerson);
  const [newPerson, setNewPerson] = useState(singlePerson);

  useEffect(() => {
    dispatch(getPersonAllData());
  }, []);

  const createPerson = () => {
    dispatch(createPersonData(newPerson));
  };

  const updatePerson = () => {
    dispatch(updatePersonData(formState));
  };

  const deletePersonLayout = (id) => {
    setPersonId(id);
    setShowDeleteLayout(true);
  };

  const updatePersonLayout = (id) => {
    persons?.forEach((element) => {
      if (id === element.id) {
        setFormstate(element);
      }
    });
    setShowUpdateLayout(true);
  };

  const deletePerson = (id) => {
    dispatch(deletePersonData(id));
    setShowDeleteLayout(false);
  };

  const handleChange = (event) => {
    setFormstate((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };

  const createHandleChange = (event) => {
    setNewPerson((newPerson) => ({
      ...newPerson,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className="App">
      <h1>Redux Toolkit Axios Requests</h1>
      <div className="create-button">
        <button onClick={() => setShowCreateForm(true)}>Create</button>
      </div>
      <div className="container">
        {persons?.map((user, index) => (
          <div className="person-card" key={index}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <p>{`${user.age}`}</p>
            <p>{`${user.about}`}</p>
            <div className="person-buttons">
              <button
                onClick={() => {
                  deletePersonLayout(user.id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updatePersonLayout(user.id);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {showCreateForm && (
        <div className="form-container">
          <div className="exit">
            <button onClick={() => setShowCreateForm(false)}>X</button>
          </div>
          <form className="form-create" onSubmit={createPerson}>
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              required
              value={newPerson?.firstName}
              onChange={createHandleChange}
            />
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              value={newPerson?.lastName}
              onChange={createHandleChange}
            />
            <label>Age</label>
            <input
              name="age"
              type="number"
              required
              value={newPerson?.age}
              onChange={createHandleChange}
            />
            <label>About</label>
            <input
              name="about"
              type="text"
              required
              value={newPerson?.about}
              onChange={createHandleChange}
            />
            <button>Create Person</button>
          </form>
        </div>
      )}
      {showDeleteLayout && (
        <div className="delete-layout">
          <h1>Are you sure you want to delete this person?</h1>
          <div className="delete-buttons">
            <button
              onClick={() => {
                deletePerson(personId);
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowDeleteLayout(false)}>No</button>
          </div>
        </div>
      )}
      {showUpdateLayout && (
        <div className="form-container">
          <div className="exit">
            <button onClick={() => setShowUpdateLayout(false)}>X</button>
          </div>
          <form className="form-create" onSubmit={updatePerson}>
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              required
              value={formState?.firstName}
              onChange={handleChange}
            />
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              required
              value={formState?.lastName}
              onChange={handleChange}
            />
            <label>Age</label>
            <input
              name="age"
              type="number"
              required
              value={formState?.age}
              onChange={handleChange}
            />
            <label>About</label>
            <input
              name="about"
              type="text"
              required
              value={formState?.about}
              onChange={handleChange}
            />
            <button>Update Person</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
