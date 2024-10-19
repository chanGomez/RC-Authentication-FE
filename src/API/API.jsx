import axios from "./axios";

async function spinUpServer() {
  try {
    await axios.get("/");
  } catch (error) {
    return error;
  }
}

async function createNewUser(data) {
  console.log(data)
  try {
    let result = await axios.post("/auth/sign-up", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function signInUser(data) {
  try {
    let result = await axios.post("/sign-in", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function forgotPassword(data) {
  try {
    let result = await axios.post("/forgot-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function resetPassword(data) {
  try {
    let result = await axios.post("/reset-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function getMovies() {
  try {
    let result = await axios.get("/movies");
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
