import axios from "./axios";

async function spinUpServer() {
  try {
    await axios.get("/");
  } catch (error) {
    return error;
  }
}

async function findUserByEmail(email) {
  try {
    await axios.get("/auth/find-email", email);
  } catch (error) {
    return error;
  }
}

async function createNewUser(data) {
  try {
    let result = await axios.post("/auth/sign-up", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function signInUser(data) {
  try {
    let result = await axios.post("/auth/sign-in", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function enable2FactorAuth(data) {
  try {
    let result = await axios.post("/auth/enable2fa", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function verify2FactorAuth(data) {
  try {
    let result = await axios.post("/auth/verify2fa", data);
    return result;
  } catch (error) {
    return error;
  }
}


async function forgotPassword(data) {
  try {
    let result = await axios.post("/reset/forgot-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function resetPassword(data) {
  try {
    let result = await axios.post("/reset/reset-password", data);
    return result;
  } catch (error) {
    return error;
  }
}

async function getMovies() {
  try {
    let result = await axios.get("/movies/get-movies");
    return result;
  } catch (error) {
    return error;
  }
}

export {
  findUserByEmail,
  spinUpServer,
  enable2FactorAuth,
  createNewUser,
  verify2FactorAuth,
  signInUser,
  forgotPassword,
  resetPassword,
  getMovies,
};
