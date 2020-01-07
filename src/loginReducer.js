export const loginReducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    }
    case "success":
      return {
        ...state,
        isLoggedIn: true
      };
    case "error":
      return {
        ...state,
        username: "",
        password: "",
        isLoading: false,
        error: "Incorrect username or password"
      };
    case "logout":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        password: ""
      };
    case "field":
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      break;
  }
  return state;
};
