import { useSelector } from "react-redux";
import { Navbar } from "./Navbar";
import { ChangeFooter } from "./ChangeFooter";
import axios from "axios";
import { useState } from "react";

export const Home = () => {
  const user = useSelector((state) => state.user.value);
  const color = useSelector((state) => state.color.value);
  const [jokeDataMessage,setjokeDataMessage] = useState("");

  const jokeData = async () =>{
    const res = await axios.get("https://v2.jokeapi.dev/joke/Programming?type=single");
    setjokeDataMessage(res?.data?.joke)
    return res
  }

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
            <h2>Welcome {user.userName}</h2>
            <strong>Wanna hear a joke?</strong>
            <p>{jokeDataMessage}</p>
            <button
              className={`btn btn-sm btn-${color}`}
              onClick={() => jokeData()}
            >
              Another joke? lol
            </button>
          </div>
          <ChangeFooter />
        </div>
      </div>
    </>
  );
};
