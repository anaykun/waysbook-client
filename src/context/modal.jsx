import { createContext, useReducer } from "react";

export const AContext = createContext();

const initialState = {
  modalSignIn: false,
  modalSignUp: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        modalSignIn: true,
        modalSignUp: false,
      };
    case "SIGN_UP":
      return {
        ...state,
        modalSignUp: true,
        modalSignIn: false,
      };
    case "CLOSE":
      return {
        ...state,
        modalSignIn: false,
        modalSignUp: false,
      };
    default:
      throw new Error();
  }
};

export const ContextProvider = ({ children }) => {
  const [states, dispatchs] = useReducer(reducer, initialState);

  return (
    <AContext.Provider value={[states, dispatchs]}>
      {children}
    </AContext.Provider>
  );
};
