import axios from "axios";
import { useState, useEffect } from "react";

export default function () {
  return (
    <>
      <MyChatApp />
    </>
  );
}

function MyChatApp() {
  const [messages, setMessages] = useState("");
  const [list, setList] = useState([]);

  const [validationError, setValidationError] = useState(false);

  const handleMessages = (e) => {
    setMessages(e.target.value);
  };

  const addUser = async () => {
    if (messages == "") {
      alert("Validation Fails");
      setValidationError(true);
      return;
    }
    const url = "http://localhost:4000/add-user";
    const data = {
      messages: messages,
    };
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setMessages("");

    setValidationError(false);
  };

  const getUser1 = async () => {
    const url = "http://localhost:4000/users";
    const result = await axios.get(url);

    const list = result.data;
    const newList = [...list];
    setList(newList);
  };

  const getUser = async () => {
    const url = "http://localhost:4000/users";
    const result = await fetch(url);

    const list = await result.json();
    const newList = [...list];
    setList(newList);
  };
  useEffect(() => getUser(), []);

  return (
    <div className="container-fluid">
      <div className="row p-3 bg-dark text-light p-1 mb-0">
        <div className="col-2">
          <h3>MyChatApp</h3>
        </div>
        <div className="col mt-4">
          <h6>by Snehal Raut, Id: 210940520097</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <input
            type="text"
            className={messages =="" && validationError ? "border border-danger":""}
            value={messages}
            onChange={handleMessages}
            placeholder="Lets chat here..."
            style={{
              fontSize: "1.5rem",
              borderRadius: "10px",
              padding: "2rem",
              width:"100%",
              marginTop: ".5rem",
            }}
          />
        </div>
        <div className="col-2">
          <input
            type="button"
            value="SEND"
            onClick={addUser}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "2rem",
              marginTop: ".5rem",
            }}
          />
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="mt-2 alert alert-secondary border  fs-2 "
            style={{ backgroundColor:"lightgray",borderRadius:"10px" ,textAlign:"start"}}
          >
            {item.messages}
          </div>
          
          
  ))}
      </div>
    </div>
  );
}
