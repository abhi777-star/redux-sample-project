import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteUsers, updateUsers } from "../features/Users";

export const NewUser = ({ id, firstName, lastName }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  let [edit, setEdit] = useState(false);
  const alertRef = useRef();
  const dispatcher = useDispatch();

  let editUser = () => {
    setEdit(!edit);
  };
  let [confirmDelete, setConfirmDelete] = useState(false);

  let confirmDeleteUser = () => {
    setConfirmDelete(!confirmDelete);
  };

  let newUpdateUser = function () {
    if (newFirstName === "" || newLastName === "") {
      alertRef.current.hidden = false;
      alertRef.current.textContent = "📢 Please fill the two inputs!";
      alertRef.current.classList.add("bg-danger");
      setTimeout(() => {
        alertRef.current.hidden = true;
      }, 2000);
    } else {
      dispatcher(
        updateUsers({
          id,
          firstName: newFirstName,
          lastName: newLastName,
        })
      );
      alertRef.current.hidden = false;
      alertRef.current.textContent = "🎉 User updated successfuly!";
      alertRef.current.classList.remove("bg-danger");
      alertRef.current.classList.add("bg-success");
      setTimeout(() => {
        alertRef.current.hidden = true;
      }, 2000);
      setEdit(!edit);
      setNewFirstName("");
      setNewLastName("");
    }
  };

  return (
    <>
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div>
            {firstName} {lastName}
          </div>
          <div
            ref={alertRef}
            className="badge rounded-pill border border-transparent"
            hidden
          ></div>
          <div>
            <button
              onClick={editUser}
              className="badge rounded-pill bg-transparent border border-transparent"
            >
              ✏️
            </button>
            <button
              type="button"
              onClick={confirmDeleteUser}
              className="badge rounded-pill bg-transparent border border-transparent"
            >
              🗑️
            </button>
          </div>
        </div>
        {edit ? (
          <div className="input-group input-group-sm mt-2">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder={firstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder={lastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button
              type="button"
              className="btn rounded-pill btn-dark btn-sm"
              onClick={newUpdateUser}
            >
              Update
            </button>
          </div>
        ) : (
          <></>
        )}
        {confirmDelete ? (
          <div className="d-flex justify-content-center mt-2">
            <span className="badge rounded-pill bg-dark text-wrap">
              You are sure ? you want to delete{" "}
              <strong className="text-danger">
                {firstName} {lastName}
              </strong>{" "}
              ?
            </span>
            <button
              type="button"
              className="badge rounded-pill bg-danger border border-transparent"
              onClick={() => {
                dispatcher(deleteUsers({ id }));
              }}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={confirmDeleteUser}
              className="badge rounded-pill bg-secondary border border-transparent"
            >
              No
            </button>
          </div>
        ) : (
          <></>
        )}
      </li>
    </>
  );
};
