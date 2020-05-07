import axios from "axios";
import { authenticationService } from "./authentication";

const options = {
  withCredentials: true,
};

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const userHandler = {
  getUserInfo,
  getAllUsers,
  deleteById,
  logout,
  update,
  changePassword,
  getUsernameById,
};

async function getUserInfo() {
  try {
    console.log("getting all the info!");
    let { data } = await axios.get(serverUrl + "/user/info", options);
    return data;
  } catch (error) {
    console.log("Error ocurred get user info.", error.toString());
    await logout();
    window.location = "/login";
    return error;
  }
}

async function getAllUsers() {
  try {
    const res = await axios.get(serverUrl + "/user/", options);
    return res.data;
  } catch (err) {
    console.log("Users not found!", err);
    return err;
  }
}

async function deleteById(id) {
  try {
    const res = await axios.delete(`${serverUrl}/user/${id}`, options);
    return res;
  } catch (err) {
    console.log("User not found!", err);
    return err;
  }
}

async function logout() {
  try {
    const params = { token: "" };
    const res = await axios.put(serverUrl + "/user/logout/", params, options);
    if (res.status === 200) {
      authenticationService.removeSession();
    } else {
      throw new Error("Error during logout!");
    }
  } catch (error) {
    console.log("User not found!", error);
    return error;
  }
}

async function update(id, params) {
  try {
    const res = await axios.put(`${serverUrl}/user/${id}`, params, options);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.String());
    return error;
  }
}

async function changePassword(params) {
  try {
    const res = await axios.put(
      `${serverUrl}/user/change-password`,
      params,
      options
    );
    return res;
  } catch (error) {
    console.log(error.String());
    return error;
  }
}

async function getUsernameById(id) {
  try {
    const res = await axios.get(`${serverUrl}/user/username/${id}`, options);
    return res;
  } catch (err) {
    console.log("User not found!", err);
    return err;
  }
}
