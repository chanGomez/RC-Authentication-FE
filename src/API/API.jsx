import Axios from "./Axios";

async function spinUpServer() {
  try {
    await Axios.get("/");
  } catch (error) {
    return error;
  }
}

async function createNewUser(data) {
  try {
    let result = await Axios.post("/auth/register", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function signInUser(data) {
  try {
    let result = await Axios.post("/sign-in", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function forgotPassword(data) {
  try {
    let result = await Axios.post("/forgot-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function resetPassword(data) {
  try {
    let result = await Axios.post("/reset-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function getMovies() {
  try {
    let result = await Axios.get("/movies");
    return result;
  } catch (error) {
    return error;
  }
}

export {
  spinUpServer,
  createNewUser,
  signInUser,
  forgotPassword,
  resetPassword,
  getMovies,
};
