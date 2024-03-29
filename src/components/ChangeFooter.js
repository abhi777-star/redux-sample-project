import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../features/User";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

export const ChangeFooter = () => {
  const dispatcher = useDispatch();
  const [inputChange, setInputChange] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()


  const handleOnBlur = () => {
    if (inputChange === "") {
      setError('Please enter a username');
    } else {
      setError("");
    }
  };
  
  const handleOk = () => {
    if (inputChange === '') {
      setError('Please enter a username');
    } else {
      setError('');
      setIsModalOpen(true);
    }
  };
  
  const handleModalOk = () => {
    dispatcher(login({ userName: inputChange }));
    setIsModalOpen(false);
    navigate('/');
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="card-footer text-muted">
        <div className="input-group input-group-sm">
          <input
            type="text"
            className={`form-control form-footer rounded-pill ${error ? 'input-error' : ''}`}
            placeholder="change your..."
            onChange={(e) => setInputChange(e.target.value)}
            onBlur={handleOnBlur}
          />
           {error && <div className="error-message">{error}</div>}
          <button
            className="btn btn-outline-secondary btn-sm btn-footer rounded-pill"
            type="button"
            onClick={() =>handleOk()}
          >
            Username
          </button>

          <Modal
                centered 
                open={isModalOpen} 
                onOk={handleModalOk} 
                onCancel={handleCancel}>
            <h3>Do you want to change your username to {inputChange}</h3>
          </Modal>
        </div>
      </div>
    </>
  );
};
