import React, { useEffect, useState, useContext } from "react";
import ChatHeader from "../components/chat/ChatHeader";
import Navbar from "../components/navbar/Navbar";
import { UserContext } from "../context/useContext";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

let socket;

export default function UChat() {
  const [contact, setContact] = useState({});
  const [messages, setMessages] = useState([]);
  const [timer, setTimer] = useState({});
  const [online, setOnline] = useState(false);
  const [form, setForm] = useState({
    chatM: "",
  });
  console.log("initime", messages);

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io("https://waysbooks.herokuapp.com" || "http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
      // code here
    });

    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    // listen error sent from server
    socket.on("connect_error", (err) => {
      console.error(err.message); // not authorized
    });
    loadMessages();

    if (!messages[messages.length - 1]?.message) {
      setOnline(false);
    } else if (messages[messages.length - 1]?.idSender == contact?.id) {
      setOnline(true);
    }

    return () => {
      socket.disconnect();
    };
  }, [form, messages]); // code here

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // used for active style when click contact
  const onClickContact = () => {
    socket.emit("load admin contact");

    socket.on("admin contact", (data) => {
      setContact(data);
    });

    socket.emit("load messages", contact.id);
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        console.log("variable data", data);

        console.log(dataMessages);
        setMessages(dataMessages);
      } else {
        setMessages([]);
      }
    });
  };

  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      if (data.message) {
        socket.emit("send message", data);
        setTimer(data);
        form.chatM = "";
      }
      console.log(data.message);
    }
  };

  const handleSubmit = () => {
    const data = {
      idRecipient: contact.id,
      message: form.chatM,
    };

    if (data.message) {
      socket.emit("send message", data);
      form.chatM = "";
    }
  };

  const handleOffline = () => {
    const data = {
      idSender: null,
      idRecipient: null,
      message: null,
    };

    socket.emit("send message offline", data);

    setOnline(false);
  };

  return (
    <div className="bg-homes">
      <Navbar />
      <div className="">
        <div className="chat-header d-flex overflow-auto">
          <ChatHeader online={online} />
        </div>
        {contact ? (
          <>
            <div className="chat-body ">
              <ScrollToBottom className="h-100">
                {messages.map((item, index) => (
                  <div key={index}>
                    <div
                      className={`d-flex py-1 ${
                        item.idSender === state.user.id
                          ? "justify-content-end"
                          : "justify-content-start"
                      }`}
                    >
                      <div
                        className={
                          item.idSender === state.user.id
                            ? "chat-me"
                            : "chat-other"
                        }
                      >
                        {item.message}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <div className="d-flex m-auto pb-lg-5" style={{ width: "95%" }}>
                <input
                  type="text"
                  name="chatM"
                  value={form.chatM}
                  onClick={onClickContact}
                  onChange={handleChange}
                  onKeyPress={onSendMessage}
                  className="form-control me-2 "
                />
                <button
                  onClick={onSendMessage}
                  type="button"
                  className="btn btn-info px-3"
                >
                  {" "}
                  &#9658;
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="chat-body d-flex justify-content-center">
            <p className="align-self-center ">No Message</p>
          </div>
        )}
      </div>
    </div>
  );
}
