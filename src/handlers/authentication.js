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
  removeSession,
};


const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'localhost:5000'

async function login(params) {
  try {
    const res = await transport.post(
      `${SERVER_URL}/login`,
      params
    )
    return res.data;
  } catch (error) {
    return { error: "Error para logear"};
  }
}

function removeSession() {
  localStorage.clear();
}
