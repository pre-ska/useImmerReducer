import React from "react";
import { login } from "./utils";
// import produce from "immer";
import { useImmerReducer } from "use-immer";

const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      state.error = "";
      state.isLoading = true;
      return;
    }
    case "success":
      state.isLoggedIn = true;
      return;

    case "error":
      state.username = "";
      state.password = "";
      state.isLoading = false;
      state.error = "Incorrect username or password";
      return;

    case "logout":
      state.username = "";
      state.password = "";
      state.isLoggedIn = false;
      return;

    case "field":
      state[action.field] = action.value;
      return;

    default:
      break;
  }
  return state;
};

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false
};

// const curriedLoginImmerReducer = produce(reducer);

const LoginImmer = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async e => {
    e.preventDefault();

    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Hello {username}!!!</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              Log out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.target.value
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.target.value
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginImmer;
