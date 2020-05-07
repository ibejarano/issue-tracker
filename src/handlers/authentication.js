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

async function login(params) {
  try {
    const { data } = await transport.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      params
    );
    return { data };
  } catch (error) {
    return { error: error.response.data };
  }
}

function removeSession() {
  localStorage.clear();
}
