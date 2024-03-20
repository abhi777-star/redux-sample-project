import { ChangeFooter } from "./ChangeFooter";
import { Navbar } from "./Navbar";
import { NewUser } from "./newUser";
import { useSelector } from "react-redux";

export const ShowUsers = () => {
  const color = useSelector((state) => state.color.value);
  const usersList = useSelector((state) => state.users.value);
  return (
    <>
      <div
        className={`vh-100 d-flex align-items-center justify-content-center bg-${color}`}
      >
        <div className="card position-absolute w-50">
          <div className="card-header">
            <Navbar />
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {usersList.length === 0 ? (
                <h1>NO USER EXISTs</h1>
              ) : (
                usersList.map((user) => (
                  <NewUser
                    key={user.id}
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                  />
                ))
              )}
            </ul>
          </div>
          <ChangeFooter />
        </div>
      </div>
    </>
  );
};
