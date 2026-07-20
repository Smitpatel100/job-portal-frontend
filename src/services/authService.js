import api from "../api/axios";

export const login = (email, password) => {
  return api.post("/auth/login", {
    email: email,
    password: password
  });
};
