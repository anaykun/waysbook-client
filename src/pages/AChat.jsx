import React, { useEffect, useState, useContext } from "react";
import AChatHeader from "../components/chat/AChatHeader";
import AHeader from "../components/chat/AHeader";
import Navbar from "../components/navbar/Navbar";
import { UserContext } from "../context/useContext";
import { io } from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

let socket;
export default function AChat() {
  const [state] = useContext(UserContext);
  const [contact, setContact] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);
  const [form, setForm] = useState({
    chatM: "",
  });

  useEffect(() => {
    socket = io("https://waysbooks.herokuapp.com" || "http://localhost:5000", {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socket.on("new message", () => {
      socket.emit("load messages", contact?.id);
    });

    loadContact();
    loadMessages();

    socket.on("connect_error", (err) => {
      console.error(err.message);
    });

    if (!messages[messages.length - 1]?.message) {
      setOnline(false);
    } else if (messages[messages.length - 1]?.idSender == contact?.id) {
      setOnline(true);
    }

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loadContact = () => {
    socket.emit("load customer contact");

    socket.on("customer contact", (data) => {
      let dataContacts = data.map((item) => ({
        ...item,
        message: "Click here to start message",
      }));
      setContacts(dataContacts);
    });
  };

  const onClickContact = (data) => {
    console.log(data);
    setContact(data);
    socket.emit("load messages", data.id);
  };

  const loadMessages = () => {
    socket.on("messages", (data) => {
      console.log(data);
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
          idRecipient: item.recipient.id,
        }));
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
        form.chatM = "";
      }
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
      <div className="container m-auto w-100">
        <p className="fw-bold fs-3">Customer Complain</p>
      </div>
      <div className=" container row m-auto chat-admin p-0">
        <div className="col-lg-4 p-0 p-lg-3">
          <div className="d-flex d-lg-block overflow-auto">
            {contacts.map((item, index) => (
              <AHeader
                item={item}
                contact={contacts}
                key={index}
                onClickContact={onClickContact}
              />
            ))}
          </div>
        </div>

        <div className="col-lg-8 p-0 p-lg-3">
          {contact ? (
            <>
              <div className="chat-header d-flex overflow-auto">
                <AChatHeader online={online} contact={contact} />
              </div>

              <>
                <div className="chat-body">
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
                  <div
                    className="d-flex m-auto pb-lg-5"
                    style={{ width: "95%" }}
                  >
                    <input
                      type="text"
                      name="chatM"
                      value={form.chatM}
                      onChange={handleChange}
                      onKeyPress={onSendMessage}
                      className="form-control me-2 "
                    />
                    <button
                      className="btn btn-info px-3"
                      onClick={handleSubmit}
                    >
                      {" "}
                      &#9658;
                    </button>
                  </div>
                </div>
              </>
            </>
          ) : (
            <div className="chat-body d-flex justify-content-center">
              <p className="align-self-center ">No Message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
