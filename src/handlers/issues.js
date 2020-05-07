import axios from "axios";

export const issuesHandler = {
  getAll,
  getById,
  add,
  update,
  deleteById,
  addComment,
};

const options = {
  withCredentials: true,
};

const serverUrl = process.env.REACT_APP_SERVER_URL;

async function getAll(pageSize, page, status) {
  try {
    let fetchUrl;
    if (status) {
      fetchUrl = `${serverUrl}/bugs?rows=${pageSize}&page=${page}&status=${status}`;
    } else {
      fetchUrl = `${serverUrl}/bugs?rows=${pageSize}&page=${page}`;
    }
    const { data } = await axios(fetchUrl, options);
    return { data };
  } catch (error) {
    if (error.response.status === 401) {
      removeSession();
    }
    return { error };
  }
}

async function getById(id) {
  try {
    console.log("getting issue", id);
    const { data } = await axios.get(`${serverUrl}/bugs/${id}`, options);
    console.log(data);
    return data;
  } catch (err) {
    return { err: err.response };
  }
}

async function add(params) {
  try {
    const res = await axios.post(serverUrl + "/bugs", params, options);
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

async function addComment(text, issueId) {
  try {
    const urlComments = `${serverUrl}/bugs/add-comment/${issueId}`;
    const { data } = await axios.put(urlComments, { text }, options);
    return { data };
  } catch (error) {
    return { error: error.toString() };
  }
}

function removeSession() {
  localStorage.clear();
  window.location = "/login";
}
