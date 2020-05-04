import axios from "axios";

export const issuesHandler = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  addComment,
  getArchived,
};

const options = {
  withCredentials: true,
};

const serverUrl = process.env.REACT_APP_SERVER_URL;

async function getAll() {
  try {
    const { data } = await axios.get(serverUrl + "/bugs", options);
    return { data };
  } catch (error) {
    return { error };
  }
}

async function getArchived() {
  try {
    const { data } = await axios.get(serverUrl + "/bugs/archive", options);
    return { data };
  } catch (error) {
    return { error };
  }
}

async function getById(id) {
  try {
    const res = await axios.get(`${serverUrl}/bugs/${id}`, options);
    return res.data;
  } catch (err) {
    console.log("Issue id not found!", err);
    return err;
  }
}

async function add(params) {
  try {
    const res = await axios.post(serverUrl + "/bugs", params, options);
    console.log("new Issue registered!");
    return res;
  } catch (err) {
    console.log("Error adding new issue", err);
    return err;
  }
}

async function update(id, params) {
  console.log("Updating bug #", id);
  const urlPost = `${serverUrl}/bugs/${id}`;
  try {
    const res = await axios.put(urlPost, params, options);
    // TODO use this to display some info!
    return res;
  } catch (error) {
    console.log(error.toString());
    return error;
  }
}

async function deleteById(id) {
  try {
    const { data } = await axios.delete(`${serverUrl}/bugs/${id}`, options);
    return data;
  } catch (err) {
    console.log("Bug id not found!", err);
    return err;
  }
}

async function addComment(id, params) {
  const urlComments = `${serverUrl}/bugs/add-comment/${id}`;
  const res = await axios.put(urlComments, params, options);
  return res;
}
