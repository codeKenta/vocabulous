// import config from 'config';
// import { authHeader } from "../helpers/auth-header";
import axios from "axios";

const login = (username, password) => {
  return axios
    .post("users/authenticate", username, password)
    .then(response => {
      console.log("response data", response.data);
      // if (response.data.success) {}
      if (response.data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("jwtToken", response.data.token);
      } else {
        // setErrors({ username: response.data.errorMsg });
        // setSubmitting(false);
      }
    })
    .catch(err => {
      // Something went wrong
    });
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
};

export const userService = {
  //   signup,
  login,
  logout
};
