import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { deleteUsers, updateUsers } from "../features/Users";
import { Modal } from "antd";

export const NewUser = ({ id, firstName, lastName }) => {

  let [edit, setEdit] = useState(false);
  const alertRef = useRef();
  const dispatcher = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateUserDetail, setUpadteUserDetail] = useState({
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
      dispatcher(
        updateUsers({
          id,
          firstName: updateUserDetail.firstName,
          lastName: updateUserDetail.lastName,
        })
      );
      setIsModalOpen(false)
  };

  let editUser = () => {
    setEdit(!edit);
  };

  let [confirmDelete, setConfirmDelete] = useState(false);

  let confirmDeleteUser = () => {
    setConfirmDelete(!confirmDelete);
    setEdit(false);
  };

  const onBlurhandleUserDetail = (e) =>{
    const { name, value } = e.target;
    setUpadteUserDetail({
      ...updateUserDetail,
      [name]: value,
    });
    if (value === '') {
      setErrors(prevErrors => ({
          ...prevErrors,
          [name]: `Please enter ${name === 'firstName' ? 'first' : 'last'} name`,
      }));
    } else {
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    }
  }

  const newUpdateUser = () => {
    const { firstName, lastName } = updateUserDetail;
    let errors = {};
  
    if (firstName === '') {
      errors.firstName = 'Please enter first name';
    }
  
    if (lastName === '') {
      errors.lastName = 'Please enter last name';
    }
  
    if (Object.keys(errors).length > 0) {
      setErrors(prevErrors => ({
        ...prevErrors,
        ...errors,
      }));
    }else{
      setIsModalOpen(true)
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
        <Modal
                centered 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}>
            <h3>Change User to {updateUserDetail.firstName} {updateUserDetail.lastName} </h3>
            <div>Are you sure you want to change the old user ({firstName} {lastName}) to {updateUserDetail.firstName} {updateUserDetail.lastName} </div>
          </Modal>
        {edit ? (
          <div className="input-group input-group-sm mt-2">
            <div className="form-input-cntrl">
            <input
              type="text"
              className={`form-control form-input rounded-pill ${errors.firstName ? 'input-error' : ''}`}
              placeholder={firstName}
              name="firstName"
              onBlur={(e) => onBlurhandleUserDetail(e)}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div>
            <input
              type="text"
              className={`form-control rounded-pill ${errors.lastName ? 'input-error' : ''}`}
              placeholder={lastName}
              name="lastName"
              onBlur={(e) => onBlurhandleUserDetail(e)}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            <button
              type="button"
              className="btn rounded-pill btn-dark btn-sm btn-update"
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
