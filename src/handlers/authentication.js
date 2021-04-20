import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const transport = axios.create(config);

export const authenticationService = {
  login,
  register,
  removeSession,
};

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

async function login(params) {
  try {
    const res = await transport.post(`${SERVER_URL}/login`, params);
    return { data: res.data };
  } catch (error) {
    return { error: "Error para logear" };
  }
}

async function register(params) {
  try {
    await transport.post(`${SERVER_URL}/register`, params);
    return { data: "Nuevo usuario registrado!" };
  } catch (error) {
    return { error: "Error de registro. Intente nuevamente" };
  }
}

function removeSession() {
  localStorage.clear();
}
