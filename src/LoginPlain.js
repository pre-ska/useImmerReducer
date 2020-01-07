import React, { useReducer } from "react";
import { login } from "./utils";
import { loginReducer } from "./loginReducer";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false
};

const LoginUseState = () => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

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

export default LoginUseState;
