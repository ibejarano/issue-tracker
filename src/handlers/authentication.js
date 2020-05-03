import { BehaviorSubject } from "rxjs";

import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
const transport = axios.create(config);

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);
const currentUserIsAdmin = new BehaviorSubject(
  JSON.parse(localStorage.getItem("isAdmin"))
);

export const authenticationService = {
  login,
  currentUser: currentUserSubject.asObservable(),
  removeSession,
  get currentUserValue() {
    return currentUserSubject.value;
  },
  get isAdmin() {
    return currentUserIsAdmin.value;
  },
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
  currentUserSubject.next(null);
}
