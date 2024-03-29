import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addUsers } from "../features/Users";
import { ChangeFooter } from "./ChangeFooter";
import { Navbar } from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'antd';

export const AddUser = () => {
  const dispatcher = useDispatch();
  const usersList = useSelector((state) => state.users.value);
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userDetail, setUserDetail] = useState({
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
    const { firstName, lastName } = userDetail;
    let user = {
      id: usersList.length !== 0 ? usersList[usersList.length - 1].id + 1 : 1,
      firstName: firstName,
      lastName: lastName,
    };
    dispatcher(addUsers(user));
    navigate('/showUser');
  };

  const onBlurhandleUserDetail = (e) =>{
    const { name, value } = e.target;
    setUserDetail({
      ...userDetail,
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

  const addUserDetails = () => {
    const { firstName, lastName } = userDetail;
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
      <div
        className={`vh-100 d-flex align-items-center justify-content-center`}
      >
        <div className="card position-absolute w-50">
          <div className="card-header">
            <Navbar />
          </div>
          <div className="card-body">
            <div className="d-block">
            <div className="Items">
            <h1>Enter user's info</h1>
            <div className="mb-3 mt-3">
                <input
                    type="text"
                    className={`form-control rounded-pill ${errors.firstName ? 'input-error' : ''}`}
                    placeholder="first name"
                    name="firstName"
                    id="firstName"
                    onBlur={(e) => onBlurhandleUserDetail(e)}
                />
                 {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className={`form-control rounded-pill ${errors.lastName ? 'input-error' : ''}`}
                    placeholder="last name"
                    name="lastName"
                    onBlur={(e) => onBlurhandleUserDetail(e)}
                />
                {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
                <button
                    type="button"
                    className={`btn w-100 btn-sm bg-color`}
                    onClick={(e) => addUserDetails(e)}
                >
                    Add user
                </button>
            </div>
          <Modal
                centered 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}>
            <h3>Do you want to add this user</h3>
            <div>{userDetail.firstName}  {userDetail?.lastName}</div>
          </Modal>
        </div>
            </div>
          </div>
          <ChangeFooter />
        </div>
      </div>
    </>
  );
};

