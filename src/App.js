import { Routes, Route, useNavigate } from "react-router-dom";
import AChat from "./pages/AChat";
import AddBook from "./pages/AddBook";
import ATransaction from "./pages/ATransaction";
import Cart from "./pages/Cart";
import DetailBook from "./pages/DetailBook";
import Home from "./pages/Home";
import Profiles from "./pages/Profiles";
import UChat from "./pages/UChat";

import { API, setAuthToken } from "./config/api";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/useContext";
import Login from "./components/auth/Login";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/admin-transaction");
        // navigate("/complain-admin");
      } else if (state.user.role === "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;

      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<DetailBook />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/admin-transaction" element={<ATransaction />} />
      <Route path="/chat-user" element={<UChat />} />
      <Route path="/chat-admin" element={<AChat />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
